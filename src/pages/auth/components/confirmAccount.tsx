import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CognitoAuthContext from "../../../common/context/cognitoAuthContext";
import Centered from "../../../common/centered";
import { useIdleTimer } from "react-idle-timer";
import { error } from "console";

function ConfirmAccount() {
  const {
    resendCode,
    authenticate,
    tempAccountCreds,
    cleanupTempCreds,
  } = useContext(CognitoAuthContext);
  const navigate = useNavigate();

  const handleOnAction = (event) => {
    if (event.type === "visibilitychange") {
      console.log("user is active", event);
      if (
        tempAccountCreds &&
        tempAccountCreds.username &&
        tempAccountCreds.password
      )
        authenticate(tempAccountCreds.username, tempAccountCreds.password).then(
          (authResult) => {
            console.log(authResult);
            if (authResult && authResult.userAttributes) {
              // setAuthContext("0");
              toast.success("Login successful");
              navigate("/set-new-password");
            } else {
              cleanupTempCreds();
              navigate("/dashboard");
            }
          }
        ).catch((error) => {
          console.log(error);
        });
    }
    getRemainingTime();
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: 800000,
    onAction: handleOnAction,
    debounce: 500,
  });
  return (
    <div className="container">
      <Centered>
        <div className="p30">
          <Typography variant="body1">
            Hey! We noticed you never verified your account! Please check your
            email for the verification link and head back here once your account
            has been verified
          </Typography>
          <img
            src="/images/email-icon.jpg"
            alt="verify email"
            className="img-500px"
          />
        </div>
        <br />
        <div className="p30">
          <Typography variant="body2">Do you need the link resent?</Typography>
          <Button onClick={(e) => resendCode()}>Resend Email</Button>
        </div>

        <br />
      </Centered>
    </div>
  );
}

export default ConfirmAccount;
