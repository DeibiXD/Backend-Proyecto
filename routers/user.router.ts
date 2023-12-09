import express from 'express';
import { obtenerUsers, guardarUser, actualizarUser, eliminarUser, agregarSnippetsAUsuario, encontrarUsuarioPorCredenciales, obtenerSnippetsDeUsuario } from '../controllers/user.controller';

let router = express.Router();

router.get('/', obtenerUsers);
router.post('/', guardarUser);
router.put('/:id', actualizarUser);
router.delete('/:id', eliminarUser);
router.get('/obtenerSnippets/:userId', obtenerSnippetsDeUsuario);
router.post('/agregarSnippets/:userId', agregarSnippetsAUsuario);
router.get('/encontrarUsuario', encontrarUsuarioPorCredenciales);

export default router;