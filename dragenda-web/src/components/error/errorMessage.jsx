import PropTypes from 'prop-types';
import "./errorMessage.css";

function ErrorMessage({ message }) {
  if(!message) return null;

  return(
    <div className="alert alert-danger" role="alert">
    {message}
  </div>

  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;