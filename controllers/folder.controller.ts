import { Request, Response } from 'express';
import { folder } from '../models/folder.model';
import { folderSchema } from '../models/folder.schema';
import { fileSchema } from '../models/file.schema';

export const obtenerFolders = (peticion: Request, respuesta: Response) => {
    folderSchema.find()
          .then((result:Array<folder>) => {
              respuesta.send(result);
              respuesta.end();
          })
          .catch((error:any) => console.error(error));
  }

  export const guardarFolder = (req: Request, res: Response) => {
	 const p = new folderSchema(req.body);
	p.save().then((saveResponse:any) => {
	  res.send(saveResponse);
	  res.end();
	}).catch((error:any) => {
	  console.log('ERRRORRR: ', error);
	  res.send({message: 'Hubo un error al guardar', error}); // shorthand
	  res.end();
	});
  }

  export const actualizarFolder = (req: Request, res: Response) => {
    folderSchema.updateOne({_id: req.params.id}, req.body
    ).then((updateResponse:any) => {
      res.send({message: 'Registro actualizado', updateResponse});
      res.end();
    }).catch((error:any) =>{
      res.send({message: 'Hubo un error al actualizar', error}); // shorthand
      res.end();
    });
  }
  
  export const eliminarFolder = (req: Request, res: Response) => {
    folderSchema.deleteOne({_id: req.params.id})
      .then((removeResult:any) => {
          res.send({message: 'Registro eliminado', removeResult});
          res.end();
      });
  }

  export const agregarSnippetAFolder = async (req: Request, res: Response) => {
    const folderId = req.params.folderId;
    const snippetId = req.params.snippetId;
  
    try {
      // Check if the snippet exists
      const existingSnippet = await fileSchema.findById(snippetId);
      if (!existingSnippet) {
        return res.status(404).send({ message: 'Snippet no encontrado' });
      }
  
      // Update the folder to add the existing snippet
      const updatedFolder = await folderSchema.findByIdAndUpdate(
        folderId,
        { $push: { snippets: existingSnippet._id } },
        { new: true }
      );
  
      res.send({ message: 'Se agregó el snippet al usuario', snippet: existingSnippet, folder: updatedFolder });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error', error });
    }
  };