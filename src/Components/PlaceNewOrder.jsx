import { render } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";

import CustomerInformationWrapper from "./CustomerInformationWrapper";

export default function PlaceNewOrder() {
  function OrderForm() {
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState();

    const nameRef = useRef();
    const numRef = useRef();
    const cityRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const imgRef = useRef();
    const catRef = useRef();

    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [vDetails, setVDetails] = useState([]);
    const [lat, setLat] = useState("");
    const [vendors, setVendors] = useState([]);

    const [lng, setLng] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {};

    const handleImageChange = (e) => {};
    function sendEmail() {}
    const handleUpload = () => {
      setError("Vendor Registered");
      nameRef.current.value = "";
      numRef.current.value = "";
      cityRef.current.value = "";
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
      }
      console.log(nameRef.current.value);
      if (nameRef.current.value) {
        handleUpload();
      }

      setValidated(true);
    };

    return (
      <>
        <CustomerInformationWrapper />
      </>
    );
  }
  return (
    <>
      <OrderForm />
    </>
  );
}
