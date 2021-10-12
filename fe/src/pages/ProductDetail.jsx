import React from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";
import Footer from "../components/Footer";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`http://localhost:3300/product/get`, {
      params: {
        id: this.props.match.params.id,
      },
    })
      .then((result) => {
        console.log("result", result);
        if (result.data.length) {
          console.log("length", result.data.length);
          this.setState({
            productData: result.data[this.props.match.params.id - 1],
          });
          console.log("productData", result.data[0]);
        } else {
          this.setState({ productNotFound: true });
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan di server!");
      });
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  addToCartHandler = () => {
    Axios.get(`${URL_API}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.state.productData.id,
      },
    }).then((result) => {
      if (result.data.length) {
        Axios.patch(`${URL_API}/carts/${result.data[0].id}`, {
          quantity: result.data[0].quantity + this.state.quantity,
        })
          .then(() => {
            alert("Berhasil masukan keranjang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi kesalahan server!");
          });
      } else {
        Axios.post(`${URL_API}/carts`, {
          userId: this.props.userGlobal.id,
          productId: this.state.productData.id,
          price: this.state.productData.price,
          productName: this.state.productData.productName,
          productImage: this.state.productData.productImage,
          quantity: this.state.quantity,
        })
          .then(() => {
            alert("Berhasil masukan keranjang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi kesalahan server!");
          });
      }
    });
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    return (
      <div className="container">
        {this.state.productNotFound ? (
          <div className="alert alert-warning mt-3">
            Product with ID {this.props.match.params.id} has been not found
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-6">
              <img
                style={{ width: "100%" }}
                src={this.state.productData.picture}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{this.state.productData.full_name}</h4>
              <h5>Rp {this.state.productData.price}</h5>
              <p>{this.state.productData.desc}</p>
              <div className="d-flex flex-row align-items-center">
                <button
                  onClick={() => this.qtyBtnHandler("decrement")}
                  className="btn btn-primary mx-4"
                >
                  -
                </button>
                {this.state.quantity}
                <button
                  onClick={() => this.qtyBtnHandler("increment")}
                  className="btn btn-primary mx-4"
                >
                  +
                </button>
              </div>
              <button
                onClick={this.addToCartHandler}
                className="btn btn-success mt-3"
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  //getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
