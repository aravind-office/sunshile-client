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
import { Button, CardActions, Grid, Pagination } from "@mui/material";
import SelectInput from "../components/SelectInput";
import { useNavigate, useParams } from "react-router-dom";
import ResponsiveDialog from "../components/ResponsiveDialog";
import AddCategory from "../components/AddCategory";
import SubCategoriesDetails from "./SubCategoriesDetails";
import axios from "axios";
import { apiUrl } from "../components/config/apiConfig";
import { toast } from "react-toastify";
import { Stack } from "react-bootstrap";

import DeleteIcon from "@mui/icons-material/Delete";
export default function SubCategories() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const theme = useTheme();

  const [showAddProduct, setShowAddProduct] = React.useState(false);

  const [showProductDetails, setShowProductDetails] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState({});

  const [product, setProduct] = React.useState({});
  const [category, setCategory] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    getProductCategoryById();
  }, []);

  const getProductCategoryById = () => {
    if (id) {
      axios.get(`${apiUrl}/product/${id}`).then((res) => {
        const { status, message, data } = res.data;
        if (status === 200) {
          setProduct(data.product);
          setCategory(data.product.categories ? data.product.categories : []);
        } else {
          toast.warn(message);
          setProduct({});
          setCategory([]);
        }
      });
    }
  };

  const [file, setFile] = React.useState();
  const [categoryData, setCategoryData] = React.useState();

  const onCategoryHandler = (e) => {
    setCategoryData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addCategoryHandler = () => {
    if (!file) {
      toast.info("file is required");
    } else {
      const formData = new FormData();
      file ? formData.append("file", file) : "";
      axios.post(`${apiUrl}/file`, formData).then((res) => {
        const { status, message, data } = res.data;
        if (status === 201) {
          console.log(categoryData);
          addCategoryApi(data?.imageId);
        } else {
          toast.warn(message);
        }
      });
    }
  };

  const onCloseHandler = () => {
    setShowAddProduct(false);
    setFile("");
    setCategoryData();
  };

  const addCategoryApi = (imageId) => {
    axios
      .post(
        `${apiUrl}/admin/category`,
        {
          productId: id,
          imageId: imageId,
          name: categoryData?.name,
          unit: Number(categoryData?.unit),
          ton: Number(categoryData?.ton),
          amount: Number(categoryData?.amount),
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
          getProductCategoryById();
          toast.success(message);
          onCloseHandler();
        } else {
          toast.warn(message);
        }
      });
  };

  const onDeleteCategoryApi = (pId) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(`${apiUrl}/admin/category/${pId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const { status, message, data } = res.data;
          if (status === 200) {
            toast.success(message);
            getProductCategoryById();
          } else {
            toast.warn(message);
          }
        });
    }
  };
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "50px",
          padding: "10px 20px",
        }}
      >
        <div>
          <Typography variant="h6">Featured Product Category</Typography>
        </div>
        <div>
          {token && (
            <Button
              size="small"
              variant="contained"
              onClick={() => setShowAddProduct(true)}
            >
              Add Category
            </Button>
          )}
        </div>
      </div>
      <Card sx={{ padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={3} md={3}>
            <img
              style={{
                width: "100%",
              }}
              src={product?.image?.previewUrl}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"product"}
              // loading="lazy"
            />
            <div>{product?.name}</div>
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            {console.log(category.length)}
            {category.length === 0 ? (
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
              <Grid container spacing={4}>
                {category &&
                  category.map((card, index) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={card?.image?.previewUrl}
                          style={{
                            // width: "330px",
                            height: "200px",
                            objectFit: "contain",
                            position: "relative",
                          }}
                          alt="random"
                        />

                        {/* </CardMedia> */}
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{
                              // position: "absolute",
                              // top: "350px",
                              background:
                                "linear-gradient(180deg,rgba(0,0,0,0.0001) 0%,#00000 100%)",
                              opacity: "0.6",
                              mixBlendMode: "normal",
                              // color: "white",
                            }}
                          >
                            {card?.name}
                          </Typography>
                          <Typography>Unit : {card?.unit}</Typography>
                          <Typography>Ton : {card?.ton}</Typography>
                          {token && (
                            <Typography
                              style={{
                                color: "green",
                              }}
                            >
                              Rs. {card?.amount}
                            </Typography>
                          )}
                        </CardContent>

                        {token ? (
                          <CardActions
                            style={{
                              justifyContent: "space-around",
                              marginBottom: "10px",
                            }}
                          >
                            <Stack direction="row" spacing={2}>
                              <IconButton
                                style={{ color: "red" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteCategoryApi(card?.categoryId);
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
                        ) : (
                          <CardActions
                            style={{
                              justifyContent: "space-around",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography
                              style={{
                                color: "green",
                              }}
                            >
                              Rs. {card?.amount}
                            </Typography>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductDetails(card);
                                setShowProductDetails(true);
                                // navigate("/enquiry-form");
                              }}
                            >
                              Enquiry
                            </Button>
                          </CardActions>
                        )}
                      </Card>
                    </Grid>
                  ))}{" "}
              </Grid>
            )}
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
              }}
              page={page}
              onChange={handleChange}
              count={10}
              color="primary"
            />
          </Grid>
        </Grid>
      </Card>
      {productDetails && (
        <SubCategoriesDetails
          data={productDetails}
          open={showProductDetails}
          onClose={() => setShowProductDetails(false)}
        />
      )}
      <ResponsiveDialog
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        title="Add Category"
        content={
          <AddCategory
            setFile={setFile}
            onCategoryHandler={onCategoryHandler}
          />
        }
        submit={addCategoryHandler}
      />
    </>
  );
}
