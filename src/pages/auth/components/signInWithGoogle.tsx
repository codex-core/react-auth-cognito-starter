import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

function SignInGoogle() {
  const cognitoClientId = process.env.REACT_APP_COGNITO_GOOGLE_CLIENT_ID ?? "";
  const cognitoClientSecret = "";

  const authorizationEncoded = btoa(
    `${cognitoClientId}:${cognitoClientSecret}`
  );

  const data = new URLSearchParams(
    Object.entries({
      client_id: cognitoClientId,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:4000",
    })
  );
  const uniquePrefix = "codex-auth";
  const buildGoogleUrl = () => {
    const base =
      "https://codex-auth.auth.us-east-1.amazoncognito.com/oauth2/authorize?";
    const clientId = cognitoClientId;
    const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
    const redirectUri = "http://localhost:4000";
    return (
      base +
      `client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
    );
  };
  const handleGoogleSignIn = async () => {
    const result = await axios.post(
      `https://${uniquePrefix}.auth.us-east-1.amazoncognito.com/oauth2/token?`,
      data.toString(),
      {
        headers: {
          //   Authorization: `Basic ${authorizationEncoded}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const longLivedCredentials = result.data;
  };

  return (
    <div>
      <a href={buildGoogleUrl()}>
        <Button  style={{minWidth: 240}} variant="outlined" endIcon={<img className="small-logo" src="/icons/google.png" />}>
          Sign in with
        </Button>
      </a>
    </div>
  );
}

export default SignInGoogle;
