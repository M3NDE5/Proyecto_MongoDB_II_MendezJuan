// INSERCION DE DATOS PARA LA COLECCION DE EMPLEADOS

const empleado1 = {
  _id: ObjectId('686028f61b109219d5d16ec4'),
  tipoDeId: {
    tipo: "CC",
    nombre: 'Cédula de Ciudadanía'
  },
  numeroId: '1027150430',
  nombres: 'Juan Angel',
  apellidos: 'Mendez Martinez',
  telefono: '3191234567',
  email: 'juan@gmail.com',
  genero: "M",
  ciudad: {
    codigo: "11001",
    nombre: "Bogotá",
    departamento: {
      codigo: "11",
      nombre: "Cundinamarca"
    }
  },
  direccion: 'Calle 145 #10-20',
  activo: true
}
const empleado2 = {
  _id: ObjectId("686494af5412d957fa0ef7f1"),
  tipoDeId: { tipo: "CC", nombre: "Cédula de Ciudadanía" },
  numeroId: "1027150431",
  nombres: "Laura Camargo",
  apellidos: "González",
  telefono: "3204567890",
  email: "laura@gmail.com",
  genero: "F",
  ciudad: {
    codigo: "76001",
    nombre: "Cali",
    departamento: {
      codigo: "76",
      nombre: "Valle del Cauca"
    }
  },
  direccion: "Calle 45 #12-34",
  activo: true
};
const empleado3 = {
  _id: ObjectId("68649eb84f4f43df0ce54c3d"),
  tipoDeId: { tipo: "CE", nombre: "Cédula de Extranjería" },
  numeroId: "987654321",
  nombres: "Carlos Torres",
  apellidos: "Moreno",
  telefono: "3129876543",
  email: "carlos@gmail.com",
  genero: "M",
  ciudad: {
    codigo: "05001",
    nombre: "Medellín",
    departamento: {
      codigo: "05",
      nombre: "Antioquia"
    }
  },
  direccion: "Cra 80 #25-10",
  activo: true
};
const empleado4 = {
  _id: ObjectId("68649ee4e8d4ed1457dedfcc"),
  tipoDeId: { tipo: "PA", nombre: "Pasaporte" },
  numeroId: "1001234567",
  nombres: "Ana María",
  apellidos: "Vélez",
  telefono: "3105678910",
  email: "ana@gmail.com",
  genero: "F",
  ciudad: {
    codigo: "08001",
    nombre: "Barranquilla",
    departamento: {
      codigo: "08",
      nombre: "Atlántico"
    }
  },
  direccion: "Av 33 #15-22",
  activo: true
};

// INSERCION DE DATOS PARA LA COLECCION DE CONTRATOS
const contrato1 = { // CONTRATO EMPLEADO 1
    _id: ObjectId('68645cefa6f8e6538e1bb241'),
    codigo: '001',
    empleadoId: empleado1._id,
    tipoDeContrato: {
        tipo: 'FIJO',
        nombre: 'termino fijo'
    },
    duracion: 12,
    cargo: {
      tipo: 'DEV',
      nombre: 'desarrollador',
      area: {
        tipo: 'TEC',
        nombre: 'Tecnologia'
      }
    },
    salarioBase: 1500000,
    activo: true
}
const contrato2 = { // CONTRATO EMPLEADO 2
  _id: ObjectId("68649aa63a296db5894b0d03"),
  codigo: "002",
  empleadoId: empleado2._id,
  tipoDeContrato: { tipo: "FIJO", nombre: "Termino Fijo" },
  duracion: 6,
  cargo: {
    tipo: "ADM",
    nombre: "Administradora",
    area: { tipo: "ADM", nombre: "Administración" }
  },
  salarioBase: 1200000,
  activo: true
};
const contrato3 = {// CONTRATO EMPLEADO 3
  _id: ObjectId("68649f3270c0efe24e0b7923"),
  codigo: "003",
  empleadoId: empleado3._id,
  tipoDeContrato: { tipo: "INDEFINIDO", nombre: "Indefinido" },
  duracion: 0,
  cargo: {
    tipo: "TEC",
    nombre: "Técnico de Redes",
    area: { tipo: "TEC", nombre: "Tecnologia" }
  },
  salarioBase: 1800000,
  activo: true
};
const contrato4 = { //// CONTRATO EMPLEADO 4
  _id: ObjectId("68649f58447b210b640da057"),
  codigo: "004",
  empleadoId: empleado4._id,
  tipoDeContrato: { tipo: "FIJO", nombre: "Termino Fijo" },
  duracion: 12,
  cargo: {
    tipo: "RH",
    nombre: "Analista de RRHH",
    area: { tipo: "ADM", nombre: "Administración" }
  },
  salarioBase: 1400000,
  activo: true
};





//INSERCION DE DATOS PARA LA COLECCION DE CONCEPTOS
const concepto1 = {
  _id: ObjectId('6864640fa6f8e6538e1bb245'),
  codigo: "AUX",
  nombre: "Auxilio de transporte",
  tipo: "DEV",
  porcentaje: 0,
  activo: true
}
const concepto2 = {
  _id: ObjectId("6864a3dd37c3ea6b7a29b43a"),
  codigo: "SAL",
  nombre: "Salario",
  tipo: "DEV",
  porcentaje: 0,
  activo: true
};
const concepto3 = {
  _id: ObjectId("6864a3e20e9c727ba2c43e4c"),
  codigo: "FAL",
  nombre: "Faltas",
  tipo: "DED",
  porcentaje: 0,
  activo: true
};



// INSERCION DE DATOS PARA LA COLECCION DE NOVEDADES

const novedad1 = {
  _id: ObjectId('68646613a6f8e6538e1bb246'),
  nomina_codigo: "NOMINA-2025-01",
  contrato_id: contrato1._id,
  tipo: {
    nombre: "FALTA",
  },
  fecha_inicial: ISODate("2025-01-01"),
  fecha_final: ISODate("2025-01-04"),
  observacion: "Inasistencia por enfermedad"
};

const novedad2 = {
  _id: ObjectId("6864a4e3415310c507734a80"),
  nomina_codigo: "NOMINA-2025-01",
  contrato_id: contrato3._id,
  tipo: { nombre: "FALTA" },
  fecha_inicial: ISODate("2025-01-15"),
  fecha_final: ISODate("2025-01-15"),
  observacion: "Ausencia injustificada"
};

const novedad3 = {
  _id: ObjectId("6864a4e9d1258d15d4fd58f6"),
  nomina_codigo: "NOMINA-2025-02",
  contrato_id: contrato4._id,
  tipo: { nombre: "VACACIONES" },
  fecha_inicial: ISODate("2025-02-01"),
  fecha_final: ISODate("2025-02-10"),
  observacion: "Vacaciones programadas"
};




// INSERCION DE DATOS PARA LA COLECCION DE NOMINAS

// NÓMINA ENERO


const nominaEnero = {
  _id: ObjectId("6864a72679d5cc42f4e6009a"),
  codigo: "NOMINA-2025-01",
  fechaInicial: ISODate("2025-01-01"),
  fechaFinal: ISODate("2025-01-31"),
  contratos: [
    {
      contratoId: ObjectId("68645cefa6f8e6538e1bb241"),
      devengos: [
        { nombre: "Salario", valor: 1500000 },
        { nombre: "Auxilio de Transporte", valor: 14606 }
      ],
      deducciones: [
        { nombre: "Faltas", valor: 100000 }
      ]
    },
    {
      contratoId: ObjectId("68649f3270c0efe24e0b7923"),
      devengos: [
        { nombre: "Salario", valor: 1800000 },
        { nombre: "Auxilio de Transporte", valor: 14606 }
      ],
      deducciones: [
        { nombre: "Faltas", valor: 80000 }
      ]
    }
  ]
};


// NÓMINA FEBRERO
const nominaFebrero = {
  _id: ObjectId("6864a73173e80b7468b25d69"),
  codigo: "NOMINA-2025-02",
  fechaInicial: ISODate("2025-02-01"),
  fechaFinal: ISODate("2025-02-28"),
  contratos: [
    {
      contratoId: ObjectId('68649aa63a296db5894b0d03'),
      devengos: [
        { nombre: "Salario", valor: 1200000 },
        { nombre: "Auxilio de Transporte", valor: 14606 }
      ],
      deducciones: [
        { nombre: "Salud", valor: 48000 }
      ]
    },
    {
      contratoId: ObjectId('68649f58447b210b640da057'),
      devengos: [
        { nombre: "Salario", valor: 1400000 }
      ],
      deducciones: [
        { nombre: "Faltas", valor: 60000 }
      ]
    }
  ]
};
db.nominas.insertMany([nominaEnero, nominaFebrero]);



db.empleados.insertMany([empleado1, empleado2, empleado3, empleado4]);
db.contratos.insertMany([contrato1, contrato2, contrato3, contrato4]);
db.conceptos.insertMany([concepto1, concepto2, concepto3]);
db.novedades.insertMany([novedad1, novedad2, novedad3]);
