import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format, isValid } from "date-fns";
import React, { useEffect, useState } from "react";
import { supabase } from "../Config/Client";

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

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isValid(date) ? format(date, "dd-MMM-yy hh:mm:ss") : "Invalid Date";
};

export function ViewAllOrders() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrdersFromDB();
  }, []);

  const fetchOrdersFromDB = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase.from("ORDERS").select(
        `
        *,
        ORDER_ITEMS (
          ORDER_ID
        )
      `
      );
      
      if (error) throw error;
      setOrderDetails(data || []);
    } catch (err) {
      setError(err.message);
      setOrderDetails([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert severity="error">Error loading orders: {error}</Alert>
      </div>
    );
  }

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
          {Array.isArray(orderDetails) && orderDetails.map((row) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {row.CUSTOMER_NAME}
              </StyledTableCell>
              <StyledTableCell align="right">{row.DELIVERY_ADDRESS}</StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_TAKER_NAME}</StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(row.DELIVERY_DATE)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_TOTAL_PRICE}</StyledTableCell>
              <StyledTableCell align="right">{row.ORDER_ITEMS?.length || 0}</StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(row.CREATED_AT)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(row.UPDATED_AT)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
