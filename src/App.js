import "./App.css";
import PlaceOrderComponent from "./Components/PlaceOrderComponent";
import { AddNewProduct } from "./Components/AddNewProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ViewAllOrders } from "./Components/ViewAllOrders";
function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={PlaceOrderComponent} />
          <Route path="/add" exact component={AddNewProduct} />
          <Route path="/view" exact component={ViewAllOrders} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
