import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
export default function EnquiryCategoryPopCard(props) {
  const { color, title, unit, ton, amount } = props;
  return (
    <Card sx={{ width: "100%", marginTop: "20px" }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            gutterBottom
            style={{ marginBottom: "0px", paddingTop: "0px" }}
          >
            <span
              style={{
                color: color,
              }}
            >
              {title}
            </span>{" "}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Units : {unit} | Tons : {ton}{" "}
          </Typography>
        </Box>

        <Box>
          <Typography
            style={{
              color: "green",
            }}
          >
            ₹ {amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
