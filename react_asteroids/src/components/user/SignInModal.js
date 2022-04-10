import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SignIn from "./SignInForm";
import SignUp from "./SignUpForm";

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

export default function SignInModal({ setUserLoggedIn }) {
  const [SignInOpen, setSignInOpen] = React.useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  return (
    <div>
      <Button onClick={handleSignInOpen}>Sign In</Button>
      <Modal
        open={SignInOpen}
        onClose={handleSignInClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignIn
            handleSignInClose={handleSignInClose}
            UserLoggedIn={setUserLoggedIn}
          />
        </Box>
      </Modal>
    </div>
  );
}
