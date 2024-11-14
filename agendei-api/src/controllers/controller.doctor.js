import serviceDoctor from "../services/service.doctor.js";

async function Listar(req, res) {

  const doctors = await serviceDoctor.Listar();

  res.status(200).json(doctors);
}




export default { Listar };