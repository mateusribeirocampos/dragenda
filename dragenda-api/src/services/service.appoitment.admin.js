import repoAppointmentAdmin from '../repositories/repository.appointment.admin.js';

async function Listar(id_user, startDate, endDate, id_doctor) {
  const appointments = await repoAppointmentAdmin.Listar(id_user, startDate, endDate, id_doctor);

  return appointments;
}

async function ListarId(id_appointment) {

  const appointments = await repoAppointmentAdmin.ListarId(id_appointment);

  return appointments;
}

async function InserirAdmin(id_user, id_doctor, id_service, booking_date, booking_hour) {

  const appointment = await repoAppointmentAdmin.InserirAdmin(id_user, id_doctor, id_service, booking_date, booking_hour);

  return appointment;
}

async function EditarAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {

  const appointment = await repoAppointmentAdmin.EditarAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour);

  return appointment;
}

async function ExcluirAdmin(id_appointment) {

  const appointment = await repoAppointmentAdmin.ExcluirAdmin(id_appointment);

  return appointment;
}

export default { Listar, ListarId, InserirAdmin, EditarAdmin, ExcluirAdmin };