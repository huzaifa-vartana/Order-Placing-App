import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { supabase } from "../Config/Client";
import { format } from "date-fns";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function ViewAllOrders() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrdersFromDB();
  }, []);

  const fetchOrdersFromDB = async () => {
    let { data } = await supabase.from("ORDERS").select(
      `
    *,
    ORDER_ITEMS (
      ORDER_ID
    )
  `
    );
    console.log(data);
    setOrderDetails(data);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="right">Delivery Address</StyledTableCell>
            <StyledTableCell align="right">Order Taker Name</StyledTableCell>
            <StyledTableCell align="right">Delivery Date</StyledTableCell>
            <StyledTableCell align="right">Total Price&nbsp;($)</StyledTableCell>
            <StyledTableCell align="right">Order Items Count</StyledTableCell>
            <StyledTableCell align="right">Created At</StyledTableCell>
            <StyledTableCell align="right">Updated At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails.map((row) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {row.CUSTOMER_NAME}
              </StyledTableCell>
              <StyledTableCell align="right">{row.DELIVERY_ADDRESS}</StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_TAKER_NAME}</StyledTableCell>
              <StyledTableCell align="right">
                {format(new Date(row.DELIVERY_DATE), "dd-MMM-yy")}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_TOTAL_PRICE}</StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_ITEMS.length}</StyledTableCell>
              <StyledTableCell align="right">
                {format(new Date(row.CREATED_AT), "dd-MMM-yy hh:mm:ss ")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {format(new Date(row.UPDATED_AT), "dd-MMM-yy hh:mm:ss")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
