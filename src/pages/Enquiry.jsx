import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Typography,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popover,
  Backdrop,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { toast } from "react-toastify";
import { apiUrl } from "../components/config/apiConfig";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "../components/FilterDialog";
import DateRangePickerCus from "../components/DateRangePickerCus";
import ShowCategories from "../components/ShowCategories";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
const columns = [
  { id: "name", label: "Name" },
  { id: "mobileNo", label: "Contact", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pinCode",
    label: "PinCode",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "datetime",
    label: "DateTime",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "enquiry",
    label: "Enquiry",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "category",
    label: "Category",
  },
];

export default function Enquiry() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [enquiry, setEnquiry] = React.useState();
  const [filterOpn, setFilterOpn] = React.useState(null);
  const [searchOpn, setSearchOpn] = React.useState(null);
  const [showCategory, setShowCategory] = React.useState({
    status: false,
    data: {},
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllEnquiry();
  }, [page, rowsPerPage, searchOpn]);

  const onDateFormatChange = (objectDate) => {
    let day = objectDate.getDate();

    let month = objectDate.getMonth() + 1;

    let year = objectDate.getFullYear();
    return day + "-" + month + "-" + year;
  };
  const onSearchHandlerApi = () => {
    if (filterOpn?.mobileNo) {
      const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if (!re.test(filterOpn?.mobileNo)) {
        toast.info("Please provide valid contact number");
      } else {
        setSearchOpn(filterOpn);
      }
    } else {
      setSearchOpn(filterOpn);
    }
  };

  const getAllEnquiry = () => {
    const fStatus = searchOpn?.Status ? searchOpn?.Status : "all";
    const fContact = searchOpn?.mobileNo ? searchOpn?.mobileNo : "all";
    const fFrom = searchOpn?.from
      ? onDateFormatChange(new Date(searchOpn?.from))
      : "all";
    const fTo = searchOpn?.to
      ? onDateFormatChange(new Date(searchOpn?.to))
      : "all";
    axios
      .get(
        `${apiUrl}/admin/enquiry/${
          page + 1
        }/${rowsPerPage}?mobileNo=${fContact}&status=${fStatus}&from=${fFrom}&to=${fTo}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        const { status, message, data } = res.data;
        if (status === 200) {
          const res = data?.enquires?.content?.map((e) => {
            return {
              ...e,
              name: `${e.firstName} ${e.lastName}`,
              datetime: `${e.date} ${e.time}`,
            };
          });

          setRows(res);
          setEnquiry(data?.enquires);
        } else if (status === 401) {
          navigate(`/admin/login`);
          localStorage.clear();
        } else {
          toast.warn(message);
        }
      })
      .catch((e) => {
        toast.error("Fetch enquiry failed");
      });
  };

  const onChangeStatus = (e, eqId) => {
    axios
      .put(
        `${apiUrl}/admin/enquiry/${eqId}/${e}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        const { status, message, data } = res.data;
        if (status === 200) {
          toast.success(message);
          getAllEnquiry();
        } else if (status === 401) {
          navigate(`/admin/login`);
          localStorage.clear();
        } else {
          toast.warn(message);
        }
      })
      .catch((e) => {
        toast.error("Update enquiry failed");
      });
  };

  const onSearchHandler = (filterByVal, value) => {
    if (filterByVal === "Status") {
      setFilterOpn((prevState) => {
        return {
          ...prevState,
          [filterByVal]: value,
        };
      });
    } else if (filterByVal === "mobileNo") {
      setFilterOpn((prevState) => {
        return {
          ...prevState,
          [filterByVal]: value,
        };
      });
    } else if (filterByVal === "from") {
      setFilterOpn((prevState) => {
        return {
          ...prevState,
          from: value,
        };
      });
    } else if (filterByVal === "to") {
      setFilterOpn((prevState) => {
        return {
          ...prevState,
          to: value,
        };
      });
    }
  };
  const [showDownload, setShowDownload] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const onDownloadHandler = () => {
    const fFrom = fromDate
      ? onDateFormatChange(new Date(fromDate))
      : onDateFormatChange(new Date());
    const fTo = toDate
      ? onDateFormatChange(new Date(toDate))
      : onDateFormatChange(new Date());

    if (!fromDate && !toDate) {
      toast.info("From and To date is required");
    } else {
      axios
        .get(
          `${apiUrl}/admin/enquiry/export/?from=${fFrom}&to=${fTo}`,

          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          let csvContent = "data:text/csv;charset=utf-8," + res.data;
          var encodedUri = encodeURI(csvContent);
          window.open(encodedUri);
          setShowDownload(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            navigate(`/admin/login`);
            localStorage.clear();
          }
        });
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h6">Enquiry List</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          aria-describedby={"download"}
          onClick={
            () => {
              setShowDownload(true);
            }
            // onDownloadHandler()
          }
          endIcon={<DownloadIcon />}
        >
          Download
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showDownload}
        >
          <Card>
            <h5
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Download Entity
            </h5>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {" "}
                <span style={{ margin: "0px 8px 0px 10px" }}> From </span>
                <input
                  style={{
                    height: "39px",
                    borderRadius: "5px",
                    border: "1px solid #c4c4c4",
                    padding: "10px 15px",
                  }}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  type="date"
                />
                <span style={{ margin: "0px 10px" }}> To </span>
                <input
                  style={{
                    height: "39px",
                    borderRadius: "5px",
                    border: "1px solid #c4c4c4",
                    padding: "10px 15px",
                  }}
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </CardContent>

            <CardActions
              style={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setShowDownload(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={onDownloadHandler}
                endIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Backdrop>
      </div>

      <Card>
        <Grid
          container
          spacing={3}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
          }}
        >
          <Grid item xs>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contact
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                value={filterOpn?.mobileNo === "all" ? "" : filterOpn?.mobileNo}
                onChange={(e) => onSearchHandler("mobileNo", e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    {filterOpn?.mobileNo !== "all" && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setFilterOpn((prevState) => {
                            return {
                              ...prevState,
                              mobileNo: "all",
                            };
                          });
                          setSearchOpn((prevState) => {
                            return {
                              ...prevState,
                              mobileNo: "all",
                            };
                          });
                        }}
                        onMouseDown={() => {
                          setFilterOpn((prevState) => {
                            return {
                              ...prevState,
                              mobileNo: "all",
                            };
                          });
                          setSearchOpn((prevState) => {
                            return {
                              ...prevState,
                              mobileNo: "all",
                            };
                          });
                        }}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                label="Password"
              />{" "}
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterOpn?.Status}
                label="Age"
                // style={{
                //   display: "flex",
                //   justifyContent: "left",
                // }}
                onChange={(e) => onSearchHandler("Status", e.target.value)}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"PENDING"}>Pending</MenuItem>
                <MenuItem value={"COMPLETED"}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {" "}
              <span style={{ margin: "0px 8px 0px 10px" }}> From </span>
              <input
                style={{
                  height: "39px",
                  borderRadius: "5px",
                  border: "1px solid #c4c4c4",
                  padding: "10px 15px",
                }}
                value={filterOpn?.from}
                onChange={(e) => onSearchHandler("from", e.target.value)}
                type="date"
              />
              <span style={{ margin: "0px 10px" }}> To </span>
              <input
                style={{
                  height: "39px",
                  borderRadius: "5px",
                  border: "1px solid #c4c4c4",
                  padding: "10px 15px",
                }}
                value={filterOpn?.to}
                type="date"
                onChange={(e) => onSearchHandler("to", e.target.value)}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              marginRight: "10px",
              marginLeft: "-15px",
            }}
          >
            <Button variant="contained" onClick={() => onSearchHandlerApi()}>
              Search
            </Button>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              marginRight: "10px",
              marginLeft: "-15px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                location.reload();
                //   setFilterOpn(null)
                // setSearchOpn(null)
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}

                  {/* {column.label === "DateTime" ||
                  column.label === "Contact" ||
                  column.label === "Status" ? (
                    <IconButton
                      onClick={() => {
                        setFilterBy(column.label);
                        onSearchHandler(column.label);
                      }}
                    >
                      <FilterListIcon />
                    </IconButton>
                  ) : (
                    ""
                  )} */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows == "" || rows == undefined || rows == null ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ textAlign: "center" }}
                >
                  <img
                    style={{
                      width: "200px",
                    }}
                    src="/assets/norecord.png"
                  ></img>
                  <div>No enquiry found !</div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "status" ? (
                            <FormControl
                              variant="standard"
                              sx={{ m: 1, minWidth: 120 }}
                            >
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={value}
                                style={{
                                  color:
                                    value === "PENDING" ? "orange" : "green",
                                }}
                                onChange={(e) =>
                                  onChangeStatus(e.target.value, row.id)
                                }
                              >
                                <MenuItem value="PENDING">PENDING</MenuItem>
                                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                              </Select>
                            </FormControl>
                          ) : column.id === "category" ? (
                            <IconButton
                              onClick={() =>
                                setShowCategory({ status: true, data: row })
                              }
                            >
                              <RemoveRedEyeIcon />
                            </IconButton>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {showCategory.status && (
        <ShowCategories
          open={showCategory.status}
          data={showCategory?.data}
          onClose={() => setShowCategory({ status: false, data: {} })}
        />
      )}
      <TablePagination
        component="div"
        rowsPerPageOptions={[
          5,
          10,
          15,
          30,
          50,
          {
            value:
              rows === undefined
                ? 5
                : rows.length === 0
                ? 6
                : enquiry?.totalElements,
            label: "All",
          },
        ]}
        count={enquiry?.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
