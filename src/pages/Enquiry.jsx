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
} from "@mui/material";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { toast } from "react-toastify";
import { apiUrl } from "../components/config/apiConfig";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "../components/FilterDialog";
import DateRangePickerCus from "../components/DateRangePickerCus";
import ShowCategories from "../components/ShowCategories";
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
  const token = localStorage.getItem("token");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [enquiry, setEnquiry] = React.useState();
  const [showFilter, setShowFilter] = React.useState(false);
  const [filterBy, setFilterBy] = React.useState(1);
  const [filterOpn, setFilterOpn] = React.useState(null);
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
  }, [page, rowsPerPage]);

  const getAllEnquiry = () => {
    axios
      .get(`${apiUrl}/admin/enquiry/${page + 1}/${rowsPerPage}?${filterOpn}`, {
        headers: {
          Authorization: token,
        },
      })
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
        } else {
          toast.warn(message);
        }
      });
  };

  const onChangeStatus = (e, eqId) => {
    // const stat = e === "COMPLETED" ? "PENDING" : "COMPLETED";
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
        } else {
          toast.warn(message);
        }
      });
  };

  const onSearchHandler = (filterByVal) => {
    if (filterByVal === "status") {
      setFilterOpn({ name: "status", val: "PENDING" });
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          padding: "10px",
        }}
      ></div>
      <Typography variant="h6">Enquiry List</Typography>
      {/* <div
        style={{
          marginTop: "20px",
          // width: "300px",
        }}
      >
        {filterBy === "Contact" ? (
          <TextField
            id="standard-basic"
            label="Mobile Number"
            variant="outlined"
            size="small"
          />
        ) : filterBy === "Status" ? (
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
      </div> */}
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

                  {column.label === "DateTime" ||
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
                  )}
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
      {console.log(showCategory?.data)}
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
