import React, { useState, useContext } from 'react';
import CognitoAuthContext from '../../common/context/cognitoAuthContext';

const ConfirmPassword = () => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { confirmPassword } = useContext(CognitoAuthContext);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      await confirmPassword(username, verificationCode, newPassword);
      console.log('Password has been successfully updated');
      // Redirect to the login page or update UI accordingly
    } catch (error) {
      console.error('Error in confirming new password:', error);
    }
  };

  //use stepper...
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" />
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button type="submit">Confirm New Password</button>
    </form>
  );
};

export default ConfirmPassword;