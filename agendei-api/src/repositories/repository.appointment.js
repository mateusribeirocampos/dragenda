import { query } from "../database/sqlite.js";

async function ListarByUser(id_user) {
  let sql = `select a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name AS user, ds.price
from appointments a
join services s on (s.id_service = a.id_service)
join doctors d on (d.id_doctor = a.id_doctor)
join users u on (u.id_user = a.id_user)
join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
where a.id_user = ?
order by a.booking_date, a.booking_hour`;

  const appointments = await query(sql, [id_user]);

  return appointments;
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
  let sql = `insert into appointments (id_user, id_doctor, id_service, booking_date, booking_hour) values(?, ?, ?, ?, ?)
  returning id_appointment`;

  const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

  return appointment[0];
}

export default { ListarByUser, Inserir };
