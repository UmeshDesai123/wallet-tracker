import React from 'react';
import './styles.css'

function CustomInput({label, type, placeholder, value, setState}) {
  return (
    <div className='custom-input'>
      <p>{label}</p>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e)=> setState(e.target.value)}
      />
    </div>
  )
}

export default CustomInput;