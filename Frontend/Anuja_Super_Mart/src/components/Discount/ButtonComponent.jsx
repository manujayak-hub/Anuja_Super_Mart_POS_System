// ButtonComponent.jsx

import React from 'react';

const ButtonComponent = () => {
  const handleButtonClick = (buttonId) => {
    // Define what each button should do when clicked
    switch (buttonId) {
      case 1:
        alert('Button 1 clicked!');
        break;
      case 2:
        alert('Button 2 clicked!');
        break;
      case 3:
        alert('Button 3 clicked!');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(1)}>Button 1</button>
      <button onClick={() => handleButtonClick(2)}>Button 2</button>
      <button onClick={() => handleButtonClick(3)}>Button 3</button>
    </div>
  );
}

export default ButtonComponent;
