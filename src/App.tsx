import { useContext } from "react";
import Login from "./pages/auth/login";
import CognitoAuthContext from "./common/context/cognitoAuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SetNewPassword from "./pages/auth/set-new-password";
import ForgotPassword from "./pages/auth/forgot-password";
import ConfirmPassword from "./pages/auth/confirm-password";
import Settings from "./pages/dashboard/settings";
import Account from "./pages/dashboard/account";
import GoogleValidation from "./pages/auth/google";

const ProtectedRoute = ({
  token,
  redirectPath = "/",
}: {
  token: null | {};
  redirectPath?: string;
}) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function App() {
  const { sessionToken: token } = useContext(CognitoAuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/auth/oidc" element={<GoogleValidation />} />
          <Route path="/set-new-password" element={<SetNewPassword/>}/>
          <Route path="/reset-form" element={<ForgotPassword/>}/>
          <Route path="/confirm-password" element={<ConfirmPassword/>}/>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
