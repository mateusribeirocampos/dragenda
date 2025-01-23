import PropTypes from 'prop-types';

function Doctor(props) {
  return (
    <tr>
      <td>{props.doctor}</td>
      <td>{props.specialty}</td>
      <td>{props.crm}</td>
      <td>{props.telefone}</td>
      <td>{props.ativo}</td>
      <td className='text-end'>
        <div className='d-inline me-3'>
          <button onClick={() => props.clickEdit(props.id_doctor)}
          className='btn btn-sm btn-primary'><i 
          className='bi bi-pencil-square'
          ></i>
          </button>
        </div>
        <button onClick={() => props.clickDelete(props.id_doctor)}
          className='btn btn-sm btn-danger'><i 
          className='bi bi-trash3'
          ></i>
          </button>
      </td>
    </tr>
  )
}

Doctor.propTypes = {
  doctor: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  crm: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  ativo: PropTypes.bool.isRequired,
  id_doctor: PropTypes.number.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired

}

export default Doctor;