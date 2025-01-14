import serviceAppointmentAdmin from '../services/service.appoitment.admin.js';

async function Listar(req, res) {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const id_doctor = req.query.id_doctor;
  const appointments = await serviceAppointmentAdmin.Listar(0, startDate, endDate, id_doctor);

  res.status(200).json(appointments);
}

export default { Listar };