import express from 'express';
import { obtenerFolders, guardarFolder, actualizarFolder, eliminarFolder, agregarSnippetAFolder, obtenerFolderPorId } from '../controllers/folder.controller';

let router = express.Router();

router.get('/', obtenerFolders);
router.post('/', guardarFolder);
router.put('/:id', actualizarFolder);
router.delete('/:id', eliminarFolder);
router.put('/agregarSnippetAFolder/:folderId/:snippetId', agregarSnippetAFolder);
router.get('/obtenerFolderPorId/:id', obtenerFolderPorId);



export default router;