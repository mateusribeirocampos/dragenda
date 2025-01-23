import serviceDoctorAdmin from "../services/service.doctor.admin.js";

async function Listar(req, res) {

  const name = req.query.name;
  const doctors = await serviceDoctorAdmin.Listar(name);

  res.status(200).json(doctors);
}

export default { Listar };