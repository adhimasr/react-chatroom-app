import PropTypes from 'prop-types';

const UtilsButton = ({ text, loading, action }) => {
  return (
    <button className={`bg-white block rounded-xl  px-4 py-2 ${loading ? 'cursor-wait' : ''}`} disabled={loading} onClick={action}>
      <span className="text-sm text-black font-bold">{text}</span>
    </button>
  );
};

UtilsButton.propTypes = { text: PropTypes.string.isRequired, loading: PropTypes.bool, action: PropTypes.func };

export default UtilsButton;