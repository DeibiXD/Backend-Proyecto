"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.server = 'localhost';
        this.port = '27017';
        this.db = 'proyecto';
        // Cadena de conexión
        mongoose_1.default.connect(`mongodb://${this.server}:${this.port}/${this.db}`)
            .then(() => {
            console.log('Se conectó a Mongo');
        }).catch((error) => {
            console.error('Ocurrió un error al conectarse', error);
        });
    }
}
exports.Database = Database;
