import React from "react";

class GridComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.products, "working");

    //  this.state.products = [];
    this.state = [];
    this.state.filterText = "";
    this.state.products = this.props.products;
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0,
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleProductTable(evt) {
    console.log(evt);
    var item = {
      ID: evt.target.id,
      NAME: evt.target.name,
      UNIT: evt.target.value,
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
    //  console.log(this.state.products);
  }
  render() {
    return (
      <div>
        {/* <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
        /> */}
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}
// class SearchBar extends React.Component {
//   handleChange() {
//     this.props.onUserInput(this.refs.filterTextInput.value);
//   }
//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.props.filterText}
//           ref="filterTextInput"
//           onChange={this.handleChange.bind(this)}
//         />
//       </div>
//     );
//   }
// }

class ProductTable extends React.Component {
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      //   if (product.name.indexOf(filterText) === -1) {
      //     return;
      //   }
      return (
        <ProductRow
          onProductTableUpdate={onProductTableUpdate}
          product={product}
          onDelEvent={rowDel.bind(this)}
          key={product.ID}
        />
      );
    });
    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">
          Add
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Remove Row</th>
            </tr>
          </thead>

          <tbody>{product}</tbody>
        </table>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "serial",
            value: this.props.product.ID,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "name",
            value: this.props.product.NAME,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "qty",
            value: this.props.product.qty,
            id: this.props.product.id,
          }}
        />
        <NonEditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "unit",
            value: this.props.product.UNIT,
            id: this.props.product.id,
          }}
        />
        <NonEditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "PRICE",
            value: this.props.product.PRICE,
            id: this.props.product.id,
          }}
        />
        <TotalPriceCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "totalprice",
            id: this.props.product.id,
            unit: this.props.product.unit,
          }}
        />
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn" />
        </td>
      </tr>
    );
  }
}
class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input
          type="text"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          onChange={this.props.onProductTableUpdate}
        />
      </td>
    );
  }
}

class NonEditableCell extends React.Component {
  render() {
    return <td>{this.props.cellData.value}</td>;
  }
}

class TotalPriceCell extends React.Component {
  render() {
    return <td>{}</td>;
  }
}

class DropdownCell extends React.Component {
  render() {
    return (
      <td>
        <select name="Product Name">
          {this.props.products.map((fbb) => (
            <option key={fbb.key} value={fbb.key}>
              {fbb.NAME}
            </option>
          ))}
          ;
        </select>
      </td>
    );
  }
}
export { GridComponent };
