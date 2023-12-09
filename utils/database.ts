import mongoose from "mongoose";

export class Database {
    server:string ='localhost';
    port:string = '27017';
    db:string = 'proyecto';

  constructor() {
    // Cadena de conexión
    mongoose.connect(`mongodb://${this.server}:${this.port}/${this.db}`)
    .then(()=>{
      console.log('Se conectó a Mongo');
    }).catch((error) => {
      console.error('Ocurrió un error al conectarse', error);
    });
  }
}