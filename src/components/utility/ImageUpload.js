import React from 'react';

const ImageUpload = ({ handleChange, base64, handleClick }) => {

  let fileInput = null;

  const fileReader = new FileReader();
  fileReader.onload = () => {
    handleChange(fileReader.result);
  };

  const handleImage = (e) => {
    e.preventDefault();
    const file = (e.target.files || e.dataTransfer.files)[0];
    fileReader.readAsDataURL(file);
  };

  const style = base64 ? { backgroundImage: `url(${base64})`, height: '200px', width: '200px' } : { height: '200px', width: '200px' };

  return (
    <div className="drag-drop">
      <input
        type="file"
        accept="image/*"
        ref={element => fileInput = element}
        onChange={handleImage}
      />
      <div
        className="dropzone"
        style={style}
        onDragOver={e => e.preventDefault()}
        onDrop={handleImage}
        onClick={() => fileInput.click()}
      ></div>
      <button disabled={!base64} onClick={handleClick}>Send Image</button>
    </div>
  );
};

export default ImageUpload;
