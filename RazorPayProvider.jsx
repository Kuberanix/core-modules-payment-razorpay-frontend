import React, { useState, createContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
export const RazorPayContext = createContext({
  isLoading: true,
  isError: true,
});
export default function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const loader = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await loadRazorpay();
      if (!res) {
        setIsError(true);
        console.log('Razorpay error: Failed to load razorpay');
        return;
      }
    } catch (error) {
      setIsError(true);
      console.log('Razorpay load error: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loader();
  }, [loader]);
  return (
    <RazorPayContext.Provider
      value={{ isLoading, isError, setIsLoading, setIsError }}
    >
      {children}
    </RazorPayContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
