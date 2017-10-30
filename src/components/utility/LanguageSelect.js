import React from 'react';

const LanguageSelect = ({ handleClick, code, image }) => {
  return(
    <label className="language">
      <input onClick={handleClick} name="flag" type="radio" value={code} />
      <img className="flag" src={`assets/${image}.png`} />
    </label>
  );
};

export default LanguageSelect;
