import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CognitoAuthContext from "../../common/context/cognitoAuthContext";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [undefinedAttributes, setUndefinedAttributes ] = useState<Record<string,string>>();
  const { currentUser, userAttributes, requiredAttributes, updateSession, } = useContext(CognitoAuthContext);
  useEffect(() => {
    if(!currentUser){
      navigate("/")
    }
    return () => {
    }
  }, [currentUser])
  const updateRequiredAttr = (event: any) => {
    console.log(event.target.value)
    setUndefinedAttributes({
      ...undefinedAttributes,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (currentUser === null && userAttributes === null) {
      navigate("/");
      toast.error("You must be logged in to access this page");
      return;
    } else {
      if(undefinedAttributes?.name){
        userAttributes.name = undefinedAttributes.name
      }
      if(userAttributes.email){
        delete userAttributes.email
      }
      if(userAttributes.email_verified){
        delete userAttributes.email_verified
      }
      // userAttributes.email_verified = "true"
      currentUser?.completeNewPasswordChallenge(newPassword, userAttributes, {
        onSuccess: (session) => {
          updateSession(session.getIdToken().getJwtToken());
          navigate("/dashboard");
        },
        onFailure: (err: any) => {
          toast.error("Error setting new password");
          console.error("Error setting new password", err);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {requiredAttributes ? (
        <div>
          <Typography>
            For some reason we're also missing the following information on your
            account.
          </Typography>
          <Typography>
            Please fill out the following information to continue.
          </Typography>
          {requiredAttributes.map((attribute: any) => {
            return (
              <div>
                <label>{attribute}</label>
                <input type="text" name={attribute} onChange={updateRequiredAttr} />
              </div>
            );
          })}
        </div>
      ): <></>}

      <hr />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Set New Password</button>
    </form>
  );
};

export default SetNewPassword;
