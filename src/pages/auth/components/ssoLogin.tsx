import { FetchUserAttributesOutput, fetchUserAttributes, signInWithRedirect, signOut } from '@aws-amplify/auth';
import { AuthProvider } from '@aws-amplify/auth/dist/esm/types/inputs';
import { useEffect } from 'react'
import { User } from '../../../common/types';
import { Hub } from 'aws-amplify/utils';
import Col from '../../../common/components/Col';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const IS_LOCAL = process.env.NODE_ENV === "development";

function LoginWithSSO() {
  const navigate = useNavigate()
    function loginWithSSO(provider: AuthProvider)
    {
      // if (!IS_LOCAL)
      // {
        console.log("login() redirect");
        signInWithRedirect({ provider }).catch((e) => {
          console.log("login() error", e.toString().includes('UserAlreadyAuthenticatedException'));
          if (e.toString().includes('UserAlreadyAuthenticatedException'))
          {
            console.log("login() already logged in");
            navigate('/auth/oidc')
          }
        });
        console.log("login() after redirect");
      // }
      // else
      // {
      //   console.log("login() cheat");
      //   Hub.dispatch("auth", { event: "signedIn" });
      // }
    }

  return (
    <Col rowGap={1}>
        <Button onClick={(e)=> loginWithSSO('Google')} style={{minWidth: 240}} variant="outlined" endIcon={<img className="small-logo" src="/icons/google.png" />}>
          Sign in with
        </Button>
    </Col>
  )
}

export default LoginWithSSO