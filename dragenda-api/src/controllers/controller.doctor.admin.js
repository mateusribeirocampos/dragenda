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

export default { List, InsertDoctor, ListId };