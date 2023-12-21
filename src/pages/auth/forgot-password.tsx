import React, { useState, useContext } from 'react';
import CognitoAuthContext from '../../common/context/cognitoAuthContext';
 const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const { forgotPassword } = useContext(CognitoAuthContext);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      await forgotPassword(username);
      console.log('Password reset code sent');
      // Redirect to the confirm password page or update UI accordingly
    } catch (error) {
      console.error('Error in sending password reset code:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPassword;