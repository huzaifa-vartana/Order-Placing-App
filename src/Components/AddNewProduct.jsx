import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Config/Client";

export const AddNewProduct = () => {
  const navigate = useNavigate();
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productUnitRef = useRef();

  const submit = async (e) => {
    e.preventDefault();
    const product = {
      NAME: productNameRef.current.value,
      UNIT: productUnitRef.current.value,
      PRICE: productPriceRef.current.value,
    };

    const { error } = await supabase.from("PRODUCTS").insert([product]);
    if (!error) {
      productNameRef.current.value = "";
      productUnitRef.current.value = "";
      productPriceRef.current.value = "";
      navigate("/");
      return;
    }
    alert("Error Occurred");
  };
  return (
    <form onSubmit={submit}>
      <h3>Add New Product</h3>
      <div className="row form-group">
        <label className="col-sm-2  col-sm-form-label">Name:</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            ref={productNameRef}
            minLength="2"
            placeholder="Minimum Name Length: 2"
            required
          />
        </div>
      </div>

      <div className="row form-group">
        <label className="col-sm-2  col-sm-form-label">Price:</label>
        <div className="col-sm-10">
          <input
            type="number"
            min="1"
            step="0.01"
            className="form-control"
            ref={productPriceRef}
            placeholder="Minimum Price: 1"
            required
          />
        </div>
      </div>

      <div className="row form-group">
        <label className="col-sm-2  col-sm-form-label">Unit:</label>
        <div className="col-sm-10">
          <input
            type="text"
            minLength="2"
            className="form-control"
            ref={productUnitRef}
            placeholder="Minimum Unit Length: 2"
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="offset-2 col-10">
          <button className="btn btn-outline-primary">Add Product to Inventory</button>
        </div>
      </div>

      <hr />
    </form>
  );
};
