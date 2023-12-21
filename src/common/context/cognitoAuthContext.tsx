import React, { ReactElement, createContext, useState } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import useSessionStorage from "../hooks/useSessionStorage";
import useAutoLogout from "../hooks/useAutoLogout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TOTP } from "otpauth";
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ?? "",
};

const userPool = new CognitoUserPool(poolData);

// TODO: Replace with user type
type UserType = {
  // Define your user properties here
};
type mfaSessionOptions = 'login' | 'setupMFA' | 'enterOTP' | 'mfaRequired' | 'forgotPassword' | 'newPasswordRequired'
interface AuthContextProps {
  authenticate: (Username: string, Password: string) => Promise<any>;
  logout: () => void;
  forgotPassword: (Username: string) => Promise<any>;
  updateSession: (token:string) => void;
  loginStep: mfaSessionOptions;
  confirmPassword: (
    Username: string,
    verificationCode: string,
    newPassword: string
  ) => Promise<any>;
  currentUser: CognitoUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CognitoUser | null>>;
  userAttributes?: any;
  QRCodeSecret?: any;
  checkUserSession: any,
  displayQRCode?: boolean;
  sessionToken: any;
  requiredAttributes: string[];
}

const CognitoAuthContext = createContext<AuthContextProps>({
  authenticate: () => Promise.resolve(null),
  logout: () => {},
  sessionToken: null,
  checkUserSession: () => {},
  QRCodeSecret: null,
  displayQRCode: false,
  loginStep: 'login',
  updateSession: () => {},
  forgotPassword(Username) {
    return Promise.resolve();
  },
  requiredAttributes: [],
  confirmPassword(Username, verificationCode, newPassword) {
    return Promise.resolve();
  },
  setCurrentUser: () => {},
  currentUser: null,
});

export const CognitoAuthProvider = ({ children }: { children: any }) => {
  //TODO: Replace with user type
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);
  const [sessionToken, setSessionData, removeSessionData] = useSessionStorage("token", null);
  const [userAttributes, setUserAttributes] = useState<any>(null);
  const [QRCodeSecret, setQRCodeSecret] = useState<any>(null);
  const [loginStep, setLoginStep] = useState<mfaSessionOptions>("login"); // login, mfa, forgotPassword, newPasswordRequired, mfaSetup
  const [displayQRCode, setDisplayQRCode] = useState<boolean>(false);
  const [requiredAttributes, setRequiredAttributes] = useState<any>(null);

  var logout = () => {
    if (currentUser) {
      currentUser.signOut();
    }
    removeSessionData("token")
    setCurrentUser(null);
    window.location.href = "/";
  };
  useAutoLogout(logout);

  const authenticate = (Username: string, Password: string) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          setCurrentUser(user);
          setSessionData("token", result.getAccessToken().getJwtToken());
          resolve(result);
        },
        onFailure: (err) =>
          reject((err: any) => {
            console.log("login failed", err);
            setCurrentUser(null);
          }),
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // User was signed in, but must set a new password
          setCurrentUser(user);
          setUserAttributes(userAttributes);
          setRequiredAttributes(requiredAttributes);
          resolve({ user, userAttributes, requiredAttributes });
        },
        mfaSetup: (challengeName, challengeParameters) => {
          user.associateSoftwareToken({
            associateSecretCode: (secretCode) => {
              console.log(Username)
              setCurrentUser(user);
              let totp = new TOTP({
                issuer: "https://cognito-idp.us-east-1.amazonaws.com",
                label: "AWSCognito",
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                issuerInLabel: false,
                secret: secretCode,
              });
              setQRCodeSecret(totp.toString());
              setDisplayQRCode(true);
              setLoginStep('setupMFA')
            },
            onFailure: (err) => {
              console.log("associateSoftwareToken error", err);
            }
          });
        },
        //TODO: Plug in support for mfa and OTP setup
        totpRequired: function(secretCode) {
          setCurrentUser(user)
          setLoginStep('enterOTP')
        },
        mfaRequired: function(codeDeliveryDetails) {
          toast.info('MFA required here')
          setLoginStep('mfaRequired')
        },
      });
    });
  };

  const refreshUserSession = () => {
    currentUser?.getSession((err: any, session: CognitoUserSession) => {
      if (err) {
        toast.info("Please login again");
        window.location.href = "/";
        console.log("refreshUserSession error", err);
        return;
      }
      setSessionData("token", session.getAccessToken().getJwtToken());
    }
    );
  };
  const checkUserSession = () => {
    currentUser?.getSession((err: any, session: CognitoUserSession) => {
      if (err) {
        toast.info("Please login again");
        window.location.href = "/";
        console.log("refreshUserSession error", err);
        return;
      }
      const refreshToken = session.getRefreshToken();
      if (refreshToken) {
        setSessionData("token", session.getAccessToken().getJwtToken());
      } else {
        toast.info("Please login again");
        window.location.href = "/";
      }
    }
    );
  };
  const forgotPassword = (Username: any) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });

      user.forgotPassword({
        onSuccess: (data) => {
          console.log(`forgotPassword onSuccess: ${data}`);
          resolve({})},
        onFailure: (err) => {
          toast.error('We were unable to send a verification code for your account')
          reject(err)},
        inputVerificationCode: (data) => {
          toast.success("Verification code sent!, please check your email");
          resolve(data)
          window.location.href = "/confirm-password"
        },
      });
    });
  };

  const confirmPassword = (
    Username: any,
    verificationCode: string,
    newPassword: string
  ) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });

      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve({}),
        onFailure: (err) => reject(err),
      });
    });
  };

  const updateSession = (token:string) => {
    setSessionData("token", token)
  }
  // Add other Cognito methods (e.g., password reset) as needed

  return (
    <CognitoAuthContext.Provider
      value={{
        //@ts-ignore
        authenticate,
        userAttributes,
        sessionToken,
        checkUserSession,
        loginStep,
        displayQRCode,
        QRCodeSecret,
        updateSession,
        requiredAttributes,
        logout,
        currentUser,
        setCurrentUser,
        forgotPassword,
        confirmPassword,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default CognitoAuthContext;
