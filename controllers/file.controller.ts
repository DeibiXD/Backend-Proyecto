import { Request, Response } from 'express';
import { file } from '../models/file.model';
import { fileSchema } from '../models/file.schema';

export const obtenerSnippets = (peticion: Request, respuesta: Response) => {
    fileSchema.find()
          .then((result:Array<file>) => {
              respuesta.send(result);
              respuesta.end();
          })
          .catch((error:any) => console.error(error));
  }

  export const guardarSnippet = (req: Request, res: Response) => {
	 const p = new fileSchema(req.body);
	p.save().then((saveResponse:any) => {
	  res.send(saveResponse);
	  res.end();
	}).catch((error:any) => {
	  console.log('ERRRORRR: ', error);
	  res.send({message: 'Hubo un error al guardar', error}); // shorthand
	  res.end();
	});
  }

  export const actualizarSnippet = (req: Request, res: Response) => {
    fileSchema.updateOne({_id: req.params.id}, req.body
    ).then((updateResponse:any) => {
      res.send({message: 'Registro actualizado', updateResponse});
      res.end();
    }).catch((error:any) =>{
      res.send({message: 'Hubo un error al actualizar', error}); // shorthand
      res.end();
    });
  }
  
  export const eliminarSnippet = (req: Request, res: Response) => {
    fileSchema.deleteOne({_id: req.params.id})
      .then((removeResult:any) => {
          res.send({message: 'Registro eliminado', removeResult});
          res.end();
      });
  }