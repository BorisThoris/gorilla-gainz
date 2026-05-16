import React from "react";

import NavBar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import ProductCard from "../components/productCard";
import YouTube from "react-youtube";
import ProductCreator from "../components/productCreater";
import product from "../services/productsService.js";
import notify from "../services/notify.js";
import remote from "../services/remote.js";
import auth from "../services/authService.js";

export default class Catalogue extends React.Component {
  constructor(props) {
    super(props);
    this.test = "hello";
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    product
      .getAllProducts()
      .then(data => this.setState({ products: data }))
      .catch(notify.handleError);
  };

  render() {
    console.log(this.test);
    let Products = this.state.products.map(p => (
      <ProductCard
        key={p._id}
        price={p.price}
        productDesc={p.productDesc}
        productName={p.productName}
        imgUrl={p.imgUrl}
        id={p._id}
      />
    ));

    let isAdmin = sessionStorage.getItem("isAdmin");
    let productCreatorProps;

    productCreatorProps = <ProductCreator />;

    //Rendering
    return (
      <div id="manage">
        <div id="caloguePageMainDiv">
          {productCreatorProps}
          <div id="productsHolder">{Products}</div>
        </div>
      </div>
    );
  }
}
