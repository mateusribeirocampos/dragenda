import repoAppointmentAdmin from '../repositories/repository.appointment.admin.js';

async function Listar(id_user, startDate, endDate, id_doctor) {
  const appointments = await repoAppointmentAdmin.Listar(id_user, startDate, endDate, id_doctor);

  return appointments;
}

export default { Listar };