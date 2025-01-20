import { query } from "../database/sqlite.js";

async function Listar(id_user, startDate, endDate, id_doctor) {

  let filtro = [];

  let sql = `select a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name AS user, ds.price
from appointments a
join services s on (s.id_service = a.id_service)
join doctors d on (d.id_doctor = a.id_doctor)
join users u on (u.id_user = a.id_user)
join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
where a.id_appointment > 0`;

  if(id_user) {
    filtro.push(id_user);
    sql += " and a.id_user = ? "
  }
  if(startDate) {
    filtro.push(startDate);
    sql += " and a.booking_date >= ? "
  }
  if(endDate) {
    filtro.push(endDate);
    sql += " and a.booking_date <= ? "
  }
  if(id_doctor) {
    filtro.push(id_doctor);
    sql += " and a.id_doctor = ? "
  }

  sql += " order by a.booking_date, a.booking_hour";

  const appointments = await query(sql, filtro);

  return appointments;
}

export default { Listar };