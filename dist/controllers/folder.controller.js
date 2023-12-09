"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarFolder = exports.actualizarFolder = exports.guardarFolder = exports.obtenerFolders = void 0;
const folder_schema_1 = require("../models/folder.schema");
const obtenerFolders = (peticion, respuesta) => {
    folder_schema_1.folderSchema.find()
        .then((result) => {
        respuesta.send(result);
        respuesta.end();
    })
        .catch((error) => console.error(error));
};
exports.obtenerFolders = obtenerFolders;
const guardarFolder = (req, res) => {
    const p = new folder_schema_1.folderSchema(req.body);
    p.save().then((saveResponse) => {
        res.send(saveResponse);
        res.end();
    }).catch((error) => {
        console.log('ERRRORRR: ', error);
        res.send({ message: 'Hubo un error al guardar', error }); // shorthand
        res.end();
    });
};
exports.guardarFolder = guardarFolder;
const actualizarFolder = (req, res) => {
    folder_schema_1.folderSchema.updateOne({ _id: req.params.id }, req.body).then((updateResponse) => {
        res.send({ message: 'Registro actualizado', updateResponse });
        res.end();
    }).catch((error) => {
        res.send({ message: 'Hubo un error al actualizar', error }); // shorthand
        res.end();
    });
};
exports.actualizarFolder = actualizarFolder;
const eliminarFolder = (req, res) => {
    folder_schema_1.folderSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        res.send({ message: 'Registro eliminado', removeResult });
        res.end();
    });
};
exports.eliminarFolder = eliminarFolder;
