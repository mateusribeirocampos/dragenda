import repoDoctorAdmin from "../repositories/repository.doctor.admin.js";

async function List(name) {

  const doctors = await repoDoctorAdmin.List(name);

  return doctors;
}

async function InsertDoctor(name, specialty, icon, crm, phone, active) {

  const doctor = await repoDoctorAdmin.InsertDoctor(name, specialty, icon, crm, phone, active);

  return doctor;
}

async function ListId(id_doctor) {

  const doctor = await repoDoctorAdmin.ListId(id_doctor);

  return doctor;
}

async function EditDoctor(id_doctor, name, specialty, icon, crm, phone, active) {
  
    const doctor = await repoDoctorAdmin.EditDoctor(id_doctor, name, specialty, icon, crm, phone, active);
  
    return doctor;
}

async function DeleteDoctor(id_doctor) {
  
  const doctor = await repoDoctorAdmin.DeleteDoctor(id_doctor);

  return doctor;
}

export default { List, InsertDoctor, ListId, EditDoctor, DeleteDoctor };