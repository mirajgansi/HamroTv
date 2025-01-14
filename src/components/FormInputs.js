import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ id, name, type, placeholder, value, onChange, icon }) => {
  return (
    <div className="input-group">
      <img src={icon} alt={`${name} Icon`} className="input-icon" />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
      />
      <label>{placeholder}</label>
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default FormInput;
