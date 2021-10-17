import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const ProductRowClone = ({ products, handleOrderItems, id }) => {
  const quantityRef = React.useRef();
  const selectedProductRef = React.useRef();
  const [quantity, setQuantity] = React.useState(0);
  const [product, setProduct] = React.useState();

  const setSelectedProduct = (value) => {
    products &&
      products.map((productDetails) => {
        if (productDetails.NAME == value) {
          setProduct(productDetails);
        }
      });
  };

  return (
    <TableRow key={0} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {product && product.ID}
      </TableCell>
      <TableCell align="right">
        <select
          ref={selectedProductRef}
          onChange={(event) => {
            setSelectedProduct(event.target.value);
            setQuantity(0);
          }}
          name="Product Name"
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {products.map((product) => (
            <option key={product.ID} value={product.NAME}>
              {product.NAME}
            </option>
          ))}
          ;
        </select>
      </TableCell>
      <TableCell align="right">
        <input
          ref={quantityRef}
          min="0"
          type="number"
          value={quantity}
          onChange={(event) => {
            setQuantity(quantityRef.current.value);
            let payload = {
              id: product && product.ID,
              quantity: quantityRef.current && quantityRef.current.value,
              name: product && product.NAME,
              unit: product && product.UNIT,
              price: product && product.PRICE,
              rowID: id,
            };
            product && handleOrderItems(id, quantityRef.current.value, payload);
          }}
          name="quantity"
          id="quantity"
        />
      </TableCell>
      <TableCell align="right"> {product && product.UNIT}</TableCell>
      <TableCell align="right"> {product && +product.PRICE.toFixed(2)}</TableCell>
      <TableCell align="right">
        {quantity && product ? Math.round(quantity * product.PRICE).toFixed(2) : 0}
      </TableCell>
    </TableRow>
  );
};
