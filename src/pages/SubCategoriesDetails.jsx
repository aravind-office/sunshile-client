import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
function SubCategoriesDetails(props) {
  const navigate = useNavigate();
  const { name, amount, image, categoryId, productId, ton, unit } = props?.data;
  const { open, onClose } = props;
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [unitCal, setUnit] = React.useState(unit);

  const [tonCal, setTon] = React.useState(ton);

  React.useEffect(() => {
    if (!unitCal) {
      setUnit(unit);
    }

    if (!tonCal) {
      setTon(ton);
    }
  }, [props.data]);

  const amountCal = () => {
    // unit 2 = 380
    if (unit === unitCal) {
      return amount;
    } else {
    }
    if (ton === tonCal) {
      return amount;
    }
  };
  // 1 2=10
  // unit-2

  // ton :4
  // 1.5 3 = 25

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{name}</DialogTitle> */}
        <DialogContent>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  display: "inline-block",
                  objectFit: "content",
                  // flex: 1,
                }}
                src={image?.previewUrl}
              />
            </div>
            <div
              style={{
                flex: 1,
                // padding: "5px 20px",
              }}
            >
              <br />
              <Grid
                container
                spacing={3}
                style={{
                  paddingTop: "0px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{
                    paddingTop: "0px",
                  }}
                >
                  <Typography
                    gutterBottom
                    style={{ marginBottom: "0px", paddingTop: "0px" }}
                  >
                    {name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "0px", paddingTop: "20px" }}
                >
                  <TextField
                    required
                    id="lastName"
                    name="unit"
                    label="Unit"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={unitCal}
                    // onChange={onCategoryHandler}
                  />
                </Grid>{" "}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "0px", paddingTop: "20px" }}
                >
                  <TextField
                    required
                    id="lastName"
                    name="ton"
                    label="Ton"
                    fullWidth
                    value={tonCal}
                    autoComplete="family-name"
                    variant="standard"
                  />
                </Grid>
              </Grid>
              {/* {amount} <br /> */}
              <Grid
                item
                xs={12}
                sm={12}
                style={{ marginBottom: "0px", paddingTop: "20px" }}
              >
                <Typography
                  style={{
                    color: "green",
                  }}
                >
                  Amount : Rs.{amount}
                </Typography>
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            close
          </Button>
          <Button
            onClick={() => navigate(`/enquiry-form/${categoryId}`)}
            autoFocus
          >
            Enquiry Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SubCategoriesDetails;
