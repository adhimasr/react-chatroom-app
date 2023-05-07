import PropTypes from 'prop-types';

const UtilsInput = ({ value, placeholder, ...props }) => {
  return (
    <input type="text" value={value} placeholder={placeholder} {...props} className="w-full bg-slate-600 text-sm text-white block border-2 border-slate-700 border-solid focus:outline-none rounded-xl p-4" />
  );
};

UtilsInput.propTypes = { value: PropTypes.string.isRequired, placeholder: PropTypes.string };

export default UtilsInput;