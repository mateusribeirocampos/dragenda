import repoDoctorAdmin from "../repositories/repository.doctor.admin.js";

async function Listar(name) {

  const doctors = await repoDoctorAdmin.Listar(name);

  return doctors;
}

async function InserirDoctor(name, specialty, icon, crm, telefone, ativo) {

  const doctor = await repoDoctorAdmin.InserirDoctor(name, specialty, icon, crm, telefone, ativo);

  return doctor;
}

export default { Listar, InserirDoctor };