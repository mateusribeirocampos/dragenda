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

  const {name, specialty, icon, crm, telefone, ativo} = req.body;

  const doctor = await serviceDoctor.Inserir(name, specialty, icon, crm, telefone, ativo);

  res.status(201).json(doctor);
}

async function Editar(req, res) {

  const id_doctor = req.params.id_doctors;
  
  const {name, specialty, icon, crm, telefone, ativo} = req.body;

  const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon, crm, telefone, ativo);

  res.status(200).json(doctor);
}

async function Excluir(req, res) {

  const id_doctor = req.params.id_doctors;

  const doctor = await serviceDoctor.Excluir(id_doctor);

  res.status(200).json(doctor);
}

async function ListarServicos(req, res) {

  const id_doctor = req.params.id_doctors;
  const servDoc = await serviceDoctor.ListarServicos(id_doctor);

  res.status(200).json(servDoc);
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };