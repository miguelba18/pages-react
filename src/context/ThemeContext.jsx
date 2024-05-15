import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const setDarkMode = (mode) => {
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useTheme = () => useContext(ThemeContext);
