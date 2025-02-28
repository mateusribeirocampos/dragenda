import serviceDoctorAdmin from "../services/service.doctor.admin.js";

async function Listar(req, res) {

  const name = req.query.name;
  const doctors = await serviceDoctorAdmin.Listar(name);

  res.status(200).json(doctors);
}

async function InserirDoctor(req, res) {

  const {name, specialty, icon, crm, telefone, ativo} = req.body;

  const doctor = await serviceDoctorAdmin.InserirDoctor(name, specialty, icon, crm, telefone, ativo);

  res.status(201).json(doctor);
}

export default { Listar, InserirDoctor };