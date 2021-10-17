import React, { useState, useEffect, useRef } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Typography, Grid, Button, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Badge } from "react-bootstrap";
import { DatePickerWrapper } from "./DatePicker";
import { supabase } from "../Config/Client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { ProductRowClone } from "./ProductRowClone";

export default function PlaceOrderComponent() {
  const customerNameRef = useRef();
  const customerAddressRef = useRef();
  const deliveryDateRef = useRef();
  const orderTakerNameRef = useRef();

  const [products, setProducts] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();
  const [orderDetails, setOrderDetails] = useState({});
  const [totalPrice, setTotalPrice] = React.useState(0);

  const [state, setState] = React.useState([]);

  const getData = async (index, val, object) => {
    const existingProduct = state && state.find((product) => product.rowID == index);
    if (!!!existingProduct) {
      // setOrderItems((prevState) => [...prevState, object]);
      return setState((prevState) => [...prevState, object]);
    }
    // setOrderItems((product) => (product.rowID === index ? { ...product, quantity: val } : product));
    setState(
      state.map((product) => (product.rowID === index ? { ...product, quantity: val } : product))
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let { data } = await supabase.from("PRODUCTS").select("*").order("ID", { ascending: true });
    setProducts(data);
  };

  const onSubmit = async (values) => {
    if (!deliveryDate) {
      return alert("Set Date Before Placing Order");
    }
    if (totalPrice <= 0) {
      return alert("Buy Some Products to Place the Order");
    }
    let payloadData = {
      customerName: values.CustomerName,
      CustomerAddress: values.CustomerAddress,
      OrderTakerName: values.OrderTakerName,
      deliveryDate: deliveryDate,
    };
    setOrderDetails(payloadData);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.CustomerName) {
      errors.CustomerName = "Required";
    }
    if (!values.CustomerAddress) {
      errors.CustomerAddress = "Required";
    }
    if (!values.OrderTakerName) {
      errors.OrderTakerName = "Required";
    }
    if (!values.del_date) {
      errors.del_date = "Required";
    }
    if (!deliveryDate) {
      errors.del_date = "Set Date";
    }
    return errors;
  };

  const getDeliveryDate = async (date) => {
    setDeliveryDate(date);
  };

  return (
    <>
      <div
        style={{
          padding: 16,
          margin: "auto",
          maxWidth: 1000,
        }}
      >
        <CssBaseline />

        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Place Order
          <Badge variant="danger">New</Badge>
        </Typography>
        <Typography variant="h5" align="center" component="h2" gutterBottom></Typography>

        <Form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
              }}
              Validate
            >
              <Paper style={{ padding: 16 }}>
                <Grid
                  container
                  alignItems="flex-start"
                  direction="row"
                  justify="flex-start"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      ref={customerNameRef}
                      name="CustomerName"
                      component={TextField}
                      type="text"
                      label="Customer Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      ref={customerAddressRef}
                      name="CustomerAddress"
                      component={TextField}
                      type="text"
                      label="Customer Address"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      ref={orderTakerNameRef}
                      name="OrderTakerName"
                      component={TextField}
                      type="text"
                      label="Order Taker Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      ref={deliveryDateRef}
                      name="del_date"
                      sendData={getDeliveryDate}
                      component={DatePickerWrapper}
                      label="Delivery Date"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 16 }}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Serial #</TableCell>
                            <TableCell align="right">Product Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Unit Price&nbsp;($)</TableCell>
                            <TableCell align="right">Total Price&nbsp;($)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <ProductRowClone id="row1" handlePrice={getData} products={products} />
                          <ProductRowClone id="row2" handlePrice={getData} products={products} />
                          <ProductRowClone id="row3" handlePrice={getData} products={products} />
                          <ProductRowClone id="row4" handlePrice={getData} products={products} />
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Tooltip title="Value Rounded Off" placement="right-start">
                      <div align="right">
                        Total Price (Hover):
                        {Math.round(
                          state.reduce((sum, i) => (sum += i.quantity * i.price), 0)
                        ).toFixed(2)}
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>

                  <Grid item style={{ marginTop: 16 }}>
                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    </>
  );
}
