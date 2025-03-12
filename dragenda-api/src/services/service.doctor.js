import repoDoctor from "../repositories/repository.doctor.js";

async function Listar(name) {

  const doctors = await repoDoctor.Listar(name);

  return doctors;
}

async function Inserir(name, specialty, icon, crm, phone, active) {

  const doctor = await repoDoctor.Inserir(name, specialty, icon, crm, phone, active);

  return doctor;
}

async function Editar(id_doctor, name, specialty, icon, crm, phone, active) {
  
    const doctor = await repoDoctor.Editar(id_doctor, name, specialty, icon, crm, phone, active);
  
    return doctor;
}

async function Excluir(id_doctor) {
  
  const doctor = await repoDoctor.Excluir(id_doctor);

  return doctor;
}

async function ListarServicos(id_doctor) {

  const servDoc = await repoDoctor.ListarServicos(id_doctor);

  return servDoc;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
