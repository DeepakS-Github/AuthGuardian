// app/components/ThemeSwitch.tsx
'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import Switch from "react-switch";


export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()

  const [checked, setChecked] = useState(true);

  useEffect(()=>{
    setTheme("dark");
  },[]);

  const handleChange = () => {
    if (resolvedTheme === "dark") {
      setTheme('light');
    }
    else {
      setTheme('dark');
    }
    setChecked(!checked);
  };



  return (
    <div className="flex items-center">
      <Switch
        onChange={handleChange}
        checked={checked}
        offHandleColor="#f3f4f6"
        onHandleColor="#1f2937"
        offColor="#1f2937"
        onColor="#f3f4f6"
        // borderRadius={4}
        uncheckedIcon={<FiMoon className="w-full text-gray-100 h-full p-1.5 flex justify-center items-center" />}
        checkedIcon={<FiSun className="flex w-full text-gray-800 h-full p-1.5 justify-center items-center" />}
        uncheckedHandleIcon={<FiSun className="flex w-full text-gray-800 h-full p-1.5 justify-center items-center" />}
        checkedHandleIcon={<FiMoon className="w-full text-gray-100 h-full p-1.5 flex justify-center items-center" />}
      />
    </div>
  );
};

