import React from "react";
import { useState } from 'react';
import Select from 'react-select';

import "./Edit.css";

function Subj() {
    const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
    { value: 'item4', label: 'Item 4' },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="column">
      <Select
        isMulti
        classNamePrefix='custom_select'
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange} />
    </div>
  );
}

export default Subj;