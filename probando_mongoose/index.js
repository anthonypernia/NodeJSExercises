let {Schema, model} = require('mongoose');
let { connection, mongoose } = require('./config/database');
let { estudiantesCreateSchema } = require('./schemas/estudiantesSchema');
const estudiantesSchema = new Schema(estudiantesCreateSchema);
const estudiantesModel = model('estudiantes', estudiantesSchema);

///Creando usuarios (Correr en la bash shell de mongo )
// db.createUser({user:"anthony", pwd:"12345", roles:[{role:"readWrite", db:"coderhouse"}]})

////Insertando estudiantes

// (
//     async () => {
//         let estudiantes = [
//             { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
//             { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
//             { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
//             { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
//             { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
//             { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
//             { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
//             { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
//             { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
//             { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
//         ]
//         try {
//             const inserciones = [];

//             for (const estudiante of estudiantes) {
//                 inserciones.push(estudiantesModel.create(estudiante));
//             }

//             let result = await Promise.allSettled(inserciones);

//             let response = result.filter(r => r.status === 'fulfilled');
//             if (response.length >0 ) {
//                 console.log('Se insertaron correctamente los estudiantes');
//             } else {
//                 console.log('No se pudieron insertar los estudiantes');
//             }

//             await mongoose.disconnect();

//         } catch (error) {
//             console.log(error);
//         }
//     }
// )()


////Consultando estudiantes
(
    async () => {
        try {
            let estudiantes = await estudiantesModel.find({}).sort({ nombre: 1 });
            console.log(estudiantes);
            await mongoose.disconnect();
        } catch (error) {
            console.log(error);
        }
    }
)()