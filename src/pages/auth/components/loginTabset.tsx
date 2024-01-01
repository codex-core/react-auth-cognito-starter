import React, { Fragment, useContext, useEffect, useState } from "react";
import { Unlock, User } from "react-feather";
import { useNavigate } from "react-router-dom";
// import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
// import * as AuthService from "../../services/api/accounts";
import { setAuthContext } from "../../../services/store";
import {
  Tab,
  Button,
  FormGroup,
  Typography as Label,
  CircularProgress as Spinner,
  TextField,
  Checkbox,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import PasswordStrengthBar from "react-password-strength-bar";
import { passwordvalidate } from "../functions";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

import Terms from "./terms";
import { Form } from "reactstrap";
import CognitoAuthContext from "../../../common/context/cognitoAuthContext";
import LoginWithSSO from "./ssoLogin";
const LoginTabset = () => {
  const [value, setValue] = React.useState("0");
  const { authenticate, createUserAccount } = useContext(CognitoAuthContext);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [termsOpen, setOpenTerms] = useState(false);
  const [authInfo, setAuth] = useState({
    username: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [registerInfo, setRegister] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [isloading, setisloading] = useState(false);
  const [isSame, setIsSame] = useState(false);
  useEffect(() => {
    // const user = getData("user", true);
    // if (user) {
    //   return navigate('/dashboard')
    // }
    return () => {};
  }, []);

  const closeTerms = () => {
    setOpenTerms(false);
  };
  const openTerms = () => {
    setOpenTerms(true);
  };
  const authenticateUser = (Username: string, Password: string) => {
    authenticate(Username, Password)
      .then((authResult) => {
        setisloading(false);
        console.log(authResult);
        if (authResult && authResult.userAttributes) {
          setAuthContext("0");
          toast.success("Login successful");
          navigate("/set-new-password");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err: any) => {
        if(err.__type && err.__type === "UserNotConfirmedException"){
          navigate("/confirm-account");
          return
        }
        toast.error("Login failed, check your username or password");
        console.log(err);
        setisloading(false);
      });
  };

  const register = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const keys = Object.keys(registerInfo);
    for (let key of keys) {
      let identifier = key as keyof typeof registerInfo;
      const element = registerInfo[identifier];
      if (!element) {
        toast.error(`Please enter a ${identifier}`);
        return;
      }
    }
    if (!confirm) {
      toast.error("Please enter a confirmation password");
      return;
    }

    if (confirm && !isSame) {
      toast.error("Both passwords must match before moving forward");
      return;
    }
    if (!passwordvalidate(registerInfo.password)) {
      toast.error("Your password needs at least 1 number and 1 symbol");
      return;
    }
    if (registerInfo.password !== confirm) {
      toast.info("Your passwords are not a match. Please double check");
      return;
    }
    setisloading(true);
    toast.info("Ready to show auth info");
    createUserAccount(
      registerInfo.name,
      registerInfo.email,
      registerInfo.password,
      registerInfo.phoneNumber
    )
      .then((result) => {
        toast.success(
          "Account created successfully, please check your email for a confirmation!"
        );
        setisloading(false);
        authenticateUser(registerInfo.email, registerInfo.password);
      })
      .catch((err) => {
        setisloading(false);
        toast.error("Unable to create account");
      });
  };

  const invokeLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!authInfo.username) {
      console.log("no username found");
      toast.error("No username found");
      return;
    }
    if (!authInfo.password) {
      toast.error("No password entered");
      return;
    }
    setisloading(true);
    authenticateUser(authInfo.username, authInfo.password);
  };

  const handleRegisterInput = (e: { target: { value: any; name?: any } }) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (e.target.value === confirm) {
        setIsSame(true);
      } else {
        setIsSame(false);
      }
    }

    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setAuth((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirm = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (e.target.value !== registerInfo.password) {
      console.log("not equal");
      setIsSame(false);
    } else {
      setIsSame(true);
    }
    setConfirm(e.target.value);
  };
  return (
    <div>
      <Fragment>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="Handle tab change"
            className="nav nav-tabs tab-coupon"
            centered
          >
            <Tab label="Login" value="0" className="nav-link" icon={<User />} />
            <Tab
              label="Register"
              value="1"
              icon={<Unlock />}
              className="nav-link"
            />
          </TabList>

          <TabPanel value="0">
            <Form className="form-horizontal auth-form" onSubmit={invokeLogin}>
              <FormGroup>
                <TextField
                  required={true}
                  name="username"
                  type="email"
                  size="small"
                  className="form-control"
                  placeholder="Email/Username"
                  id="exampleInputEmail1"
                  onChange={handleInput}
                />
              </FormGroup>
              <br />
              <FormGroup>
                <TextField
                  required={true}
                  name="password"
                  type="password"
                  size="small"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleInput}
                />
              </FormGroup>
              <br />
              <div className="form-terms">
                <div className="custom-control custom-checkbox mr-sm-2">
                  <Label className="d-block">
                    <span>
                      {" "}
                      <Link
                        underline="none"
                        href="/reset-form"
                        className="forgot-pass p-0"
                      >
                        Lost your password?
                      </Link>
                    </span>
                  </Label>
                </div>
              </div>
              <br />
              <div className="form-button">
                <Button
                  color="primary"
                  variant="contained"
                  type={"submit"}
                  style={{ minWidth: 240 }}
                >
                  {isloading ? <Spinner></Spinner> : "Login"}
                </Button>
              </div>
              <br />
              <div>
                <LoginWithSSO />
              </div>
            </Form>
          </TabPanel>

          <TabPanel value="1">
            <Form className="form-horizontal auth-form" onSubmit={register}>
              <FormGroup>
                <TextField
                  size="small"
                  variant="outlined"
                  required={true}
                  name="name"
                  className="form-control"
                  placeholder="What's your name?"
                  id="input-name"
                  onChange={handleRegisterInput}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  required={true}
                  name="email"
                  type="email"
                  size="small"
                  variant="outlined"
                  label="Email"
                  className="form-control"
                  placeholder="example@email.com"
                  id="input-email"
                  onChange={handleRegisterInput}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  required={true}
                  name="phoneNumber"
                  type="number"
                  size="small"
                  variant="outlined"
                  label="Phone Number"
                  className="form-control"
                  placeholder="(123) 456 - 7890"
                  onChange={handleRegisterInput}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  required={true}
                  name="password"
                  type="password"
                  size="small"
                  variant="outlined"
                  label={"Password"}
                  className="form-control"
                  placeholder="**********"
                  onChange={handleRegisterInput}
                />
              </FormGroup>
              {/* <span>
								<ol>
									<li>
									8 Characters,
									</li>
									<li>
									8 Characters,
									</li>
									<li>
									8 Characters,
									</li>
								</ol>
								1 capital letter and 1 symbol
								</span> */}
              <FormGroup>
                <TextField
                  required={true}
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  size="small"
                  variant="outlined"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={handleConfirm}
                />
              </FormGroup>
              {!isSame && confirm.length > 0 && (
                <small style={{ color: "red" }}>
                  Both passwords do not match...
                </small>
              )}
              <PasswordStrengthBar password={registerInfo.password} />
              <div className="form-terms">
                <div className="custom-control custom-checkbox mr-sm-2">
                  <Label className="d-block">
                    <Checkbox
                      required={true}
                      onClick={openTerms}
                      className="checkbox_animated"
                      id="chk-ani2"
                    />
                    I agree all statements in{" "}
                    <Terms
                      openIt={openTerms}
                      closeIt={closeTerms}
                      isopen={termsOpen}
                    />
                  </Label>
                </div>
              </div>
              <div className="form-button">
                {/** TODO: Bring this back when we're ready to allow user registration... */}
                <Button
                  className="button-default-w"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Register
                </Button>
              </div>

            </Form>
          </TabPanel>
        </TabContext>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
