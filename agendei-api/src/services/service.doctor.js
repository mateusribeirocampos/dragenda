import repoDoctor from "../repositories/repository.doctor.js";


async function Listar(name) {

  const doctors = await repoDoctor.Listar(name);

  return doctors;
}

async function Inserir(name, specialty, icon) {

  const doctor = await repoDoctor.Inserir(name, specialty, icon);

  return doctor;
}

async function Editar(id_doctors, name, specialty, icon) {
  
    const doctor = await repoDoctor.Editar(id_doctors, name, specialty, icon);
  
    return doctor;
}

async function Excluir(id_doctors) {
  
  const doctor = await repoDoctor.Excluir(id_doctors);

  return doctor;
}

export default { Listar, Inserir, Editar, Excluir };
