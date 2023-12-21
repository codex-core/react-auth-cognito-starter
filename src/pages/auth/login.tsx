import React, { Fragment, useContext } from "react";
import LoginTabset from "./components/loginTabset";
import Slider from "react-slick";
// import stats from "public/images/swank-vendors-white.png";
import { Box, Card, Paper, Slide, Typography, Zoom } from "@mui/material";
import Centered from "../../common/centered";
import Row from "../../common/components/Row";
import Col from "../../common/components/Col";
import CognitoAuthContext from "../../common/context/cognitoAuthContext";
import { Navigate } from "react-router-dom";
import MFASetupForm from "./components/mfa-setup-form";
import OTPForm from "./components/otpForm";
const stats = "";
const Login = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const {
    currentUser: user,
    sessionToken: token,
    displayQRCode,
    QRCodeSecret,
    loginStep,
  } = useContext(CognitoAuthContext);
  // if (token) {
  //   return <Navigate to="/dashboard" replace />;
  // }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };
  const icon = (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
      <svg>
        <Box
          component="polygon"
          points="0,100 50,00, 100,100"
          sx={{
            fill: (theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
          }}
        />
      </svg>
    </Paper>
  );
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
                    in={loginStep === "login"}
                    style={{
                      transitionDelay: loginStep === "login" ? "500ms" : "0ms",
                    }}
                  >
                    {LoginTabset()}
                  </Zoom>
                  <Box>
                    <Zoom
                      mountOnEnter
                      unmountOnExit
                      in={loginStep === "setupMFA"}
                      style={{
                        transitionDelay:
                          loginStep === "setupMFA" ? "500ms" : "0ms",
                      }}
                    >
                      {MFASetupForm({ secretCode: QRCodeSecret })}
                    </Zoom>
                  </Box>
                  <Box>
                    <Zoom
                      mountOnEnter
                      unmountOnExit
                      in={loginStep === "enterOTP"}
                      style={{
                        transitionDelay:
                          loginStep === "enterOTP" ? "500ms" : "0ms",
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
