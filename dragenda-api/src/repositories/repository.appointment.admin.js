import { query } from "../database/sqlite.js";

async function Listar(id_user, startDate, endDate, id_doctor) {

  let filtro = [];

  let sql = `select a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name AS user, ds.price, a.id_doctor, a.id_service, a.id_user
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

async function ListarId(id_appointment) {

  let filtro = [id_appointment];

  let sql = `select a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name AS user, ds.price, a.id_doctor, 
  a.id_service, a.id_user
from appointments a
join services s on (s.id_service = a.id_service)
join doctors d on (d.id_doctor = a.id_doctor)
join users u on (u.id_user = a.id_user)
join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
where a.id_appointment = ? `;

  const appointments = await query(sql, filtro);

  return appointments[0];
}

async function InserirAdmin(id_user, id_doctor, id_service, booking_date, booking_hour) {
  let sql = `insert into appointments (id_user, id_doctor, id_service, booking_date, booking_hour) values(?, ?, ?, ?, ?)
  returning id_appointment`;

  const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

  return appointment[0];
}

async function EditarAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {
  let sql = `update appointments set id_user=?, id_doctor=?, id_service=?, booking_date=?, booking_hour=? where id_appointment=?`;

  const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour, id_appointment]);

  return { id_appointment };
}

export default { Listar, ListarId, InserirAdmin, EditarAdmin };