import React, { Fragment, useContext } from "react";
import LoginTabset from "./components/loginTabset";
// import stats from "public/images/swank-vendors-white.png";
import { Box, Card, Paper, Typography, Zoom } from "@mui/material";
import Centered from "../../common/centered";
import Row from "../../common/components/Row";
import Col from "../../common/components/Col";
import CognitoAuthContext from "../../common/context/cognitoAuthContext";
import MFASetupForm from "./components/mfa-setup-form";
import OTPForm from "./components/otpForm";
import ConfirmAccount from "./components/confirmAccount";
const Login = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const {
    QRCodeSecret,
    authStep,
  } = useContext(CognitoAuthContext);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="authentication-box">
          <Row className="auth-row center-text" style={{ maxWidth: "700px", minHeight: "600px" }}>
            <Col>
              <Centered ref={containerRef}>
                <Card className="tab2-card slide-up-fade-in">
                  <div className="p30">
                    <Typography pb={10} variant="h6" color={"gray"}>
                      Welcome to the Codex Core Starter Template!
                    </Typography>
                    <Typography variant="body1" color={"GrayText"}>
                      To gain full demo access to this dashboard please contact
                      us at contact@codexstudios.io. A member of our team will
                      reach out to start the conversation. To read documentation
                      on how this is built please read the following docs
                    </Typography>
                    <hr />
                  </div>
                  <Zoom
                    mountOnEnter
                    unmountOnExit
                    in={authStep === "login"}
                    style={{
                      transitionDelay: authStep === "login" ? "500ms" : "0ms",
                    }}
                  >
                    {LoginTabset()}
                  </Zoom>
                  <Box>
                    <Zoom
                      mountOnEnter
                      unmountOnExit
                      in={authStep === "confirmAccount"}
                      style={{
                        transitionDelay:
                          authStep === "setupMFA" ? "500ms" : "0ms",
                      }}
                    >
                      {ConfirmAccount()}
                    </Zoom>
                  </Box>
                  <Box>
                    <Zoom
                      mountOnEnter
                      unmountOnExit
                      in={authStep === "setupMFA"}
                      style={{
                        transitionDelay:
                          authStep === "setupMFA" ? "500ms" : "0ms",
                      }}
                    >
                      {MFASetupForm({ secretCode: QRCodeSecret })}
                    </Zoom>
                  </Box>
                  <Box>
                    <Zoom
                      mountOnEnter
                      unmountOnExit
                      in={authStep === "enterOTP"}
                      style={{
                        transitionDelay:
                          authStep === "enterOTP" ? "500ms" : "0ms",
                      }}
                    >
                      {OTPForm()}
                    </Zoom>
                  </Box>
                </Card>
              </Centered>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
