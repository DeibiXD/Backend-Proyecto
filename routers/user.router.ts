import express from 'express';
import { obtenerUsers, guardarUser, actualizarUser, eliminarUser, agregarSnippetAUsuario, encontrarUsuarioPorCredenciales, obtenerSnippetsDeUsuario, eliminarSnippetDeUsuario} from '../controllers/user.controller';

let router = express.Router();

router.get('/', obtenerUsers);
router.post('/', guardarUser);
router.put('/:id', actualizarUser);
router.delete('/:id', eliminarUser);
router.get('/obtenerSnippets/:userId', obtenerSnippetsDeUsuario);
router.put('/agregarSnippetAUsuario/:userId/:snippetId', agregarSnippetAUsuario);
router.get('/encontrarUsuario', encontrarUsuarioPorCredenciales);
router.delete('/eliminarSnippet/:userId', eliminarSnippetDeUsuario);


export default router;