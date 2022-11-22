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
import EnquiryCategoryPopCard from "./EnquiryCategoryPopCard";

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
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    variant="h5"
                    style={{ marginBottom: "10px", paddingTop: "0px" }}
                  >
                    {name}
                  </Typography>
                </Grid>
                <EnquiryCategoryPopCard
                  color="#1890ff"
                  title="Actual"
                  unit={unit}
                  ton={ton}
                  amount={amount.toFixed(2)}
                />
                <EnquiryCategoryPopCard
                  color="red"
                  title="Enquiry"
                  unit={props?.data?.unit ? props?.data?.unit : 0}
                  ton={props?.data?.ton ? props?.data?.ton : 0}
                  amount={
                    props?.data?.amount ? props?.data?.amount.toFixed(2) : 0
                  }
                />
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
