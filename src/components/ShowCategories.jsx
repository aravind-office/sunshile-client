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

function ShowCategories(props) {
  const navigate = useNavigate();
  const { name, amount, picture, ton, unit } = props?.data?.category;
  const { open, onClose } = props;

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
                src={picture?.previewUrl}
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
                  <Typography
                    gutterBottom
                    style={{ marginBottom: "0px", paddingTop: "0px" }}
                  >
                    <span
                      style={{
                        color: "blue",
                      }}
                    >
                      Actual
                    </span>{" "}
                    |{" "}
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      Enquiry
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "0px", paddingTop: "20px" }}
                >
                  <Typography
                    gutterBottom
                    style={{ marginBottom: "0px", paddingTop: "0px" }}
                  >
                    Unit: {unit} | {props?.data?.unit}
                  </Typography>
                </Grid>{" "}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "0px", paddingTop: "20px" }}
                >
                  <Typography
                    gutterBottom
                    style={{ marginBottom: "0px", paddingTop: "0px" }}
                  >
                    Ton: {ton} | {props?.data?.ton}
                  </Typography>
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
                  Amount : Rs.{amount.toFixed(2)} | {props?.data?.amount}
                </Typography>
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowCategories;
