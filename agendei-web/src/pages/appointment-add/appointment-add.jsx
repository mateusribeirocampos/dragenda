import Navbar from "../../components/navbar/navbar.jsx";
import { doctors } from "../../constants/data.js";

function AppointmentAdd() {
  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4">
          <div className="col-12">
            <h2>Novo Agendamento</h2>
          </div>

          <div className="col-12">
            <label htmlFor="doctor" className="form-label">
              Médicos
            </label>
            <div className="form-control mb-2">
              <select name="doctors" id="doctors">
                <option value="0">Selecione o médico</option>
                {doctors.map((d) => {
                  return (
                    <option key={d.id_doctor} value={d.id_doctor}>
                      {d.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentAdd;
