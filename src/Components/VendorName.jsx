import React, { useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FreeSolo({ products, parentFunction }) {
  const [vendors, setVendors] = React.useState([]);
  const [value, setValue] = React.useState("");
  const nameRef = useRef();

  // useEffect(() => {
  //   sendDataToParent();
  // }, [value]);

  // const sendDataToParent = async () => {
  //   await parentFunction(value);
  // };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={products.map((option) => option.NAME)}
        sx={{ width: 300 }}
        onChange={(event) => {
          console.log(event.target.value);
        }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
}
