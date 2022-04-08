import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SignUp from "./SignUpForm";
import SignIn from "./SignInForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignUpModal() {
  const [SignUpOpen, setSignUpOpen] = React.useState(false);
  const handleSignUPOpen = () => setSignUpOpen(true);
  const handleSignUPClose = () => setSignUpOpen(false);

  return (
    <div>
      <Button onClick={handleSignUPOpen}>Sign UP</Button>
      <Modal
        open={SignUpOpen}
        onClose={handleSignUPClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignUp handleSignUPClose={handleSignUPClose} />
        </Box>
      </Modal>
    </div>
  );
}
