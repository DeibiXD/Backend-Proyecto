"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarSnippet = exports.actualizarSnippet = exports.guardarSnippet = exports.obtenerSnippets = void 0;
const file_schema_1 = require("../models/file.schema");
const obtenerSnippets = (peticion, respuesta) => {
    file_schema_1.fileSchema.find()
        .then((result) => {
        respuesta.send(result);
        respuesta.end();
    })
        .catch((error) => console.error(error));
};
exports.obtenerSnippets = obtenerSnippets;
const guardarSnippet = (req, res) => {
    const p = new file_schema_1.fileSchema(req.body);
    p.save().then((saveResponse) => {
        res.send(saveResponse);
        res.end();
    }).catch((error) => {
        console.log('ERRRORRR: ', error);
        res.send({ message: 'Hubo un error al guardar', error }); // shorthand
        res.end();
    });
};
exports.guardarSnippet = guardarSnippet;
const actualizarSnippet = (req, res) => {
    file_schema_1.fileSchema.updateOne({ _id: req.params.id }, req.body).then((updateResponse) => {
        res.send({ message: 'Registro actualizado', updateResponse });
        res.end();
    }).catch((error) => {
        res.send({ message: 'Hubo un error al actualizar', error }); // shorthand
        res.end();
    });
};
exports.actualizarSnippet = actualizarSnippet;
const eliminarSnippet = (req, res) => {
    file_schema_1.fileSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        res.send({ message: 'Registro eliminado', removeResult });
        res.end();
    });
};
exports.eliminarSnippet = eliminarSnippet;
