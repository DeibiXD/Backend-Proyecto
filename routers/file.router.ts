import express from 'express';
import { obtenerSnippets, guardarSnippet, actualizarSnippet, eliminarSnippet, obtenerSnippetPorId } from '../controllers/file.controller';

let router = express.Router();

router.get('/', obtenerSnippets);
router.post('/', guardarSnippet);
router.put('/:id', actualizarSnippet);
router.delete('/:id', eliminarSnippet);
router.get('/obtenerSnippetPorId/:id', obtenerSnippetPorId);

export default router;