import PropTypes from 'prop-types';

function Doctor(props) {
  return (
    <tr>
      <td>{props.doctor}</td>
      <td>{props.specialty}</td>
      <td>{props.crm}</td>
      <td>{props.telefone}</td>
      <td>{props.ativo}</td>
    </tr>
  )
}

Doctor.propTypes = {
  doctor: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  crm: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  ativo: PropTypes.bool.isRequired
}

export default Doctor;