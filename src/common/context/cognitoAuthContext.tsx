import React, { createContext, useState } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import useSessionStorage from "../hooks/useSessionStorage";
import useAutoLogout from "../hooks/useAutoLogout";
import { toast } from "react-toastify";
import { TOTP } from "otpauth";
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ?? "",
};

const userPool = new CognitoUserPool(poolData);

type mfaSessionOptions =
  | "login"
  | "setupMFA"
  | "confirmAccount"
  | "enterOTP"
  | "mfaRequired"
  | "forgotPassword"
  | "newPasswordRequired";
interface AuthContextProps {
  authenticate: (Username: string, Password: string) => Promise<any>;
  logout: () => void;
  forgotPassword: (Username: string) => Promise<any>;
  updateSession: (token: string) => void;
  authStep: mfaSessionOptions;
  confirmPassword: (
    Username: string,
    verificationCode: string,
    newPassword: string
  ) => Promise<any>;
  currentUser: CognitoUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CognitoUser | null>>;
  userAttributes?: any;
  QRCodeSecret?: any;
  confirmAccount?: any;
  resendCode?: any;
  checkUserSession: any;
  cleanupTempCreds: any;
  displayQRCode?: boolean;
  createUserAccount? :any;
  tempAccountCreds: any;
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
  authStep: "login",
  createUserAccount: () => {},
  tempAccountCreds: null,
  updateSession: () => {},
  forgotPassword(Username) {
    return Promise.resolve();
  },
  cleanupTempCreds: () => {},
  resendCode: () => {},
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
  const [sessionToken, setSessionData, removeSessionData] = useSessionStorage(
    "token",
    null
  );
  const [userAttributes, setUserAttributes] = useState<any>(null);
  const [tempAccountCreds, setTempAccountCreds] = useState<any>(null); // {username, password}
  const [QRCodeSecret, setQRCodeSecret] = useState<any>(null);
  const [authStep, setAuthStep] = useState<mfaSessionOptions>("login"); // login, mfa, forgotPassword, newPasswordRequired, mfaSetup
  const [displayQRCode, setDisplayQRCode] = useState<boolean>(false);
  const [requiredAttributes, setRequiredAttributes] = useState<any>(null);

  var logout = () => {
    if (currentUser) {
      currentUser.signOut();
    }
    removeSessionData("token");
    setCurrentUser(null);
    window.location.href = "/";
  };
  useAutoLogout(logout);

  /**
   *
   * @param Username
   * @param Password
   * @returns
   * This function will authenticate the user and set the session token in local storage when the
   * normal username and password authentication flow is used.
   */
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
        onFailure: (err) => {
          console.log("login failed", err);
            if(err.code && err.code === "UserNotConfirmedException") {
              setAuthStep("confirmAccount");
              setCurrentUser(user);
              setTempAccountCreds({username: Username, password: Password});
            } else {
              reject("Unable to login")
              setCurrentUser(null);
            }


        }
          ,
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
              console.log(Username);
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
              setAuthStep("setupMFA");
            },
            onFailure: (err) => {
              console.log("associateSoftwareToken error", err);
            },
          });
        },
        //TODO: Plug in support for mfa and OTP setup
        totpRequired: function (secretCode) {
          setCurrentUser(user);
          setAuthStep("enterOTP");
        },
        mfaRequired: function (codeDeliveryDetails) {
          setAuthStep("mfaRequired");
        },
      });
    });
  };

  /**
   *
   * @param Username
   * @param code
   * @returns
   * This function will confirm the account when the user is created and the account is not confirmed.
   * meaning they hit the second part of the login flow where they have to enter a OTP code
   */
  const confirmAccount = (Username: string, code: string) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }
  const cleanupTempCreds = () => {
    setTempAccountCreds(null);
  }

  /**
   *
   * @returns
   * This function will resend the confirmation code to the user if they did not receive it.
   * Mainly used in the password reset flow
   */
  const resendCode = () => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: tempAccountCreds.username, Pool: userPool });
      user.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  /**
   *
   * @param name
   * @param email
   * @param password
   * @returns
   * This function will create the user account in cognito and send the confirmation code to the user's
   * email
   */
  const createUserAccount = (
    name: string,
    email: string,
    password: string,
  ) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "name", Value: name }),
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          console.log(err.message || JSON.stringify(err));
          reject(err);
          return;
        }
        const cognitoUser = result.user;
        console.log('User registration successful:', cognitoUser.getUsername());
        setAuthStep("confirmAccount");
        setCurrentUser(cognitoUser);
        resolve(result);
      });
    })
  };
  /**
   * This function will check the user session and refresh the token if it is expired.
   * and set the token in local storage
   */
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
    });
  };
  const forgotPassword = (Username: any) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });

      user.forgotPassword({
        onSuccess: (data) => {
          console.log(`forgotPassword onSuccess: ${data}`);
          resolve({});
        },
        onFailure: (err) => {
          toast.error(
            "We were unable to send a verification code for your account"
          );
          reject(err);
        },
        inputVerificationCode: (data) => {
          toast.success("Verification code sent!, please check your email");
          resolve(data);
          window.location.href = "/confirm-password";
        },
      });
    });
  };

  /**
   *
   * @param Username
   * @param verificationCode
   * @param newPassword
   * @returns
   * This function will confirm the new password for the user when they are resetting their password
   */
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

  const updateSession = (token: string) => {
    setSessionData("token", token);
  };
  // Add other Cognito methods (e.g., password reset) as needed

  return (
    <CognitoAuthContext.Provider
      value={{
        //@ts-ignore
        authenticate,
        userAttributes,
        sessionToken,
        checkUserSession,
        authStep,
        cleanupTempCreds,
        tempAccountCreds,
        displayQRCode,
        QRCodeSecret,
        updateSession,
        requiredAttributes,
        logout,
        currentUser,
        createUserAccount,
        setCurrentUser,
        forgotPassword,
        confirmAccount,
        resendCode,
        confirmPassword,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default CognitoAuthContext;
