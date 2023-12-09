"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controllers/file.controller");
let router = express_1.default.Router();
router.get('/', file_controller_1.obtenerSnippets);
router.post('/', file_controller_1.guardarSnippet);
router.put('/:id', file_controller_1.actualizarSnippet);
router.delete('/:id', file_controller_1.eliminarSnippet);
exports.default = router;
