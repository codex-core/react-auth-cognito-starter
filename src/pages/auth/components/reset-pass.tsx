import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AlertCircle } from "react-feather";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Spinner, Input } from "reactstrap";
import Centered from "../../../common/centered";
// import { updateAccount } from "../../services/api/accounts";
import { passwordvalidate } from "../functions";
import useQuery from "../../../common/hooks/useQuery";

function ResetPassword(props: any) {
  const [global, setGlobal] = useState({
    isValid: false,
    isLoading: false,
    isSame: false,
  });
  const [pass, setPass] = useState({ confirm: "", new: "" });
  const [isErrorState, setIsErrorState] = useState({
    error: false,
    message: "",
  });
  const qParams = useQuery();
  const navigate = useNavigate();
  useEffect(() => {
    //check tkn for match. if not match... yikes.
    //check is date is within 48 hours.
    //else link expired
    let h48 = 172800000;
    if (!qParams.get("dateRequested") || !qParams.get("requester")) {
      setIsErrorState({ error: true, message: "This link is invalid" });
      toast.error("This link is invalid");
      return;
    }
    const dateRequested = qParams.get("dateRequested") as any as number
    if (Date.now() - dateRequested > h48) {
      setIsErrorState({
        error: true,
        message: "This link has expired, please request a new one",
      });
      toast.error("This link is invalid");
      return;
    }
  }, []);
  const resetPassword = (e: { preventDefault: () => void; }) => {
    let userId = qParams.get("requester");
    e.preventDefault();
    if (!global.isSame) {
      toast.info("Both passwords must match before submitting");
      return;
    }
    if (!passwordvalidate(pass.new)) {
      toast.error("Your password needs at least 1 number and 1 symbol");
      return;
    }
    //@ts-ignore
    setGlobal({ isLoading: true, ...global });
    //call function
    // updateAccount(userId, { password: pass.new })
    //   .then((res: any) => {
    //     toast.success("Password reset successfull!");
    //     navigate("/");
    //   })
    //   .catch((err: any) => {
    //     toast.error("Something went wrong when resetting your password");
    //     //@ts-ignore
    //     setGlobal({ isLoading: false, ...global });
    //   });
    //pass should be reset. return full user and set state.
  };
  const handleNewPassInput = (e: { target: { value: any; name?: any; }; }) => {
    const { name, value } = e.target;
    if (pass.new && pass.new !== e.target.value) {
      console.log("not equal");
      setGlobal({ ...global, isSame: false });
    } else {
      setGlobal({ ...global, isSame: true });
    }
    setPass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Centered>
      {!isErrorState.error ? (
        <Box>
          <Typography marginY={5} variant={"h5"}>
            Reset Password Form
          </Typography>
          <small>
            Reminder: This link will only valid for the next 48 hours
          </small>
          <Form className="form-horizontal auth-form" onSubmit={resetPassword}>
            <FormGroup>
              <Input
                required={true}
                name="new"
                type="password"
                className="form-control"
                placeholder="New password"
                id="exampleInputEmail1"
                onChange={handleNewPassInput}
              />
            </FormGroup>
            {!pass.confirm && <p>Confirm your new password below</p>}
            {pass.confirm && !global.isSame && (
              <small style={{ color: "red" }}>
                Both passwords do not match...
              </small>
            )}
            <FormGroup>
              <Input
                required={true}
                name="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                onChange={handleNewPassInput}
              />
            </FormGroup>
            <Button color="primary" type={"submit"} style={{ minWidth: 140 }}>
              {global.isLoading ? (
                <Spinner animation="border" variant="light"></Spinner>
              ) : (
                "Reset Password"
              )}
            </Button>
          </Form>
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <AlertCircle />
          <Typography variant={"overline"}>{isErrorState.message}</Typography>
          <Link to="/">
            <Button color="primary">Home</Button>
          </Link>
        </Box>
      )}
    </Centered>
  );
}

export default ResetPassword;
