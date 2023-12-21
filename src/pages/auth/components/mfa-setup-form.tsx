import {
  TextField,
  Typography,
  CircularProgress as Spinner,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CognitoAuthContext from "../../../common/context/cognitoAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { Button } from "reactstrap";
import { CognitoUserSession } from "amazon-cognito-identity-js";

const MFASetupForm = ({ secretCode = "" }: { secretCode: any }) => {
  const { currentUser, updateSession } = useContext(CognitoAuthContext);
  const [isLoading, setisLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const navigate = useNavigate();
  const submitOTP = () => {
    if (mfaCode.length >= 6) {
      console.log("submitting OTP", mfaCode);
      setisLoading(true);
      currentUser?.verifySoftwareToken(mfaCode, "Codex Core Auth Solution", {
        onSuccess: (session: CognitoUserSession) => {
          const token = session.getAccessToken().getJwtToken();
          updateSession(token);
          setTimeout(() => {
            setisLoading(false);
            navigate("/dashboard");
          }, 1000);
        },
        onFailure: (err: any) => {
          console.log(err);
          setisLoading(false);
          toast.error("OTP failed");
        },
      });
    }
  };
  return (
    <div>
      <div>
        <Typography variant="h6">
          Scan this QR code with your authenticator app
        </Typography>
      </div>
      <br />
      <div style={{ background: "white", padding: "16px" }}>
        {secretCode && secretCode.length > 1 && <QRCode value={secretCode} />}
      </div>
      <TextField
        type="text"
        name="otp"
        placeholder="Enter OTP"
        onChange={(e) => setMfaCode(e.target.value)}
      />
      <Button variant="outlined" color="primary" onClick={submitOTP}>
        {isLoading ? <Spinner /> : "Submit"}
      </Button>
    </div>
  );
};

export default MFASetupForm;
