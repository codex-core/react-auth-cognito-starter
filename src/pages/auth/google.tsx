import { useEffect } from "react";
import { exchangeCode } from "./cognito";

function GoogleValidation() {
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