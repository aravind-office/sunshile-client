import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../components/config/apiConfig";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "mobileNo", label: "Contact", minWidth: 100 },
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
];

export default function Enquiry() {
  const token = localStorage.getItem("token");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllEnquiry();
  }, []);

  const getAllEnquiry = () => {
    axios
      .get(`${apiUrl}/admin/enquiry/1/10`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const { status, message, data } = res.data;
        if (status === 200) {
          console.log(data);

          const res = data?.enquires?.content?.map((e) => {
            return {
              ...e,
              name: `${e.firstName} ${e.lastName}`,
              datetime: `${e.date} ${e.time}`,
            };
          });

          setRows(res);
        } else {
          toast.warn(message);
        }
      });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <Typography variant="h6">Enquiry List</Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
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
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
