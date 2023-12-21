import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Centered from "../../../common/centered";
import forgotPass from "../../assets/images/dashboard/forgot-password.png";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { toast } from "react-toastify";
// import { requestPassReset } from "../api/auth";
function ResetForm(props:any) {
    const [isloading, setisloading] = useState(false)
    const [email, setEmail] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
  const handleEmail = () => {};
  const requestReset = (e: { preventDefault: () => void; }) => {
      setisloading(true)
      e.preventDefault()

      if(email.length < 3){
          toast.info('Please enter an email before requesting a link')
          setisloading(false)
          return
      }
      // requestPassReset(email).then(res=> {
      //   setisloading(false)
      //   setIsSuccess(true)

      // }).catch(err=> {
      //   setisloading(false)
      //   console.log(err)
      //     toast.error('Something went wrong when trying to generate your link')
      // })
      //if email not exists.. say it. We can't blah...
  };
  return (
    <Centered>
      {!isSuccess ? <Box className="slide-right-fade-in" p={5}>
        <img src={forgotPass} style={{ width: "100px" }} />
        <Typography marginY={5} variant={"h5"}>Reset Password Form</Typography>
        <Typography variant={"body1"}>
          Please enter your email and we'll send you a reset link ASAP!
        </Typography>
        <Form className="form-horizontal auth-form" onSubmit={requestReset}>
          <FormGroup>
            <Input
              required={true}
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email here"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type={"submit"} style={{ minWidth: 140 }}>
            {isloading ? (
              <Spinner animation="border" variant="light"></Spinner>
            ) : (
              "Get Link"
            )}
          </Button>
        </Form>
      </Box> :
      <Box>
        <Typography variant="overline">Email reset link successfully sent</Typography>
        </Box>}
    </Centered>
  );
}

export default ResetForm;
