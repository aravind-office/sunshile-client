import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button, Grid } from "@mui/material";
import SelectInput from "../components/SelectInput";

export default function ProductDetails() {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", padding: "10px 20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <img
            style={{
              width: "100%",
            }}
            src={`https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D`}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={"product"}
            // loading="lazy"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SelectInput title="Choose Particular" />
          <SelectInput title="Choose Quantity" />
          <Button
            size="small"
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Order Now
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
