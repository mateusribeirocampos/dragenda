import repoDoctorAdmin from "../repositories/repository.doctor.admin.js";

async function List(name) {

  const doctors = await repoDoctorAdmin.List(name);

  return doctors;
}

async function InsertDoctor(name, specialty, icon, crm, phone, active) {

  const doctor = await repoDoctorAdmin.InsertDoctor(name, specialty, icon, crm, phone, active);

  return doctor;
}

export default { List, InsertDoctor };