import { useEffect } from 'react';

const useAutoLogout = (logoutFunction: ()=> void) => {
  let inactivityTimer: string | number | NodeJS.Timeout | undefined;

  const logoutAfterInactivity = () => {
    // Log out the user using the provided function
    logoutFunction();
  };

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutAfterInactivity, 5 * 60 * 1000); // 5 minutes
  };

  useEffect(() => {
    // Events to reset the timer
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Set the initial timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, );
};

export default useAutoLogout;
