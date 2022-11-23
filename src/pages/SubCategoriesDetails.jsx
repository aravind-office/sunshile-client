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

function SubCategoriesDetails(props) {
  const navigate = useNavigate();
  const { name, amount, image, categoryId, productId, ton, unit } = props?.data;
  const { open, onClose } = props;

  const [unitCal, setUnit] = React.useState(unit);

  const [tonCal, setTon] = React.useState(ton);

  React.useEffect(() => {
    setUnit(unit);
    setTon(ton);
  }, [props]);


  const calUnit = (tonCal / ton) * unitCal;
  const calTon = (unitCal / unit) * tonCal;
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
                    type={"number"}
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={calUnit}
                    onChange={(e) => setUnit(e.target.value)}
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
                    type={"number"}
                    fullWidth
                    value={calTon}
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(e) => setTon(e.target.value)}
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
                  Amount : Rs.{((tonCal / ton) * unitCal * amount).toFixed(2)}
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
            onClick={() =>
              navigate(`/enquiry-form/${categoryId}`, {
                state: JSON.stringify({
                  amount: ((tonCal / ton) * unitCal * amount).toFixed(2),
                  ton: (unitCal / unit) * tonCal,
                  unit: (tonCal / ton) * unitCal,
                  productId,
                }),
              })
            }
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
