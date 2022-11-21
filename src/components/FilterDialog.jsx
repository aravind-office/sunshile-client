import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from "@mui/material";
import DateRangePickerCus from "./DateRangePickerCus";

export default function FilterDialog(props) {
  const { open, onClose, submit } = props;
  const [filterBy, setFilterBy] = React.useState(1);
  const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return (
    <div>
      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Filter</DialogTitle>
        <DialogContent
          style={{
            marginTop: "0px",
            // padding: "0px",
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: "400px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Filter by
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              label="Age"
            >
              <MenuItem value={1}>Mobile Number</MenuItem>
              <MenuItem value={2}>Status</MenuItem>
              <MenuItem value={3}>Date</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: "400px" }}>
            {filterBy === 1 ? (
              <TextField
                id="standard-basic"
                label="Mobile Number"
                variant="standard"
              />
            ) : filterBy === 2 ? (
              <>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={filterBy}
                  // onChange={(e) => setFilterBy(e.target.value)}
                  label="Age"
                >
                  <MenuItem value={1}>Pending</MenuItem>
                  <MenuItem value={2}>Completed</MenuItem>
                </Select>
              </>
            ) : (
              <DateRangePickerCus />
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            close
          </Button>
          <Button onClick={submit} autoFocus>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
