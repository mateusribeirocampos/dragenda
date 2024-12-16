import PropTypes from 'prop-types';

function Appointment(props) {

  const dt = new Date(props.booking_date);

  return (
    <tr>
      <td>{props.user}</td>
      <td>{props.doctor}</td>
      <td>{props.service}</td>
      <td>{new Intl.DateTimeFormat('pt-BR', {dataStyle: 'short'}).format(dt)}</td>
      <td className="text-end">
        { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}
      </td>
      <td className='text-end'>
        <div className='d-inline me-3'>
          <button onClick={() => props.clickEdit(props.id_appointment)}
          className='btn btn-sm btn-primary'>
          <i className="bi bi-pencil-square"></i>
          </button>
        </div>
          <button onClick={() => props.clickDelete(props.id_appointment)}
          className='btn btn-sm btn-danger'>
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
  booking_date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  price: PropTypes.number.isRequired,
  id_appointment: PropTypes.number.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired
}

export default Appointment;
