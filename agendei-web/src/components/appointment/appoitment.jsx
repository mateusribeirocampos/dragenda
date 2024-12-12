import PropTypes from 'prop-types';

function Appointment(props) {

  const dt = new Date(props.booking_date);

  return (
    <tr>
      <td scope="col">{props.user}</td>
      <td scope="col">{props.doctor}</td>
      <td scope="col">{props.service}</td>
      <td scope="col">{new Intl.DateTimeFormat('pt-BR', {dataStyle: 'short'}).format(dt)}</td>
      <td scope="col" className="text-end">
        { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}
      </td>
      <td scope="col">
        <div>
          <button className='btn btn-sm btn-primary'>Editar
          </button>
        </div>
        <div>
          <button className='btn btn-sm btn-danger'>Excluir

          </button>
        </div>
      </td>
    </tr>
  );
}

Appointment.propTypes = {
  user: PropTypes.string.isRequired,
  doctor: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  booking_date: PropTypes.instanceOf(Date).isRequired,
  price: PropTypes.number.isRequired,
  
}

export default Appointment;
