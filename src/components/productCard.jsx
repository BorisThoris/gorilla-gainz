import React from "react";
import auth from "../services/authService.js";
import notify from "../services/notify.js";
import { Link } from "react-router-dom";

export default class ProductCard extends React.Component {
  onSubmit = () => {};

  render() {
    return (
      <div className="card">
        <h1 id="productCardTitle">{this.props.productName}</h1>

        <img
          src={this.props.imgUrl}
          id="productCardImage"
          alt={this.props.productName}
          width="300"
          height="350"
        />
        <p id="productCardDescription">{this.props.productDesc}</p>
        <div id="productCardFooter">
          <span id="productCardPrice">${this.props.price}</span>
          <Link to={`/product-view/${this.props.id}`}>
          <button id="button3">More Information</button>
          </Link>
        </div>
      </div>
    );
  }
}
