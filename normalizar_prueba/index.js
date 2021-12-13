let { schema, normalize, denormalize } = require("normalizr");
let print = require("./utils");

// const empresa = {
//   id: "1000",
//   nombre: "Coderhouse",
//   gerente: {
//     id: "2",
//     nombre: "Pedro",
//     apellido: "Mei",
//     DNI: "20442639",
//     direccion: "CABA 457",
//     telefono: "1567811544",
//   },
//   encargado: {
//     id: "3",
//     nombre: "Pablo",
//     apellido: "Blanco",
//     DNI: "20442640",
//     direccion: "CABA 458",
//     telefono: "1567811545",
//   },
//   empleados: [
//     {
//       id: "1",
//       nombre: "Nicole",
//       apellido: "Gonzalez",
//       DNI: "20442638",
//       direccion: "CABA 456",
//       telefono: "1567811543",
//     },
//     {
//       id: "2",
//       nombre: "Pedro",
//       apellido: "Mei",
//       DNI: "20442639",
//       direccion: "CABA 457",
//       telefono: "1567811544",
//     },
//     {
//       id: "3",
//       nombre: "Pablo",
//       apellido: "Blanco",
//       DNI: "20442640",
//       direccion: "CABA 458",
//       telefono: "1567811545",
//     },
//     {
//       id: "4",
//       nombre: "Ana",
//       apellido: "Rojo",
//       DNI: "20442641",
//       direccion: "CABA 459",
//       telefono: "1567811546",
//     },
//     {
//       id: "5",
//       nombre: "Lucia",
//       apellido: "Sorbo",
//       DNI: "20442642",
//       direccion: "CABA 460",
//       telefono: "1567811547",
//     },
//     {
//       id: "6",
//       nombre: "Jose",
//       apellido: "Pieres",
//       DNI: "20442643",
//       direccion: "CABA 461",
//       telefono: "1567811548",
//     },
//     {
//       id: "7",
//       nombre: "Maria",
//       apellido: "Lopez",
//       DNI: "20442644",
//       direccion: "CABA 462",
//       telefono: "1567811549",
//     },
//   ],
// };


// const empleado = new schema.Entity("empleado");

// const organigrama = new schema.Entity("organigrama", {
//     gerente: empleado,
//     encargado: empleado,
//     empleados: [empleado]
// });

// console.log('----------------')
// let nomalized = normalize(empresa, organigrama);

// print(nomalized);

// console.log('---------Normalized------->', JSON.stringify(nomalized).length);

// console.log('---------No-Normalized------->', JSON.stringify(empresa).length);

// console.log('----------------')

// console.log(nomalized.result)
// console.log(nomalized.entities)

// console.log('----------------')

// let denormalized = denormalize(nomalized.result, organigrama, nomalized.entities);

// print(denormalized);

// console.log('---------Denormalized------->', JSON.stringify(denormalized).length);

const originalData = {
    id: "999",
    posts: [
      {
        id: "123",
        author: {
          id: "1",
          nombre: "Pablo",
          apellido: "Perez",
          DNI: "20442654",
          direccion: "CABA 123",
          telefono: "1567876547"
        },
        title: "My awesome blog post",
        comments: [
          {
            id: "324",
            commenter: {
              id: "2",
              nombre: "Nicole",
              apellido: "Gonzalez",
              DNI: "20442638",
              direccion: "CABA 456",
              telefono: "1567811543"
            }
          },
          {
            id: "325",
            commenter: {
              id: "3",
              nombre: "Pedro",
              apellido: "Mei",
              DNI: "20446938",
              direccion: "CABA 789",
              telefono: "1567291542"
            }
          }
        ]
      },
      {
        id: "1123",
        author: {
          id: "2",
          nombre: "Nicole",
          apellido: "Gonzalez",
          DNI: "20442638",
          direccion: "CABA 456",
          telefono: "1567811543"
        },
        title: "My awesome blog post",
        comments: [
          {
            id: "1324",
            commenter: {
              id: "1",
              nombre: "Pablo",
              apellido: "Perez",
              DNI: "20442654",
              direccion: "CABA 123",
              telefono: "1567876547"
            }
          },
          {
            id: "1325",
            commenter: {
              id: "3",
              nombre: "Pedro",
              apellido: "Mei",
              DNI: "20446938",
              direccion: "CABA 789",
              telefono: "1567291542"
            }
          }
        ]
      },
      {
        id: "2123",
        author: {
          id: "3",
          nombre: "Pedro",
          apellido: "Mei",
          DNI: "20446938",
          direccion: "CABA 789",
          telefono: "1567291542"
        },
        title: "My awesome blog post",
        comments: [
          {
            id: "2324",
            commenter: {
              id: "2",
              nombre: "Nicole",
              apellido: "Gonzalez",
              DNI: "20442638",
              direccion: "CABA 456",
              telefono: "1567811543"
            }
          },
          {
            id: "2325",
            commenter: {
              id: "1",
              nombre: "Pablo",
              apellido: "Perez",
              DNI: "20442654",
              direccion: "CABA 123",
              telefono: "1567876547"
            }
          }
        ]
      }
    ]
  }

  const holding = {
    id: "10000",
    empresas: [
      {
        id: "1000",
        nombre: "Coderhouse",
        gerente: {
          id: "2",
          nombre: "Pedro",
          apellido: "Mei",
          DNI: "20442639",
          direccion: "CABA 457",
          telefono: "1567811544"
        },
        encargado: {
          id: "3",
          nombre: "Pablo",
          apellido: "Blanco",
          DNI: "20442640",
          direccion: "CABA 458",
          telefono: "1567811545"
        },
        empleados: [
          {
            id: "1",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
          },
          {
            id: "2",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20442639",
            direccion: "CABA 457",
            telefono: "1567811544"
          },
          {
            id: "3",
            nombre: "Pablo",
            apellido: "Blanco",
            DNI: "20442640",
            direccion: "CABA 458",
            telefono: "1567811545"
          },
          {
            id: "4",
            nombre: "Ana",
            apellido: "Rojo",
            DNI: "20442641",
            direccion: "CABA 459",
            telefono: "1567811546"
          },
          {
            id: "5",
            nombre: "Lucia",
            apellido: "Sorbo",
            DNI: "20442642",
            direccion: "CABA 460",
            telefono: "1567811547"
          },
          {
            id: "6",
            nombre: "Jose",
            apellido: "Pieres",
            DNI: "20442643",
            direccion: "CABA 461",
            telefono: "1567811548"
          },
          {
            id: "7",
            nombre: "Maria",
            apellido: "Lopez",
            DNI: "20442644",
            direccion: "CABA 462",
            telefono: "1567811549"
          }
        ]
      },
      {
        id: "1001",
        nombre: "Coderhouse2",
        gerente: {
          id: "6",
          nombre: "Jose",
          apellido: "Pieres",
          DNI: "20442643",
          direccion: "CABA 461",
          telefono: "1567811548"
        },
        encargado: {
          id: "5",
          nombre: "Lucia",
          apellido: "Sorbo",
          DNI: "20442642",
          direccion: "CABA 460",
          telefono: "1567811547"
        },
        empleados: [
          {
            id: "1",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
          },
          {
            id: "2",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20442639",
            direccion: "CABA 457",
            telefono: "1567811544"
          },
          {
            id: "5",
            nombre: "Lucia",
            apellido: "Sorbo",
            DNI: "20442642",
            direccion: "CABA 460",
            telefono: "1567811547"
          },
          {
            id: "6",
            nombre: "Jose",
            apellido: "Pieres",
            DNI: "20442643",
            direccion: "CABA 461",
            telefono: "1567811548"
          },
          {
            id: "7",
            nombre: "Maria",
            apellido: "Lopez",
            DNI: "20442644",
            direccion: "CABA 462",
            telefono: "1567811549"
          },
          {
            id: "8",
            nombre: "Lucio",
            apellido: "Garcia",
            DNI: "20442645",
            direccion: "CABA 463",
            telefono: "1567811550"
          }
        ]
      },
      {
        id: "1002",
        nombre: "Coderhouse3",
        gerente: {
          id: "9",
          nombre: "Diego",
          apellido: "Sojo",
          DNI: "20442646",
          direccion: "CABA 464",
          telefono: "1567811551"
        },
        encargado: {
          id: "8",
          nombre: "Lucio",
          apellido: "Garcia",
          DNI: "20442645",
          direccion: "CABA 463",
          telefono: "1567811550"
        },
        empleados: [
          {
            id: "4",
            nombre: "Ana",
            apellido: "Rojo",
            DNI: "20442641",
            direccion: "CABA 459",
            telefono: "1567811546"
          },
          {
            id: "5",
            nombre: "Lucia",
            apellido: "Sorbo",
            DNI: "20442642",
            direccion: "CABA 460",
            telefono: "1567811547"
          },
          {
            id: "6",
            nombre: "Jose",
            apellido: "Pieres",
            DNI: "20442643",
            direccion: "CABA 461",
            telefono: "1567811548"
          },
          {
            id: "7",
            nombre: "Maria",
            apellido: "Lopez",
            DNI: "20442644",
            direccion: "CABA 462",
            telefono: "1567811549"
          },
          {
            id: "9",
            nombre: "Diego",
            apellido: "Sojo",
            DNI: "20442646",
            direccion: "CABA 464",
            telefono: "1567811551"
          }
        ]
      }      
    ]
}

const empleado = new schema.Entity("empleado");

const organigrama = new schema.Entity("organigrama", {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
});

const holding_schema = new schema.Entity("empresas", {
    empresas: [organigrama]
});

let normalized_holding = normalize(holding, holding_schema);
let denormalized_holding = denormalize(normalized_holding.result, holding_schema, normalized_holding.entities);

print(JSON.stringify(normalized_holding).length);
print(JSON.stringify(holding).length);
print(JSON.stringify(denormalized_holding).length);
let percentage_normalized = (JSON.stringify(normalized_holding).length * 100) / JSON.stringify(denormalized_holding).length;
print(percentage_normalized);



