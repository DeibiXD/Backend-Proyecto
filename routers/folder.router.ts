import express from 'express';
import { obtenerFolders, guardarFolder, actualizarFolder, eliminarFolder } from '../controllers/folder.controller';

let router = express.Router();

router.get('/', obtenerFolders);
router.post('/', guardarFolder);
router.put('/:id', actualizarFolder);
router.delete('/:id', eliminarFolder);

export default router;