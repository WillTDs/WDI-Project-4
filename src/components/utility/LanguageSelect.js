import React from 'react';

const LanguageSelect = ({ handleClick, code, image }) => {
  return(
    <label className="language" htmlFor={code}>
      <input onClick={handleClick} name="flag" type="radio" value={code} id={code}/>
      <img className="flag" src={`assets/${image}.png`} />
    </label>
  );
};

export default LanguageSelect;
