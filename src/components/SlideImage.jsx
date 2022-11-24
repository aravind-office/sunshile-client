import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function SlideImage(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/one.jpeg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      url: "/assets/dashboard/two.jpeg",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/three.jpeg",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/four.jpeg",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/five.jpeg",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/six.jpeg",
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      url: "/assets/dashboard/seven.jpeg",
    },
  ];

  return (
    <div
      style={{
        marginTop: "40px",
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
          height: "400px",
        }}
        src={props.item.url}
      />
    </Paper>
  );
}
export default SlideImage;
