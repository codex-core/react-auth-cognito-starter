import { useContext, useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/login";
import CognitoAuthContext, { CognitoAuthProvider } from "./common/context/cognitoAuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SetNewPassword from "./pages/auth/set-new-password";
import ForgotPassword from "./pages/auth/forgot-password";
import ConfirmPassword from "./pages/auth/confirm-password";
import Settings from "./pages/dashboard/settings";
import Account from "./pages/dashboard/account";
import GoogleValidation from "./pages/auth/google";
import { Amplify } from "aws-amplify";
import { ResourcesConfig } from "@aws-amplify/core";
import { Hub } from "aws-amplify/utils";
import {
  signInWithRedirect,
  signOut,
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";
import { User } from "./common/types";
import { AuthProvider } from "@aws-amplify/auth/dist/esm/types/inputs";
import ConfirmSSO from "./pages/auth/components/confirmSSO";
import { getUserInfo } from "./pages/auth/cognito";
import { toast } from "react-toastify";

const IS_LOCAL = process.env.NODE_ENV === "development";
const authProps: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_COGNITO_GOOGLE_CLIENT_ID, // TODO: change this
      loginWith: {
        oauth: {
          domain: process.env.REACT_APP_USER_POOL_DOMAIN,
          scopes: [
            "email",
            "profile",
            "phone",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          providers: ["Google"],
          redirectSignIn: [process.env.REACT_APP_COGNITO_REDIRECT_SIGN_IN],
          redirectSignOut: [process.env.REACT_APP_COGNITO_REDIRECT_SIGN_OUT],
          responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    },
  },
};

Amplify.configure(authProps);

const ProtectedRoute = ({
  token,
  userData = null,
  redirectPath = "/",
}: {
  token: null | {};
  userData: User | null;
  redirectPath?: string;
}) => {
  if (!token && !userData) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function AppRoutes() {
  const {
    sessionToken: token,
    storeUserData,
    fetchUserData,
  } = useContext(CognitoAuthContext);
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          console.log("HUB: Sign in with redirect");
          //getUser();
          break;

        case "signInWithRedirect_failure":
          console.log("HUB: signInWithRedirect_failure");
          // setError("An error has ocurred during the Oauth flow.");
          break;

        case "customOAuthState":
          console.log("HUB: customOAuthState");
          // setCustomState(payload.data);
          break;

        case "signedIn":
          console.log("HUB: signedIN");
          // const userInfo = await getUserInfo();
          // setUser(userInfo);
          const userInfo = await fetchCurrentUserData();
          storeUserData(userInfo);
          break;

        case "signedOut":
          console.log("HUB: signedOUT");
          storeUserData(null as unknown as User);
          break;

        default:
          console.log("HUB: DEFAULT: ", payload.event);
          break;
      }
    });

    async function fetchCurrentUserData() {
      console.log("getMyUserInfo()");

      if (IS_LOCAL) {
        let user: User = {
          id: "123456789",
          email: "test@codexstudios.io",
          name: "TestUser",
          given_name: "Test",
          family_name: "User",
          groups: [],
        };
        const userInfo: FetchUserAttributesOutput | null = await getUserInfo();
        if (userInfo) {
          storeUserData(userInfo);
          navigate("/auth/oidc")
        }
      } else {
        const userInfo: FetchUserAttributesOutput | null = await getUserInfo();
        console.log("getMyUserInfo() userInfo", userInfo);

        if (userInfo) {
          let user: User = {
            id: userInfo?.sub || "",
            name: userInfo?.name || "",
            email: userInfo?.email || "",
            given_name: userInfo?.given_name || "",
            family_name: userInfo?.family_name || "",
            groups: Array.isArray(userInfo?.["custom:signetgroup"])
              ? userInfo?.["custom:signetgroup"]
              : [],
          };
          storeUserData(user);

        }
      }
    }
    // fetchCurrentUserData();
    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        element={<ProtectedRoute token={token} userData={fetchUserData()} />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/auth/oidc" element={<GoogleValidation />} />
      <Route path="/auth/confirm" element={<ConfirmSSO />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route path="/reset-form" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}
function App() {

  // TODO: MOVE ABOVE CODE TO CONTEXT.

  return (
    <div className="App">
      <BrowserRouter>
      <CognitoAuthProvider>
        <AppRoutes/>
      </CognitoAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
