import express from 'express';
import { obtenerFolders, guardarFolder, actualizarFolder, eliminarFolder, agregarSnippetAFolder } from '../controllers/folder.controller';

let router = express.Router();

router.get('/', obtenerFolders);
router.post('/', guardarFolder);
router.put('/:id', actualizarFolder);
router.delete('/:id', eliminarFolder);
router.put('/agregarSnippetAFolder/:folderId/:snippetId', agregarSnippetAFolder);


export default router;