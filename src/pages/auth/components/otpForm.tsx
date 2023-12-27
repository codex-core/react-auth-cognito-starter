import { Link, TextField, Typography, Button,
  CircularProgress as Spinner,
} from "@mui/material";
import { useContext, useState } from "react";
import CognitoAuthContext from "../../../common/context/cognitoAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CognitoUserSession } from "amazon-cognito-identity-js";

const OTPForm = () => {
  const { currentUser, updateSession } = useContext(CognitoAuthContext);
  const [mfaCode, setMfaCode] = useState("");
  const [isloading, setisloading] = useState(false);

  const navigate = useNavigate();
  const submitOTP = () => {
    if (mfaCode.length >= 6) {
      console.log("submitting OTP", mfaCode);
      setisloading(true);
      currentUser?.sendMFACode(mfaCode, {
        onSuccess: (session: CognitoUserSession) => {
          updateSession(session.getIdToken().getJwtToken());
          setisloading(false)
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        },
        onFailure: (err: any) => {
          console.log(err);
          setisloading(false)
          toast.error("OTP failed");
        },
      }, 'SOFTWARE_TOKEN_MFA');
    }
  };
  return (
    <div className="container">
      <div>
        <Typography variant="body2">
          Please enter the one time pass code you from your authenticator app!
        </Typography>
      </div>
      <br />
      <TextField
        type="text"
        variant="outlined"
        size="small"
        name="otp"
        placeholder="Enter OTP"
        onChange={(e) => setMfaCode(e.target.value)}
      />
      <br />
      <Button variant="outlined" color="primary" onClick={submitOTP}>
        {isloading ? <Spinner></Spinner> : "Submit" }
      </Button>
      <br />
      <Typography variant="caption">
        Need help, please click here to contact support{" "}
        <Link href="mailto:contact@codexstudios.io">here</Link>
      </Typography>
    </div>
  );
}

export default OTPForm;
