import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import { apiUrl } from "../../components/config/apiConfig";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [toast, setToast] = React.useState({
    open: false,
    msg: "",
    status: "info",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const req = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (req.email === "" || req.email === undefined || req.email === null) {
      setToast({ open: true, msg: "Email must be valid", status: "info" });
    } else if (
      req.password === "" ||
      req.password === undefined ||
      req.password === null
    ) {
      setToast({ open: true, msg: "Password must be valid", status: "info" });
    } else {
      axios
        .post(`${apiUrl}/login`, {
          userName: req.email,
          password: req.password,
        })
        .then((res) => {
          const { status, message, data } = res?.data;
          if (status === 200) {
            setToast({ open: true, msg: message, status: "success" });
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("token", `Bearer ${data.token}`);
            localStorage.setItem("username", req.email);

            navigate("/");
          } else {
            setToast({ open: true, msg: message, status: "info" });
          }
        })
        .catch((e) => {
          toast.error("Login is failed");
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LogIn
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        <Snackbar
          open={toast.open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={6000}
          onClose={() => setToast({ open: false, msg: "" })}
          //   TransitionComponent={transition}
          //   message={toast.msg}
          //   key={transition ? transition.name : ""}
        >
          <Alert
            severity={toast.status}
            onClose={() => setToast({ open: false, msg: "" })}
          >
            {toast.msg}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
