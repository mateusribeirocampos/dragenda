import serviceAppointmentAdmin from '../services/service.appoitment.admin.js';

async function Listar(req, res) {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const id_doctor = req.query.id_doctor;
  const appointments = await serviceAppointmentAdmin.Listar(0, startDate, endDate, id_doctor);

  res.status(200).json(appointments);
}

async function ListarId(req, res) {

  const id_appointment = req.params.id_appointment;
  const appointments = await serviceAppointmentAdmin.ListarId(id_appointment);

  res.status(200).json(appointments);

}

async function InserirAdmin(req, res) {

  const {id_user, id_doctor, id_service, booking_date, booking_hour} = req.body;

  const appointment = await serviceAppointmentAdmin.InserirAdmin(id_user, id_doctor, id_service, booking_date, booking_hour);

  res.status(201).json(appointment);
}

async function EditarAdmin(req, res) {

  const id_appointment = req.params.id_appointment;
  const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;

  const appointment = await serviceAppointmentAdmin.EditarAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour);

  res.status(200).json(appointment);

}
export default { Listar, ListarId, InserirAdmin, EditarAdmin };