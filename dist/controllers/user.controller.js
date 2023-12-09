"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encontrarUsuarioPorCredenciales = exports.agregarSnippetsAUsuario = exports.obtenerSnippetsDeUsuario = exports.eliminarUser = exports.actualizarUser = exports.guardarUser = exports.obtenerUsers = void 0;
const user_schema_1 = require("../models/user.schema");
const obtenerUsers = (peticion, respuesta) => {
    user_schema_1.userSchema.find()
        .then((result) => {
        respuesta.send(result);
        respuesta.end();
    })
        .catch((error) => console.error(error));
};
exports.obtenerUsers = obtenerUsers;
const guardarUser = (req, res) => {
    const p = new user_schema_1.userSchema(req.body);
    p.save().then((saveResponse) => {
        res.send(saveResponse);
        res.end();
    }).catch((error) => {
        console.log('ERRRORRR: ', error);
        res.send({ message: 'Hubo un error al guardar', error }); // shorthand
        res.end();
    });
};
exports.guardarUser = guardarUser;
const actualizarUser = (req, res) => {
    user_schema_1.userSchema.updateOne({ _id: req.params.id }, req.body).then((updateResponse) => {
        res.send({ message: 'Registro actualizado', updateResponse });
        res.end();
    }).catch((error) => {
        res.send({ message: 'Hubo un error al actualizar', error }); // shorthand
        res.end();
    });
};
exports.actualizarUser = actualizarUser;
const eliminarUser = (req, res) => {
    user_schema_1.userSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        res.send({ message: 'Registro eliminado', removeResult });
        res.end();
    });
};
exports.eliminarUser = eliminarUser;
// New function to get snippets only
const obtenerSnippetsDeUsuario = (req, res) => {
    const userId = req.params.userId; // Assuming the parameter is userId
    user_schema_1.userSchema.findById(userId)
        .then((user) => {
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado' });
            return;
        }
        const snippets = user.snippets || [];
        res.send({ snippets });
    })
        .catch((error) => {
        res.status(500).send({ message: 'Error al obtener snippets del usuario', error });
    });
};
exports.obtenerSnippetsDeUsuario = obtenerSnippetsDeUsuario;
// New function to add snippets to the user's array
const agregarSnippetsAUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId; // Assuming the parameter is userId
        const { snippetsToAdd } = req.body;
        // Validate user tier for snippet storage
        const user = yield user_schema_1.userSchema.findById(userId);
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado' });
            return;
        }
        const currentSnippets = user.snippets || [];
        const tier = user.tier || 0; // Assuming a default value of 0 if tier is not present
        // Set snippet storage limits based on tier
        let snippetLimit = Infinity; // Default: Unlimited storage
        if (tier === 2) {
            snippetLimit = 20;
        }
        else if (tier === 3) {
            snippetLimit = 10;
        }
        // Check if the user is valid for more storage
        if (currentSnippets.length + snippetsToAdd.length > snippetLimit) {
            res.status(400).send({ message: 'El usuario ha alcanzado su límite de almacenamiento de snippets' });
            return;
        }
        // Add snippets to the user's array
        user.snippets = currentSnippets.concat(snippetsToAdd);
        const updatedUser = yield user.save();
        res.send({ message: 'Snippets agregados correctamente', user: updatedUser });
    }
    catch (error) {
        console.error('Error al agregar snippets al usuario:', error);
        res.status(500).send({ message: 'Error al agregar snippets al usuario', error });
    }
});
exports.agregarSnippetsAUsuario = agregarSnippetsAUsuario;
const encontrarUsuarioPorCredenciales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.query;
        // Find user by username and password
        const user = yield user_schema_1.userSchema.findOne({ username, password });
        if (!user) {
            res.status(404).send({ message: 'Usuario no encontrado' });
            return;
        }
        res.send({ message: 'Usuario encontrado correctamente', user });
    }
    catch (error) {
        console.error('Error al encontrar usuario por credenciales:', error);
        res.status(500).send({ message: 'Error al encontrar usuario por credenciales', error });
    }
});
exports.encontrarUsuarioPorCredenciales = encontrarUsuarioPorCredenciales;
