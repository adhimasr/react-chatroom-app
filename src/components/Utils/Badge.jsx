import PropTypes from 'prop-types';

const UtilsBadge = ({ children, visible, ...props }) => {
  return (
    <div className="relative inline-block">
      {children}
      {visible && (
        <span className="absolute top-[-2px] right-[-2px] bg-red-500 text-white rounded-full p-[4px]" {...props} />
      )}
    </div>
  );
};

UtilsBadge.propTypes = { children: PropTypes.node.isRequired, visible: PropTypes.string };

export default UtilsBadge;