import { Request, Response } from 'express';
import { user } from '../models/user.model';
import { userSchema } from '../models/user.schema';
import { fileSchema } from '../models/file.schema';

export const obtenerUsers = (peticion: Request, respuesta: Response) => {
    userSchema.find()
          .then((result:Array<user>) => {
              respuesta.send(result);
              respuesta.end();
          })
          .catch((error:any) => console.error(error));
  }

  export const guardarUser = (req: Request, res: Response) => {
	 const p = new userSchema(req.body);
	p.save().then((saveResponse:any) => {
	  res.send(saveResponse);
	  res.end();
	}).catch((error:any) => {
	  console.log('ERRRORRR: ', error);
	  res.send({message: 'Hubo un error al guardar', error}); // shorthand
	  res.end();
	});
  }

  export const actualizarUser = (req: Request, res: Response) => {
    userSchema.updateOne({_id: req.params.id}, req.body
    ).then((updateResponse:any) => {
      res.send({message: 'Registro actualizado', updateResponse});
      res.end();
    }).catch((error:any) =>{
      res.send({message: 'Hubo un error al actualizar', error}); // shorthand
      res.end();
    });
  }
  
  export const eliminarUser = (req: Request, res: Response) => {
    userSchema.deleteOne({_id: req.params.id})
      .then((removeResult:any) => {
          res.send({message: 'Registro eliminado', removeResult});
          res.end();
      });
  }

  // New function to get snippets only
export const obtenerSnippetsDeUsuario = (req: Request, res: Response) => {
    const userId = req.params.userId; // Assuming the parameter is userId
    userSchema.findById(userId)
      .then((user: any) => {
        if (!user) {
          res.status(404).send({ message: 'Usuario no encontrado' });
          return;
        }
  
        const snippets = user.snippets || [];
        res.send({ snippets });
      })
      .catch((error: any) => {
        res.status(500).send({ message: 'Error al obtener snippets del usuario', error });
      });
  };

  export const agregarSnippetAUsuario = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const snippetId = req.params.snippetId;
  
    try {
      // Check if the snippet exists
      const existingSnippet = await fileSchema.findById(snippetId);
      if (!existingSnippet) {
        return res.status(404).send({ message: 'Snippet no encontrado' });
      }
  
      // Update the user to add the existing snippet
      const updatedUser = await userSchema.findByIdAndUpdate(
        userId,
        { $push: { snippets: existingSnippet._id } },
        { new: true }
      );
  
      res.send({ message: 'Se agregó el snippet al usuario', snippet: existingSnippet, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error', error });
    }
  };

  export const encontrarUsuarioPorCredenciales = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.query;
  
      // Find user by username and password
      const user = await userSchema.findOne({ username, password });
  
      if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
        return;
      }
  
      res.send({ message: 'Usuario encontrado correctamente', user });
    } catch (error) {
      console.error('Error al encontrar usuario por credenciales:', error);
      res.status(500).send({ message: 'Error al encontrar usuario por credenciales', error });
    }
  };

  // New function to delete a snippet from the user's array
export const eliminarSnippetDeUsuario = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Assuming the parameter is userId
    const { snippetId } = req.body;

    // Find user by ID
    const user = await userSchema.findById(userId);
    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
      return;
    }

    // Find index of the snippet to delete
    const snippetIndex = user.snippets.findIndex((s: any) => s.toString() === snippetId);
    if (snippetIndex === -1) {
      res.status(404).send({ message: 'Snippet no encontrado en la lista del usuario' });
      return;
    }

    // Remove the snippet from the array
    user.snippets.splice(snippetIndex, 1);
    
    // Save the updated user
    const updatedUser = await user.save();

    res.send({ message: 'Snippet eliminado correctamente', user: updatedUser });
  } catch (error) {
    console.error('Error al eliminar snippet del usuario:', error);
    res.status(500).send({ message: 'Error al eliminar snippet del usuario', error });
  }
};