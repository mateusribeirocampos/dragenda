import PropTypes from "prop-types";

function Appointment(props) {
  // const dt = new Date(props.booking_date);
  // 2024-11-15T08:30:00
  const dt = new Date(props.booking_date + "T" + props.booking_hour + ":00");

  const formattedDate = !isNaN(dt) ? new Intl.DateTimeFormat("pt-BR", { dataStyle: "short" }).format(dt)
 : "Invalid Date";
  return (
    <tr>
      <td>{props.user}</td>
      <td>{props.doctor}</td>
      <td>{props.service}</td>
      <td>
        {formattedDate} - {props.booking_hour}h</td>
      <td className="text-end">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(props.price)}
      </td>
      <td className="text-end">
        <div className="d-inline me-3">
          <button
            onClick={() => props.clickEdit(props.id_appointment)}
            className="btn btn-sm btn-primary"
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
        <button
          onClick={() => props.clickDelete(props.id_appointment)}
          className="btn btn-sm btn-danger"
        >
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
}

Appointment.propTypes = {
  user: PropTypes.string.isRequired,
  doctor: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  booking_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  booking_hour: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id_appointment: PropTypes.number.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
};

export default Appointment;
