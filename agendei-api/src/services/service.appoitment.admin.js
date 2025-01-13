import repoAppointmentAdmin from '../repositories/repository.appointment.admin.js';

async function Listar(id_user, dt_start, dt_end, id_doctor) {
  const appointments = await repoAppointmentAdmin.Listar(id_user, dt_start, dt_end, id_doctor);

  return appointments;
}

export default { Listar };