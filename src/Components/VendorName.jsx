import React, { useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import "./TestVendor.css";
export default function FreeSolo(props) {
  const [vendors, setVendors] = React.useState([]);
  const [value, setValue] = React.useState();
  const nameRef = useRef();
  useEffect(() => {
    sendDataToParent();
  }, [value]);

  const sendDataToParent = async () => {
    await props.parentFunction(value);
  };

  return (
    <div style={{}}>
      <Autocomplete
        freeSolo
        className="input-type-1"
        id="free-solo-2-demo"
        getOptionLabel={(option) => option.name}
        options={props.vendorData.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            required
            className="input-type-1"
            inputRef={nameRef}
            onChange={(e) => {
              setValue(e.target.value.trim());
              sendDataToParent();
            }}
            label="Customer Name"
            margin="normal"
            variant="standard"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </div>
  );
}
