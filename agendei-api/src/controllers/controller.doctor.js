import serviceDoctor from "../services/service.doctor.js";

async function Listar(req, res) {

  const name = req.query.name;
  const doctors = await serviceDoctor.Listar(name);

  res.status(200).json(doctors);
}

async function Inserir(req, res) {

  /*const name = req.body.name;
  const specialty = req.body.specialty;
  const icon = req.body.icon;
  */

  const {name, specialty, icon} = req.body;

  const doctor = await serviceDoctor.Inserir(name, specialty, icon);

  res.status(201).json(doctor);
}

async function Editar(req, res) {

  const id_doctors = req.params.id_doctors;
  
  const {name, specialty, icon} = req.body;

  const doctor = await serviceDoctor.Editar(id_doctors, name, specialty, icon);

  res.status(200).json(doctor);
}

async function Excluir(req, res) {

  const id_doctors = req.params.id_doctors;

  const doctor = await serviceDoctor.Excluir(id_doctors);

  res.status(200).json(doctor);
}

export default { Listar, Inserir, Editar, Excluir };