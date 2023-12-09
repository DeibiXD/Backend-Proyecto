import express from 'express';
import { obtenerSnippets, guardarSnippet, actualizarSnippet, eliminarSnippet } from '../controllers/file.controller';

let router = express.Router();

router.get('/', obtenerSnippets);
router.post('/', guardarSnippet);
router.put('/:id', actualizarSnippet);
router.delete('/:id', eliminarSnippet);

export default router;