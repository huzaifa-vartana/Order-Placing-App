import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../Config/Client";
import { Form, Button, Container, Row } from "react-bootstrap";
import { DatePickerWrapper } from "./DatePicker";
export const PlaceOrder = () => {
  const [products, setProducts] = useState([]);

  const customerNameRef = useRef(null);
  const customerAddressRef = useRef(null);
  const deliveryDate = useRef(null);
  const orderTakerName = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let { data } = await supabase.from("PRODUCTS").select("*");

    setProducts(data);
  };

  const confirmOrder = async () => {
    console.log(customerNameRef.current);
  };

  return (
    <Container>
      <Row>
        <h1> Place Order</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label ref={customerNameRef}>Customer Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Customer Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Delivery Date</Form.Label>
            <DatePickerWrapper />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Order Taker</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(event) => {
              event.preventDefault();
              confirmOrder();
            }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
