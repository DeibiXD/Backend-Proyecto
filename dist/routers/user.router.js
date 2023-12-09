"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
let router = express_1.default.Router();
router.get('/', user_controller_1.obtenerUsers);
router.post('/', user_controller_1.guardarUser);
router.put('/:id', user_controller_1.actualizarUser);
router.delete('/:id', user_controller_1.eliminarUser);
router.get('/obtenerSnippets/:userId', user_controller_1.obtenerSnippetsDeUsuario);
router.post('/agregarSnippets/:userId', user_controller_1.agregarSnippetsAUsuario);
router.get('/encontrarUsuario', user_controller_1.encontrarUsuarioPorCredenciales);
exports.default = router;
