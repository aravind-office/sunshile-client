import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../components/config/apiConfig";
import { toast } from "react-toastify";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
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

export default function EnquiryForm() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const location = useLocation();
  const data = JSON.parse(location?.state);
  console.log(data, "state");
  const [enquiryFormData, setEnquiryFormData] = React.useState();

  const onChangeHandler = (e) => {
    setEnquiryFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onEnquiryApiHandler = () => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (
      !enquiryFormData?.firstName ||
      !enquiryFormData?.lastName ||
      !enquiryFormData?.enquiry ||
      !enquiryFormData?.pincode
    ) {
      toast.info("Please fill required field");
    } else if (
      !enquiryFormData?.mobileNo ||
      !re.test(enquiryFormData?.mobileNo)
    ) {
      toast.info("Please provide valid contact number");
    } else if (
      !enquiryFormData?.email ||
      !enquiryFormData?.email.match(validRegex)
    ) {
      toast.info("Please provide valid email");
    } else {
      const req = {
        ...enquiryFormData,
        pincode: Number(enquiryFormData?.pincode),
        categoryId,
        unit: data?.unit,
        ton: data?.ton,
        amount: data?.amount,
      };
      axios.post(`${apiUrl}/enquiry`, req).then((res) => {
        const { status, message, data } = res.data;
        if (status === 201) {
          toast.success("Enquiry sent successfully");
          navigate(`/`);
        } else {
          toast.warn(message);
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/products/${data?.productId}`)}
            style={{
              // marginTop: "50px",
              display: "flex",
              justifyContent: "left",
            }}
          >
            Back{" "}
          </Button>{" "}
          <Typography component="h1" variant="h4" align="center">
            Enquiry
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  value={enquiryFormData?.firstName}
                  label="First name"
                  fullWidth
                  onChange={onChangeHandler}
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  value={enquiryFormData?.lastName}
                  name="lastName"
                  label="Last name"
                  onChange={onChangeHandler}
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  value={enquiryFormData?.mobileNo}
                  name="mobileNo"
                  label="Contact Number"
                  onChange={onChangeHandler}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  value={enquiryFormData?.email}
                  name="email"
                  type={"email"}
                  onChange={onChangeHandler}
                  label="Email Address"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  type={"number"}
                  value={enquiryFormData?.pincode}
                  name="pincode"
                  label="Postal code"
                  onChange={onChangeHandler}
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Enquiry"
                  value={enquiryFormData?.enquiry}
                  name="enquiry"
                  onChange={onChangeHandler}
                  fullWidth
                  multiline
                  required
                  rows={4}
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={onEnquiryApiHandler}
                sx={{ mt: 3, ml: 1 }}
              >
                Submit
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
