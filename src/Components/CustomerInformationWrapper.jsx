import React, { useState, useEffect, useRef } from "react";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  Input,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Badge } from "react-bootstrap";
import { DatePickerWrapper } from "./DatePicker";
import { format } from "date-fns";
import { supabase } from "../Config/Client";

import { GridComponent } from "./GridComponent";
import TableComponent from "./TableComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomerInformationWrapper(props) {
  const customerNameRef = useRef();
  const customerAddressRef = useRef();
  const deliveryDateRef = useRef();
  const orderTakerNameRef = useRef();

  const [products, setProducts] = useState([]);
  const [delDate, setdelDate] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let { data } = await supabase.from("PRODUCTS").select("*").order("ID", { ascending: true });
    setProducts(data);
  };

  const onSubmit = async (values) => {
    handleUpload(values);
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
    return errors;
  };

  const handleImageChange = async (e) => {};

  const getData = async (date) => {
    setdelDate(date);
  };
  const handleUpload = async (values) => {
    console.log(values, format(delDate, "dd-MMM-yy"));
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
                      sendData={getData}
                      component={DatePickerWrapper}
                      label="Delivery Date"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 16 }}>
                    {products.length > 0 && (
                      <TableComponent products={products.length > 0 && products} />
                    )}
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
