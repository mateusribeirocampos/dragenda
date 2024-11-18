import repoDoctor from "../repositories/repository.doctor.js";


async function Listar() {

  const doctors = await repoDoctor.Listar();

  return doctors;
}

export default { Listar };
