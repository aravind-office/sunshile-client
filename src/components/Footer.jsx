import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      style={{
        backgroundColor: "#f2f2f2",
        p: 6,
        marginTop: "10px",
      }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        {/* Sunshine International */}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Design maintained by Master's Enterprises
        {/* No.7/6, Kolappakam , Nedukundram Village,Vandalur */}
        <br />
        +91 7845959905
        {/* Kelampakkam Main Road,Chennai - 600 048 */}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        {/* Design maintained */}
        <Link color="inherit" to="/">
          Master enterprises
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
export default Footer;
