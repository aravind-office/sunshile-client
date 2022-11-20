import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function SlideImage(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/sand.png",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      url: "/assets/SarsenStones.png",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/sand.png",
    },
  ];

  return (
    <div
      style={{
        marginTop: "70px",
      }}
    >
      <Carousel>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

function Item(props) {
  return (
    <Paper>
      <img
        style={{
          width: "100%",
          height: "300px",
        }}
        src={props.item.url}
      />
    </Paper>
  );
}
export default SlideImage;
