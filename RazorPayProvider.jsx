import React, { useState, createContext } from 'react';
export const RazorPayContext = createContext({
  isLoading: true,
  isError: true,
});
export default function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <RazorPayContext.Provider
      value={{ isLoading, isError, setIsLoading, setIsError }}
    >
      {children}
    </RazorPayContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.element,
};
