import React from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductDetail extends React.Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`${URL_API}/products`, {
      params: {
        id: this.props.match.params.id,
      },
    })
      .then((result) => {
        if (result.data) {
          this.setState({ productData: result.data });
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
            Product with ID {this.props.match.params.productId} has been not
            found
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-6">
              <img
                style={{ width: "100%" }}
                src={this.state.productData.productImage}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{this.state.productData.productName}</h4>
              <h5>Rp {this.state.productData.price}</h5>
              <p>{this.state.productData.description}</p>
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
