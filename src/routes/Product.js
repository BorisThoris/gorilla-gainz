import React from "react";

import NavBar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import ProductCard from "../components/productCard";
import YouTube from "react-youtube";
import { Checkbox, Button } from "antd";
import product from "../services/productsService.js";
import notify from "../services/notify.js";

export default class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.isAdmin = sessionStorage.getItem("isAdmin");

    this.state = {
      productInfo: [],
      updateDesc: "",
      updateTitle: "",
      updatePrice: "",
      updateUrl: ""
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    var url = window.location.pathname;
    let info;
    var id = url.substring(url.lastIndexOf("/") + 1);

    product
      .getProductById(id)
      .then(data =>
        this.setState({
          productInfo: data,
          updateDesc: data.productDesc,
          updateTitle: data.productName,
          updatePrice: data.price,
          updateUrl: data.imgUrl
        })
      )
      .catch(notify.handleError);
  };

  onSubmit2 = () => {
    let sad = 5;
    var url = window.location.pathname;
    let info;
    var id = url.substring(url.lastIndexOf("/") + 1);

    if (this.isAdmin === "false") {
      notify.showError("Admin Only!");
    } else {
      product
        .deleteProduct(id)
        .then(userData => {
          notify.showInfo("Product Deleted!");
          window.location = "/catalogue";
        })
        .catch(() => notify.showError("Product Deletion Error"));
    }
  };

  onSubmit = () => {
    //price, imgUrl, productDesc, productName, productId

    var url = window.location.pathname;
    let info;
    var id = url.substring(url.lastIndexOf("/") + 1);

    let price = this.state.updatePrice;
    let imgUrl = this.state.updateUrl;
    let productDesc = this.state.updateDesc;
    let productName = this.state.updateTitle;
    let productId = id;

    if (price === "") {
      notify.showError("Price Is Required");
    } else if (price <= 0) {
      notify.showError("Price > 0!");
    } else if (imgUrl === "") {
      notify.showError("Url Is Required!");
    } else if (productName === "") {
      notify.showError("Name Is Required!");
    } else if (productName.length > 22) {
      notify.showError("Title Should Be Shorter!");
    } else if (productDesc === "") {
      notify.showError("Description is Required!");
    } else if (productDesc.length > 784) {
      notify.showError("Description Should Be Shorter!");
    } else {
      product
        .editProduct(price, imgUrl, productDesc, productName, productId)
        .then(userData => {
          notify.showInfo("Product Updated Successfully!");
          window.location = "/catalogue";
        })
        .catch(() => notify.showError("Product Update Error"));
    }
  };

  onChange = e => {
    if (this.isAdmin === "false") {
      notify.showError("Admin Only!");
    } else {
      this.setState({
        [e.target.id]: `${e.target.value}`
      });
    }
  };

  render() {
    let imageUrl;

    let buttonsProp;
    console.log(this.isAdmin);
    if (this.isAdmin === "true") {
      console.log("lol");
      buttonsProp = (
        <div id="buttonsDiv">
          <Button id="btnUpdate" onClick={() => this.onSubmit()} type="submit">
            Update
          </Button>
          <Button id="btnDelete" onClick={() => this.onSubmit2()} type="submit">
            Delete
          </Button>
        </div>
      );
    }

    return (
      <div id="manage">
        <div id="productViewDiv">
          <div class="ProductView">
            <img
              id="productImage"
              src={this.state.productInfo.imgUrl}
              alt="kill_your_gorilla6"
              alt="err"
              width="650"
              height="700"
            />
            <div id="arrows">
              <div id="arrowLeftProduct">
                <img
                  src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/07/15064945/Left-Arrow-PNG-Download-Image.png"
                  alt="Smiley face"
                  height="42"
                  width="42"
                  id="arrowLeftPicProduct"
                />
              </div>
              <div id="arrowRightProduct">
                <img
                  src="http://pixsector.com/cache/ef1ee4a1/av85f1b171d762037fe92.png"
                  alt="Smiley face"
                  height="42"
                  width="42"
                  id="arrowRightPicProduct"
                />
              </div>
            </div>
          </div>

          <div id="productInfo">
            <textarea
              rows="2"
              id="updateTitle"
              rows="1"
              cols="18"
              type="text"
              value={this.state.updateTitle}
              onChange={e => this.onChange(e)}
            />

            <textarea
              id="updateDesc"
              rows="21"
              cols="46"
              type="text"
              value={this.state.updateDesc}
              onChange={e => this.onChange(e)}
            />

            <div id="priceDiv">
              <div id="price">
                Price:
                <input
                  type="number"
                  id="updatePrice"
                  onChange={e => this.onChange(e)}
                  value={this.state.updatePrice}
                  disabled
                />
              </div>

              <div id="urlDiv">
                ImgUrl:
                <input
                  type="text"
                  id="updateUrl"
                  onChange={e => this.onChange(e)}
                  value={this.state.updateUrl}
                />
              </div>
            </div>

            {buttonsProp}
          </div>
        </div>
      </div>
    );
  }
}
