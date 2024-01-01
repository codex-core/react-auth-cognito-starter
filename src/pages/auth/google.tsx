import React, { useContext, useEffect } from "react";
import CognitoAuthContext from "../../common/context/cognitoAuthContext";
import { exchangeCode, getUserInfo } from "./cognito";
import { FetchUserAttributesOutput } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Centered from "../../common/centered";
import { Box, Card, LinearProgress, Typography } from "@mui/material";

function GoogleValidation() {
  const { storeUserData } = useContext(CognitoAuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then((userInfo: FetchUserAttributesOutput | null) => {
      if (userInfo) {
        storeUserData(userInfo);
        Promise.resolve(
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000)
        );
      } else {
        toast.error("We couldn't log you in");
      }
    });
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async ()=> {

  //   }
  //   fetchUserData();
  // }, []);
  return (
    <div className="authentication-box" style={{ height: "100%" }}>
      <Centered>
        <Card>
          <Box p={3}>
            <Typography>Signing you in securely...</Typography>
            <LinearProgress color="secondary" />
          </Box>
        </Card>
      </Centered>
    </div>
  );
}

export default GoogleValidation;
