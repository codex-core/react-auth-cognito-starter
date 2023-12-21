import { CognitoUserPool , AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
console.log(process.env.REACT_APP_COGNITO_USER_POOL_ID);
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID ?? "",
};

export const authenticate=(Email:string,Password:string)=>{
    const userPool = new CognitoUserPool(poolData);

    return new Promise((resolve,reject)=>{
        const user=new CognitoUser({
            Username:Email,
            Pool: userPool
        });

        const authDetails= new AuthenticationDetails({
            Username:Email,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result: unknown)=>{
                console.log("login successful");
                resolve(result);
            },
            onFailure:(err: any)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const userPool = new CognitoUserPool(poolData);
    const user = userPool.getCurrentUser();
    user?.signOut();
    window.location.href = '/';
};