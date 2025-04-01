import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AddNewProduct } from "./Components/AddNewProduct";
import PlaceOrderComponent from "./Components/PlaceOrderComponent";
import { ViewAllOrders } from "./Components/ViewAllOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceOrderComponent />} />
        <Route path="/add" element={<AddNewProduct />} />
        <Route path="/view" element={<ViewAllOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
