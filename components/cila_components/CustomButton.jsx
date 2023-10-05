import React from 'react'

const CustomButton = (props) => {

  const {showButton,disabled} = props;

  // showButton koşulunu kontrol ederek butonu göster veya gizle
  if (!showButton) {
    return null;
  }
  
    return (
      <button  disabled={disabled} onChange={props.onChange}  onClick={props.onClick} type={props.type ? props.type : "button"} className={`w-[200px] h-12 bg-blue-600 hover:bg-blue-300 rounded-[5px] font-semibold shadow-md ${props.addProps}`}>
        {props.title}
      </button>
    );
  };

export default CustomButton
