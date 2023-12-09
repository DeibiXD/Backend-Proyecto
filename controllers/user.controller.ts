import { Request, Response } from 'express';
import { user } from '../models/user.model';
import { userSchema } from '../models/user.schema';

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

  // New function to add snippets to the user's array
export const agregarSnippetsAUsuario = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId; // Assuming the parameter is userId
      const { snippetsToAdd } = req.body;
  
      // Validate user tier for snippet storage
      const user = await userSchema.findById(userId);
      if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
        return;
      }
  
      const currentSnippets = user.snippets || [];
      const tier = user.tier || 0; // Assuming a default value of 0 if tier is not present
  
      // Set snippet storage limits based on tier
      let snippetLimit = Infinity; // Default: Unlimited storage
      if (tier === 2) {
        snippetLimit = 20;
      } else if (tier === 3) {
        snippetLimit = 10;
      }
  
      // Check if the user is valid for more storage
      if (currentSnippets.length + snippetsToAdd.length > snippetLimit) {
        res.status(400).send({ message: 'El usuario ha alcanzado su límite de almacenamiento de snippets' });
        return;
      }
  
      // Add snippets to the user's array
      user.snippets = currentSnippets.concat(snippetsToAdd);
      const updatedUser = await user.save();
  
      res.send({ message: 'Snippets agregados correctamente', user: updatedUser });
    } catch (error) {
      console.error('Error al agregar snippets al usuario:', error);
      res.status(500).send({ message: 'Error al agregar snippets al usuario', error });
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