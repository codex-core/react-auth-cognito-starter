import React, { useContext, useEffect } from "react";
import CognitoAuthContext from "../../common/context/cognitoAuthContext";
import { exchangeCode } from "./cognito";

function GoogleValidation() {
    const { currentUser: user, sessionToken: token } = useContext(CognitoAuthContext);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    exchangeCode(code ?? "")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(code);
  }, []);
  return <div>GoogleValidation</div>;
}

export default GoogleValidation;