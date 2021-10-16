import React from "react";

class GridComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.products, "working");

    this.state = [];
    this.state.filterText = "";
    this.state.products = this.props.products;
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
  }
  render() {
    return (
      <div>
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          products={this.state.products}
        />
      </div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var product = this.props.products.map(function (product) {
      return (
        <ProductRow
          onProductTableUpdate={onProductTableUpdate}
          product={product}
          key={product.ID}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total Price</th>
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
    return <td>{0}</td>;
  }
}

class DropdownCell extends React.Component {
  render() {
    return (
      <td>
        <select name="Product Name">
          {this.props.products.map((fbb) => (
            <option key={fbb.ID} value={fbb.NAME}>
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
