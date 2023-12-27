import { Button } from "@mui/material";

function SignInGoogle() {
  const cognitoClientId = process.env.REACT_APP_COGNITO_GOOGLE_CLIENT_ID ?? "";
  const uniquePrefix = process.env.COGNITO_APP_PREFIX ?? "codex-auth";
  const buildGoogleUrl = () => {
    const base =
      `https://${uniquePrefix}.auth.us-east-1.amazoncognito.com/oauth2/authorize?`;
    const clientId = cognitoClientId;
    const scope = "aws.cognito.signin.user.admin+email+openid+phone+profile";
    const redirectUri = encodeURI(`${window.location.protocol}//${window.location.host}/auth/oidc`);
    return (
      base +
      `client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
    );
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
