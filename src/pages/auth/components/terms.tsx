import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";
import { Fragment } from "react";
import { Star } from "react-feather";

function Terms({
  openIt,
  closeIt,
  isopen,
}: {
  openIt: any;
  closeIt: any;
  isopen: boolean;
}) {
  //   const [isopen, setIsopen] = useState(open);
  return (
    <Fragment>
      <span onClick={openIt}>
        <a href="#">Terms &amp; Conditions</a>
      </span>
      <Dialog fullWidth open={isopen} onClose={closeIt}>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
          <h5>In Summary</h5>
          <hr />
          <List>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                You're definitely at least 13 years old.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                Anything you list can and will be used to promote your brand to
                our customer base.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>
                We don't inspect or handle any of your goods, We only provide
                the means to make a sale.
              </ListItemText>
            </ListItem>
            {/* <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Our system will help with customer service disputes, but if our team needs to step in we will.</ListItemText>
            </ListItem> */}
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Don't steal our code.</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ color: "aqua" }}>
                <Star />
              </ListItemIcon>
              <ListItemText>Seriously.</ListItemText>
            </ListItem>
          </List>
          <hr />
          <h4>
            THIS IS JUST AN EXAMPLE OF A TERMS OF SERVICE, BUT STILL BY SIGNING
            IT YOU AGREE TO DRESS AS MICHEAL SCOTT FOR HALLOWEEN
          </h4>
          <p>
            Codex Studios may modify these Terms of Use at any time without
            notice, effective upon posting updated Terms to the Website. Your
            continued use of the Website constitutes your acceptance to the
            updated Terms of Use. Swank LLC has the right, but is not obligated,
            to strictly enforce the Terms of Use through self-help, community
            moderation, active investigation, litigation and prosecution.
          </p>
          <span>
            <strong>1. Introduction</strong>
            <p>
              Welcome to [Your Service Name] ("Service"). These Terms of Service
              ("Terms") govern your use of our Service provided by [Your Company
              Name] ("Company", "we", "us", or "our"). By accessing or using our
              Service, you agree to be bound by these Terms and our Privacy
              Policy. If you do not agree to these Terms, you may not use the
              Service.
            </p>
          </span>

          <span>
            <strong>2. Service Description</strong>
            <p>
              [Your Service Name] is a [brief description of what your service
              does].
            </p>
          </span>

          <span>
            <strong>3. User Accounts</strong>
            <p>
              3.1 To access certain features of the Service, you may be required
              to create an account. You agree to provide accurate and complete
              information and keep this information up to date.
            </p>
            <p>
              3.2 You are responsible for maintaining the confidentiality of
              your account and password and for restricting access to your
              computer or device.
            </p>
          </span>

          <span>
            <strong>4. Use of Service</strong>
            <p>
              4.1 You agree to use the Service only for lawful purposes and in
              accordance with these Terms.
            </p>
            <p>
              4.2 The Company reserves the right to modify or discontinue,
              temporarily or permanently, the Service (or any part thereof) with
              or without notice.
            </p>
          </span>

          <span>
            <strong>5. Intellectual Property Rights</strong>
            <p>
              5.1 All intellectual property rights in the Service and its
              content are owned by or licensed to the Company.
            </p>
            <p>
              5.2 You are granted a limited, non-exclusive, non-transferable
              license to access and use the Service for your personal,
              non-commercial purposes.
            </p>
          </span>

          <span>
            <strong>6. User Conduct</strong>
            <p>6.1 You agree not to use the Service to:</p>
            <p>
              a. Upload or distribute any content that is unlawful, defamatory,
              obscene, harassing, threatening, or otherwise objectionable.
            </p>
            <p>
              b. Infringe the rights of others, including intellectual property
              rights.
            </p>
            <p>c. Transmit viruses, malware, or any other malicious code.</p>
            <p>
              d. Engage in any activity that could damage or interfere with the
              Service.
            </p>
          </span>

          <span>
            <strong>7. Termination</strong>
            <p>
              7.1 We may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any reason,
              including without limitation if you breach these Terms.
            </p>
          </span>

          <span>
            <strong>8. Disclaimer of Warranties</strong>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
              The Company expressly disclaims all warranties of any kind,
              whether express or implied.
            </p>
          </span>

          <span>
            <strong>9. Limitation of Liability</strong>
            <p>
              The Company shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the Service.
            </p>
          </span>

          <span>
            <strong>10. Governing Law</strong>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction] without regard to its conflict of
              law provisions.
            </p>
          </span>

          <span>
            <strong>11. Changes to Terms</strong>
            <p>
              We reserve the right to modify these Terms at any time. Your
              continued use of the Service following the posting of any changes
              to these Terms constitutes acceptance of those changes.
            </p>
          </span>

          <span>
            <strong>12. Contact Information</strong>
            <p>
              If you have any questions about these Terms, please contact us at
              [Your Contact Information].
            </p>
          </span>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={closeIt}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default Terms;
