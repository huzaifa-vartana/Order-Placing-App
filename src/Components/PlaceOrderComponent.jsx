import React, { useState, useEffect, useRef } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import Alert from "@mui/material/Alert";
import { Typography, Grid, Button, CssBaseline } from "@material-ui/core";

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
  const [grandTotal, setGrandTotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorPlacingOrder, setErrorPlacingOrder] = useState(false);

  const [userInformation, setUserInformation] = useState({});

  const [customerInformationPreSet, setCustomerInformationPreSet] = useState({});

  const getOrderItemsFromChild = async (rowID, updatedQuantity, orderItemObject) => {
    const existingProduct = orderItems && orderItems.find((product) => product.rowID == rowID);
    if (!!!existingProduct) {
      return setOrderItems((prevState) => [...prevState, orderItemObject]);
    }
    setOrderItems(
      orderItems.map((product) =>
        product.rowID === rowID ? { ...product, quantity: updatedQuantity } : product
      )
    );
  };

  useEffect(() => {
    fetchProductsFromDB();
    setUserInformation(JSON.parse(localStorage.getItem("userInformation")));
    setCustomerInformationPreSet(JSON.parse(localStorage.getItem("userInformation")));
  }, []);

  const fetchProductsFromDB = async () => {
    let { data } = await supabase.from("PRODUCTS").select("*").order("ID", { ascending: true });
    setProducts(data);
  };

  const onSubmit = async (values) => {
    setOrderPlaced(false);
    setErrorPlacingOrder(false);
    if (!deliveryDate) {
      return alert("Set Date Before Placing Order");
    }
    if (grandTotal <= 0) {
      return alert("Buy Some Products to Place the Order");
    }
    const orderConfirmationStatus = window.confirm(
      `Total price for the order is Rs. ${grandTotal}. Press 'OK' to order it or press 'Cancel'`
    );
    if (orderConfirmationStatus) {
      let payload = {
        CUSTOMER_NAME: values.CustomerName,
        DELIVERY_ADDRESS: values.CustomerAddress,
        ORDER_TAKER_NAME: values.OrderTakerName,
        DELIVERY_DATE: deliveryDate,
      };
      setButtonDisabled(true);
      const { data, error } = await supabase.from("ORDERS").insert([payload]);
      if (!error) {
        let orderItemsArray = [];

        for (const key in orderItems) {
          if (orderItems.hasOwnProperty(key)) {
            orderItemsArray.push({
              ORDER_ID: data[0].ID,
              PRODUCT_NAME: orderItems[key].name,
              PRODUCT_UNIT: orderItems[key].unit,
              PRODUCT_UNIT_PRICE: parseInt(orderItems[key].price),
              QUANTITY: parseInt(orderItems[key].quantity),
              TOTAL: parseInt(orderItems[key].quantity * orderItems[key].price),
            });
          }
        }

        const responseFromServer = await supabase.from("ORDER_ITEMS").insert(orderItemsArray);
        if (!responseFromServer.error) {
          setButtonDisabled(false);
          setOrderPlaced(true);
          localStorage.setItem("userInformation", JSON.stringify(payload));
          return;
        }
        setErrorPlacingOrder(true);
      }
      setErrorPlacingOrder(true);
      setButtonDisabled(false);
    }
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

  const getDeliveryDate = (date) => {
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
        {orderPlaced && (
          <Alert
            style={{
              textAlign: "center",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            severity="success"
          >
            Order Placed!
          </Alert>
        )}
        {errorPlacingOrder && (
          <Alert
            style={{
              textAlign: "center",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            severity="error"
          >
            Error Occured while Placing Order - Try Again
          </Alert>
        )}
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
                      initialValue={
                        customerInformationPreSet && customerInformationPreSet.CUSTOMER_NAME
                      }
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
                      initialValue={
                        customerInformationPreSet && customerInformationPreSet.DELIVERY_ADDRESS
                      }
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
                      initialValue={
                        customerInformationPreSet && customerInformationPreSet.ORDER_TAKER_NAME
                      }
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
                          <ProductRowClone
                            id="row1"
                            handleOrderItems={getOrderItemsFromChild}
                            products={products}
                          />
                          <ProductRowClone
                            id="row2"
                            handleOrderItems={getOrderItemsFromChild}
                            products={products}
                          />
                          <ProductRowClone
                            id="row3"
                            handleOrderItems={getOrderItemsFromChild}
                            products={products}
                          />
                          <ProductRowClone
                            id="row4"
                            handleOrderItems={getOrderItemsFromChild}
                            products={products}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Tooltip title="Value Rounded Off" placement="right-start">
                      <div align="right">
                        Grand Total (Hover):
                        {Math.round(
                          orderItems.reduce((sum, i) => (sum += i.quantity * i.price), 0)
                        ).toFixed(2)}
                        {setGrandTotal(
                          Math.round(
                            orderItems.reduce((sum, i) => (sum += i.quantity * i.price), 0)
                          ).toFixed(2)
                        )}
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item style={{ marginTop: 10, flex: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={buttonDisabled}
                    >
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
