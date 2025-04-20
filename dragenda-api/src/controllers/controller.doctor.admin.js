import serviceDoctorAdmin from "../services/service.doctor.admin.js";

async function List(req, res) {

  const name = req.query.name;
  const doctors = await serviceDoctorAdmin.List(name);

  res.status(200).json(doctors);
}

async function InsertDoctor(req, res) {

  const {name, specialty, icon, crm, phone, active} = req.body;

  const doctor = await serviceDoctorAdmin.InsertDoctor(name, specialty, icon, crm, phone, active);

  res.status(201).json(doctor);
}

async function ListId(req, res) {

  const id_doctor = req.params.id_doctor;
  const doctor = await serviceDoctorAdmin.ListId(id_doctor);

  res.status(200).json(doctor);

}

async function EditDoctor(req, res) {

  const id_doctor = req.params.id_doctor;
  console.log("ID doctor: ", id_doctor);
  const {name, specialty, icon, crm, phone, active} = req.body;

  try {
    const doctor = await serviceDoctorAdmin.EditDoctor(id_doctor, name, specialty, icon, crm, phone, active);
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Erro ao editar o médico: ", error);
    res.status(500).json({ error: "Um erro ocorreu na edicção do médico." });
  }
}

async function DeleteDoctor(req, res) {

  const id_doctor = req.params.id_doctor;
  console.log("ID doctor: ", id_doctor);
  try {
    const doctor = await serviceDoctorAdmin.DeleteDoctor(id_doctor);
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Erro ao excluir o médico: ", error);
    res.status(500).json({ error: "Um erro ocorreu na exclusão do médico." });
  }
}

export default { List, InsertDoctor, ListId, EditDoctor, DeleteDoctor };