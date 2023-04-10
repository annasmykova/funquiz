import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

const Footer = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        FunQuiz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer
