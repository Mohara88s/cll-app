import React from 'react';
import { Dropdown } from 'react-bootstrap';

const LanguageDropdown = ({ options, value, onChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {value}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Item key={option} onClick={() => onChange(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;