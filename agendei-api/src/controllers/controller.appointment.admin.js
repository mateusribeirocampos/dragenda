import serviceAppointmentAdmin from '../services/service.appoitment.admin.js';

async function Listar(req, res) {
  const dt_start = req.query.dt_start;
  const dt_end = req.query.dt_end;
  const id_doctor = req.query.id_doctor;
  const appointments = await serviceAppointmentAdmin.Listar(0, dt_start, dt_end, id_doctor);

  res.status(200).json(appointments);
}

export default { Listar };