import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ProductRow } from "./ProductRow";

export default function TableComponent({ products }) {
  const [state, setState] = React.useState([]);

  const getData = async (index, val, object) => {
    const existingProduct = state && state.find((product) => product.rowID == index);
    if (!!!existingProduct) {
      return setState((prevState) => [...prevState, object]);
    }
    setState(
      state.map((product) => (product.rowID === index ? { ...product, quantity: val } : product))
    );
  };

  // React.useEffect(() => {
  //   for (const key in products) {
  //     if (Object.hasOwnProperty.call(products, key)) {
  //       products[key].quantity = 0;
  //     }
  //   }
  //   setState({
  //     products: products,
  //   });
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     // When local storage changes, dump the list to
  //     // the console.
  //     setCart(JSON.parse(localStorage.getItem("myCart")) || []);
  //   });
  // }, []);

  return (
    <>
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
            <ProductRow id="row1" handlePrice={getData} products={products} />
            <ProductRow id="row2" handlePrice={getData} products={products} />
            <ProductRow id="row3" handlePrice={getData} products={products} />
            <ProductRow id="row4" handlePrice={getData} products={products} />
          </TableBody>
        </Table>
      </TableContainer>
      <div align="right">
        Total Price:
        {state.reduce((sum, i) => (sum += i.quantity * i.price), 0)}
      </div>
    </>
  );
}
