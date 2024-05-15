import { useState } from "react";
import Switch from "react-switch";
import { CgDarkMode } from "react-icons/cg";


const DarkModeSwitch = () => {
  
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
    
  };

  return (
    <label className="w-full flex justify-between">
      <span className="flex items-center">
        <CgDarkMode className="h-6 w-6 mr-2" />Modo oscuro
      </span>
      <Switch onChange={handleChange} checked={checked} />
    </label>
  );
};

export default DarkModeSwitch;
