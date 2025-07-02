use('MER_NOMINA_ACME_CORPORATE');


// SISTEMA DE VALIDACION PARA LA COLECCION DE USUARIOS
db.createCollection('empleados',{
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "tipoDeId",
          "numeroId",
          "nombres",
          "apellidos",
          "telefono",
          "email",
          "genero",
          "ciudad",
          "direccion",
          "activo"
        ],
        additionalProperties: false,
        properties: {
          _id:{
            bsonType: 'objectId'
          },
          tipoDeId: {
            bsonType: "object",
            required: ["tipo", "nombre"],
            properties: {
              tipo: {
                bsonType: 'string',
                enum: ["CC", "CE", "PA"],
              },
              nombre: {
                bsonType: "string",
              }
            }
          },
          numeroId: {
            bsonType: "string",
            pattern: "^[0-9]+$", // Número de identificación debe ser numérico en texto
          },
          nombres: {
            bsonType: "string"
          },
          apellidos: {
            bsonType: "string"
          },
          telefono: {
            bsonType: "string"
          },
          email: {
            bsonType: "string",
            pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", // Expresion regular para validar el correo
          },
          genero: {
            bsonType: 'string',
            enum: ["M", "F", "O"],
          },
          ciudad: {
            bsonType: "object",
            required: ["codigo", "nombre", "departamento"],
            properties: {
              codigo: {
                bsonType: "string"
              },
              nombre: {
                bsonType: "string"
              },
              departamento: {
                bsonType: "object",
                required: ["codigo", "nombre"],
                properties: {
                  codigo: {
                    bsonType: "string"
                  },
                  nombre: {
                    bsonType: "string"
                  }
                }
              }
            }
          },
          direccion: {
            bsonType: "string"
          },
          activo: {
            bsonType: "bool"
          }
        },
      }
    }
});



// SISTEMA DE VALIDACION PARA LA COLECCION DE CONTRATOS 

db.createCollection('contratos',{
    validator: {
        $jsonSchema:{
            bsonType: 'object',
            required: ['_id','codigo', 'empleadoId', 'tipoDeContrato', 'duracion', 'cargo', 'salarioBase', 'activo'],
            additionalProperties: false,
            properties:{
                _id:{
                  bsonType: 'objectId'
                },
                codigo:{
                  bsonType: 'string'
                },
                empleadoId:{
                  bsonType: 'objectId'
                },
                tipoDeContrato:{
                  bsonType: 'object',
                  required: ['tipo', 'nombre'],
                  properties:{
                    tipo:{
                      bsonType: 'string'
                    },
                    nombre:{
                      bsonType: 'string'
                    }
                  }
                },
                duracion:{
                  bsonType: 'int'
                },
                cargo:{
                  bsonType: 'object',
                  required: ['tipo', 'nombre', 'area', ],
                  properties:{
                    tipo:{
                      bsonType: 'string'
                    },
                    nombre:{
                      bsonType: 'string'
                    },
                    area:{
                      bsonType: 'object',
                      required:['tipo', 'nombre'],
                      properties:{
                        tipo:{
                          bsonType: 'string'
                        },
                        nombre:{
                          bsonType: 'string'
                        }
                      }
                    }
                  }
                },
                salarioBase:{
                  bsonType: ['int', 'double']
                },
                activo:{
                  bsonType: 'bool'
                }
            }
        }
    }
});


// SISTEMA DE VALIDACION PARA LA COLECCION DE NOMINAS

db.createCollection('nominas',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id","codigo", "fechaInicial", "fechaFinal", "contratos"],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        codigo: {
          bsonType: "string"
        },
        fechaInicial: {
          bsonType: "date"
        },
        fechaFinal: {
          bsonType: "date"
        },
        contratos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["contratoId", "devengos", "deducciones"],
            properties: {
              contratoId: {
                bsonType: "objectId"
              },
              devengos: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["nombre", "valor"],
                  properties: {
                    nombre: {
                      bsonType: "string"
                    },
                    valor: {
                      bsonType: ["int", "double"]
                    }
                  }
                }
              },
              deducciones: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["nombre", "valor"],
                  properties: {
                    nombre: {
                      bsonType: "string"
                    },
                    valor: {
                      bsonType: ["int", "double"]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});


// SISTEMA DE VALIDACION PARA LA COLECCION DE CONCEPTOS

db.createCollection('conceptos',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "codigo", "nombre", "tipo", "porcentaje", "activo"],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId"
        },
        codigo: {
          bsonType: "string"
        },
        nombre: {
          bsonType: "string"
        },
        tipo: {
          bsonType: "string",
          enum: ["DEV", "DED"]  
        },
        porcentaje: {
          bsonType: ["int", "double"],
          minimum: 0,
          maximum: 100
        },
        activo: {
          bsonType: "bool"
        }
      }
    }
  }
});

// SISTEMA DE VALIDACION PARA LA COLECCION DE NOVEDADES

db.createCollection('novedades',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "nomina_codigo",
        "contrato_id",
        "tipo",
        "fecha_inicial",
        "fecha_final",
        "observacion"
      ],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId"
        },
        nomina_codigo: {
          bsonType: "string"
        },
        contrato_id: {
          bsonType: "objectId"
        },
        tipo: {
          bsonType: "object",
          required: ["nombre"],
          additionalProperties: false,
          properties: {
            nombre: {
              bsonType: "string",
              enum: ["FALTA", "SUSPENSIÓN", "LICENCIA"]
            }
          }
        },
        fecha_inicial: {
          bsonType: "date"
        },
        fecha_final: {
          bsonType: "date"
        },
        observacion: {
          bsonType: "string"
        }
      }
    }
  }
});


// INDICES

// empleados
db.empleados.createIndex({ numeroId: 1 });
db.empleados.createIndex({ "ciudad.codigo": 1 });
db.empleados.createIndex({ genero: 1 });

// contratos
db.contratos.createIndex({ empleadoId: 1 });
db.contratos.createIndex({ activo: 1 });
db.contratos.createIndex({ salarioBase: 1 });
db.contratos.createIndex({ "tipoDeContrato.tipo": 1 });

// nominas
db.nominas.createIndex({ codigo: 1 });

// novedades
db.novedades.createIndex({ contrato_id: 1 });
db.novedades.createIndex({ "tipo.nombre": 1 });
db.novedades.createIndex({ fecha_inicial: 1, fecha_final: 1 });



// CREACION ROL ADMINISTRADOR
db.createRole({
  role: "Administrador",
  privileges: [
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "" },
      actions: ["find", "insert", "update", "remove", "createCollection", "dropCollection", "createIndex", "dropIndex"]
    }
  ],
  roles: [] 
});

// CREACION DE ROL DE NOMINA

db.createRole({
  role: "GestorNomina",
  privileges: [
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "empleados" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "contratos" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "novedades" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "nominas" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "conceptos" },
      actions: ["find", "insert", "update"]
    }
  ],
  roles: []
});

// CREACION DE ROL EMPLEADO

db.createRole({
  role: "Empleado",
  privileges: [
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "empleados" },
      actions: ["find"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "contratos" },
      actions: ["find"]
    },
    {
      resource: { db: "MER_NOMINA_ACME_CORPORATE", collection: "nominas" },
      actions: ["find"]
    }
  ],
  roles: []
});


// ASIGNACION DE LOS ROLES CREADOS

db.createUser({
  user: "admin",
  pwd: "admin12345",
  roles: [{ role: "Administrador", db: "MER_NOMINA_ACME_CORPORATE" }]
});

db.createUser({
  user: "gestor_nomina1",
  pwd: "gestor12345",
  roles: [{ role: "GestorNomina", db: "MER_NOMINA_ACME_CORPORATE" }]
});

db.createUser({
  user: "empleadoEduin",
  pwd: "empleado123",
  roles: [{ role: "Empleado", db: "MER_NOMINA_ACME_CORPORATE" }]
});


