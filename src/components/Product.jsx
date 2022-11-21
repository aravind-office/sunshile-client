import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveDialog from "./ResponsiveDialog";
import AddProductForm from "./AddProductForm";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "./config/apiConfig";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Product() {
  const token = localStorage.getItem("token");
  const [page, setPage] = React.useState(0);
  const perPage = 8;

  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const totalCount = cards.length / 8;
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const [file, setFile] = React.useState();
  const [pName, setPname] = React.useState();

  React.useEffect(() => {
    getAllProduct();
  }, []);

  const addProductHandler = () => {
    if (!file || !pName) {
      toast.info("file / product name is required");
    } else {
      if (
        file?.type === "image/jpeg" ||
        file?.type === "image/jpg" ||
        file?.type === "image/png"
      ) {
        const fileCal = Math.round(file?.size / 1024 / 1024);
        if (fileCal >= 10) {
          toast.info(`File size must be less than 10mb`);
        } else {
          const formData = new FormData();
          file ? formData.append("file", file) : "";
          axios.post(`${apiUrl}/file`, formData).then((res) => {
            const { status, message, data } = res.data;
            if (status === 201) {
              addProductApi(data?.imageId);
            } else {
              toast.warn(message);
            }
          });
        }
      } else {
        toast.warn("Please you can upload file type .jpeg, .jpg, .png only.");
      }
    }
  };

  const addProductApi = (imageId) => {
    axios
      .post(
        `${apiUrl}/admin/product`,
        {
          name: pName,
          imageId: imageId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        const { status, message, data } = res.data;
        if (status === 201) {
          getAllProduct();
          toast.success(message);
          onCloseHandler();
          navigate(`products/${data?.product?.id}`);
        } else {
          toast.warn(message);
        }
      });
  };

  const getAllProduct = () => {
    axios.get(`${apiUrl}/product`).then((res) => {
      const { status, message, data } = res.data;
      if (status === 200) {
        setCards(data?.products);
      } else {
        toast.warn(message);
      }
    });
  };

  const onCloseHandler = () => {
    setShowAddProduct(false);
    setFile("");
    setPname("");
  };

  const onDeleteProdApi = (pId) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(`${apiUrl}/admin/product/${pId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const { status, message, data } = res.data;
          if (status === 200) {
            toast.success(message);
            getAllProduct();
          } else {
            toast.warn(message);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* <main> */}
      {/* <Container sx={{ py: 8 }} maxWidth="md"> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "50px",
        }}
      >
        <div>
          <Typography variant="h6">Featured Products</Typography>
        </div>
        <div>
          {token && (
            <Button
              size="small"
              variant="contained"
              onClick={() => setShowAddProduct(true)}
            >
              Add Product
            </Button>
          )}
        </div>
      </div>
      {/* End hero unit */}
      {cards.length === 0 ? (
        <>
          {" "}
          <img
            style={{
              width: "200px",
            }}
            src="/assets/norecord.png"
          ></img>
          <div>No product found . please add the product</div>
        </>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            // style={{
            //   width: "800px",
            // }}
          >
            {cards
              .slice(page * perPage, page * perPage + perPage)
              .map((card, index) => (
                <Grid item key={card} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "200px",
                      marginRight: "10px",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/products/${card.id}`)}
                  >
                    <CardMedia
                      component="img"
                      image={card?.image?.previewUrl}
                      style={{
                        // width: "330px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      alt="random"
                    />

                    <Typography gutterBottom variant="h5" component="h2">
                      {card?.name}
                    </Typography>
                    {token && (
                      <CardActions
                        style={{
                          marginTop: "0px",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <IconButton
                            style={{ color: "red" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteProdApi(card?.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          {/* <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setPname(card?.name);
                          setShowAddProduct(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton> */}
                        </Stack>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}

      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
        page={page + 1}
        onChange={handleChange}
        count={cards.length <= 8 ? 1 : Math.ceil(totalCount)}
        color="primary"
      />
      {/* </Container> */}
      {/* </main> */}
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}

      <ResponsiveDialog
        open={showAddProduct}
        onClose={onCloseHandler}
        title="Add Product"
        content={
          <AddProductForm setFile={setFile} setPname={setPname} pName={pName} />
        }
        submit={addProductHandler}
      />
    </ThemeProvider>
  );
}
