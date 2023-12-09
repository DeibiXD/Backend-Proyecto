"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("../controllers/folder.controller");
let router = express_1.default.Router();
router.get('/', folder_controller_1.obtenerFolders);
router.post('/', folder_controller_1.guardarFolder);
router.put('/:id', folder_controller_1.actualizarFolder);
router.delete('/:id', folder_controller_1.eliminarFolder);
exports.default = router;
