
// Listado de los empleados por área y cargo de los empleados con contrato vigente. Debe mostrarse tanto código y nombre del área y del cargo, como tipo y número de identificación, nombres, apellidos, teléfono, email y genero del empleado.

db.contratos.aggregate([
  {
    $match: { activo: true }
  },
  {
    $lookup: {
      from: "empleados",
      localField: "empleadoId",
      foreignField: "_id",
      as: "empleado"
    }
  },
  {
    $unwind: "$empleado"
  },
  {
    $project: {
      _id: 0,
      "area_codigo": "$cargo.area.tipo",
      "area_nombre": "$cargo.area.nombre",
      "cargo_tipo": "$cargo.tipo",
      "cargo_nombre": "$cargo.nombre",
      "tipo_identificacion": "$empleado.tipoDeId.tipo",
      "numero_identificacion": "$empleado.numeroId",
      "nombres": "$empleado.nombres",
      "apellidos": "$empleado.apellidos",
      "telefono": "$empleado.telefono",
      "email": "$empleado.email",
      "genero": "$empleado.genero"
    }
  }
]);


// Dado el código de la nómina, mostrar: Tipo y número de identificación, nombres, apellidos, salario base, total deducciones, total devengos, neto a pagar.

db.nominas.aggregate([
  {
    $match: { codigo: "NOMINA-2025-02" } 
  },
  { $unwind: "$contratos" },
  {
    $lookup: {
      from: "contratos",
      localField: "contratos.contratoId",
      foreignField: "_id",
      as: "contratoInfo"
    }
  },
  { $unwind: "$contratoInfo" },
  {
    $lookup: {
      from: "empleados",
      localField: "contratoInfo.empleadoId",
      foreignField: "_id",
      as: "empleado"
    }
  },
  { $unwind: "$empleado" },
  {
    $project: {
      _id: 0,
      tipoDeId: "$empleado.tipoDeId.tipo",
      numeroId: "$empleado.numeroId",
      nombres: "$empleado.nombres",
      apellidos: "$empleado.apellidos",
      salarioBase: "$contratoInfo.salarioBase",
      totalDevengos: {
        $sum: "$contratos.devengos.valor"
      },
      totalDeducciones: {
        $sum: "$contratos.deducciones.valor"
      },
      netoAPagar: {
        $subtract: [
          { $sum: "$contratos.devengos.valor" },
          { $sum: "$contratos.deducciones.valor" }
        ]
      }
    }
  }
]);


// Dado el id de un empleado y el id de una nómina, devolver detalladamente: Tipo y número de identificación, nombres, apellidos, salario base, deducciones (código, nombre, valor), devengos (código, nombre, valor).


db.nominas.aggregate([
  {
    $match: { codigo: "NOMINA-2025-02" }
  },
  { $unwind: "$contratos" },
  {
    $match: {
      "contratos.contratoId": ObjectId("68649aa63a296db5894b0d03") // contrato2._id
    }
  },
  {
    $lookup: {
      from: "contratos",
      localField: "contratos.contratoId",
      foreignField: "_id",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },
  {
    $lookup: {
      from: "empleados",
      localField: "contrato.empleadoId",
      foreignField: "_id",
      as: "empleado"
    }
  },
  { $unwind: "$empleado" },
  {
    $project: {
      tipoDeId: "$empleado.tipoDeId.tipo",
      numeroId: "$empleado.numeroId",
      nombres: "$empleado.nombres",
      apellidos: "$empleado.apellidos",
      salarioBase: "$contrato.salarioBase",
      devengos: "$contratos.devengos",
      deducciones: "$contratos.deducciones"
    }
  }
]);


// Muestre el número de empleados por ciudad.

db.empleados.aggregate([
  {
    $group: {
      _id: "$ciudad.nombre",
      totalEmpleados: { $sum: 1 }
    }
  },
  {
    $sort: { totalEmpleados: -1 }
  }
]);

//Listado de los empleados por área y cargo de los empleados con contrato vigente que tienen derecho a auxilio de transporte. Debe mostrarse tanto código y nombre del área y del cargo, como tipo y número de identificación, nombres, apellidos y salario base del empleado.

db.empleados.aggregate([
  {
    $lookup: {
      from: "contratos",
      localField: "_id",
      foreignField: "empleadoId",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },
  {
    $match: {
      "contrato.activo": true,
      "contrato.salarioBase": { $lte: 2600000 }
    }
  },
  {
    $project: {
      _id: 0,
      tipoId: "$tipoDeId.tipo",
      numeroId: "$numeroId",
      nombres: "$nombres",
      apellidos: "$apellidos",
      salarioBase: "$contrato.salarioBase",
      cargo: {
        codigo: "$contrato.cargo.tipo",
        nombre: "$contrato.cargo.nombre"
      },
      area: {
        codigo: "$contrato.cargo.area.tipo",
        nombre: "$contrato.cargo.area.nombre"
      }
    }
  },
  {
    $sort: {
      "area.nombre": 1,
      "cargo.nombre": 1
    }
  }
]);


//Mostrar el promedio de sueldos de Hombres y de Mujeres.

db.empleados.aggregate([
  {
    $lookup: {
      from: "contratos",
      localField: "_id",
      foreignField: "empleadoId",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },
  {
    $match: {
      "contrato.activo": true
    }
  },
  {
    $group: {
      _id: "$genero",
      promedioSalario: { $avg: "$contrato.salarioBase" }
    }
  },
  {
    $project: {
      _id: 0,
      genero: "$_id",
      promedioSalario: { $round: ["$promedioSalario", 0] }
    }
  }
]);

// Muestre los empleados que faltaron a su trabajo entre un rango de fechas (fecha inicial y final). Debe mostrar código y nombre del área y del cargo; tipo y número de identificación, nombres, apellidos, número de faltas. Para esto debe existir un tipo de novedad para dicho suceso.

const fechaInicio = ISODate("2025-01-01");
const fechaFin = ISODate("2025-02-28");

db.novedades.aggregate([
  {
    $match: {
      "tipo.nombre": "FALTA",
      fecha_inicial: { $gte: fechaInicio },
      fecha_final: { $lte: fechaFin }
    }
  },
  {
    $lookup: {
      from: "contratos",
      localField: "contrato_id",
      foreignField: "_id",
      as: "contrato"
    }
  },
  { $unwind: "$contrato" },
  {
    $lookup: {
      from: "empleados",
      localField: "contrato.empleadoId",
      foreignField: "_id",
      as: "empleado"
    }
  },
  { $unwind: "$empleado" },
  {
    $group: {
      _id: "$contrato._id",
      tipoId: { $first: "$empleado.tipoDeId.tipo" },
      numeroId: { $first: "$empleado.numeroId" },
      nombres: { $first: "$empleado.nombres" },
      apellidos: { $first: "$empleado.apellidos" },
      areaCodigo: { $first: "$contrato.cargo.area.tipo" },
      areaNombre: { $first: "$contrato.cargo.area.nombre" },
      cargoCodigo: { $first: "$contrato.cargo.tipo" },
      cargoNombre: { $first: "$contrato.cargo.nombre" },
      totalFaltas: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      tipoId: 1,
      numeroId: 1,
      nombres: 1,
      apellidos: 1,
      area: {
        codigo: "$areaCodigo",
        nombre: "$areaNombre"
      },
      cargo: {
        codigo: "$cargoCodigo",
        nombre: "$cargoNombre"
      },
      totalFaltas: 1
    }
  }
]);


// Mostrar la cantidad de empleados agrupados por tipo de contrato. El tipo de contrato debe estar activo.


db.contratos.aggregate([
  {
    $match: {
      activo: true
    }
  },
  {
    $group: {
      _id: "$tipoDeContrato.nombre",
      cantidadEmpleados: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      tipoDeContrato: "$_id",
      cantidadEmpleados: 1
    }
  }
]);
