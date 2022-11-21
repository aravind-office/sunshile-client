import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Fileupload from "./fileupload/Fileupload";

function AddProductForm(props) {
  const { setFile, setPname, pName } = props;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <Button variant="contained" component="label">
            Upload File */}
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            accept="image/*"
          />
          {/* <Fileupload /> */}
          {/* </Button> */}
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="lastName"
            name="pName"
            label="Product Name"
            value={pName}
            onChange={(e) => setPname(e.target.value)}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddProductForm;
