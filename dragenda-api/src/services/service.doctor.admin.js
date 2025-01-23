import repoDoctorAdmin from "../repositories/repository.doctor.admin.js";

async function Listar(name) {

  const doctors = await repoDoctorAdmin.Listar(name);

  return doctors;
}

export default { Listar };