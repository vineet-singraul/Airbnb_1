// import { createContext, useState } from "react";

// export const ColorContext = createContext();

// const UserBlackWhite = ({ children }) => {

//   const [bgColor, setBgColor] = useState(null);

//   const handleBackgroundColor = () => {
//     setBgColor(null);
//   };

//   return (
//     <ColorContext.Provider value={{ handleBackgroundColor, bgColor, setBgColor }}>
//       {children}
//     </ColorContext.Provider>
//   );
// };

// export default UserBlackWhite;



import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

const UserBlackWhite = ({ children }) => {
  // Get initial theme from localStorage or default to 'light'
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);


  // Apply theme to body when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setLightTheme = () => {
    setTheme("light");
  };

  const setDarkTheme = () => {
    setTheme("dark");
  };

  return (
    <ColorContext.Provider value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}>
      {children}
    </ColorContext.Provider>
  );
};

export default UserBlackWhite;


