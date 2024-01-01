import { FetchUserAttributesOutput, fetchUserAttributes } from "@aws-amplify/auth";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import axios from "axios";

console.log(process.env.REACT_APP_COGNITO_USER_POOL_ID);

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ?? "",
};

export const exchangeCode = async (code: string) => {
  const redirectUri = `${window.location.origin}/auth/confirm`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: process.env.REACT_APP_COGNITO_CLIENT_ID,
    }
  };
  //TODO: Make the domain dynamic
  return await axios.post(
    `https://codex-auth.auth.us-east-1.amazoncognito.com/oauth2/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_COGNITO_GOOGLE_CLIENT_ID}&code=${code}&redirect_uri=${redirectUri}`,
    {}, {headers: config.headers}
  );
};

export const getUserInfo = async (): Promise<FetchUserAttributesOutput | null> =>
  {
    let userInfo: FetchUserAttributesOutput | null = null;
    try
    {
      userInfo = await fetchUserAttributes();
      console.log(`UserAttr[${JSON.stringify(userInfo)}]`);
    } catch (error)
    {
      console.log("getUserInfo ERROR", error);
    }

    return userInfo;
  };


export const logout = () => {
  const userPool = new CognitoUserPool(poolData);
  const user = userPool.getCurrentUser();
  user?.signOut();
  window.location.href = "/";
};
