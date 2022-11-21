import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Fileupload from "./fileupload/Fileupload";

function AddCategory(props) {
  const { setFile, onCategoryHandler } = props;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="lastName"
            name="name"
            label="Product Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onCategoryHandler}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="lastName"
            name="unit"
            label="Unit"
            type={"number"}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onCategoryHandler}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="lastName"
            name="ton"
            type={"number"}
            label="Ton"
            fullWidth
            onChange={onCategoryHandler}
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="lastName"
            name="amount"
            type={"number"}
            label="Price"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onCategoryHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddCategory;
