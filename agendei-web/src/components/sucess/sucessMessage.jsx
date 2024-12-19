import PropTypes from 'prop-types';
import "./sucessMessage.css";

function SucessMessage({ message }) {
  if(!message) return null;

  return(
    <div className="alert alert-sucess" role="alert">
    {message}
  </div>

  );
}

SucessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SucessMessage;