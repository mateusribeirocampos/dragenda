import { query, DB_TYPE } from "../database/sqlite.js";

async function ListarByUser(id_user) {
  let sql = `SELECT a.id_appointment, s.description AS service, d.name AS doctor, d.specialty, a.booking_date, a.booking_hour, u.name AS user, ds.price
FROM appointments a
JOIN services s ON (s.id_service = a.id_service)
JOIN doctors d ON (d.id_doctor = a.id_doctor)
JOIN users u ON (u.id_user = a.id_user)
JOIN doctors_services ds ON (ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service)
WHERE a.id_user = ?
ORDER BY a.booking_date, a.booking_hour`;

  const appointments = await query(sql, [id_user]);

  return appointments;
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
  // Query compatível com PostgreSQL e SQLite
  let sql;
  
  if (DB_TYPE === 'postgres') {
    sql = `INSERT INTO appointments (id_user, id_doctor, id_service, booking_date, booking_hour) 
           VALUES($1, $2, $3, $4, $5) RETURNING id_appointment`;
  } else {
    sql = `INSERT INTO appointments (id_user, id_doctor, id_service, booking_date, booking_hour) 
           VALUES(?, ?, ?, ?, ?)`;
  }

  const result = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);
  
  if (DB_TYPE === 'postgres') {
    return result[0];
  } else {
    // Para SQLite, buscar o ID do agendamento recém-inserido
    const appointmentId = await query(
      `SELECT last_insert_rowid() as id_appointment`,
      [],
      "get"
    );
    return appointmentId;
  }
}

async function Excluir(id_user, id_appointment) {
  let sql = `DELETE FROM appointments 
  WHERE id_appointment = ? AND id_user = ?`;

  await query(sql, [id_appointment, id_user]);

  return { id_appointment };
}

export default { ListarByUser, Inserir, Excluir };
