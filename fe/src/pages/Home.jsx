import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { URL_API } from "../helper";
import "./Home.css";

class Home extends React.Component {
  state = {
    productList: [],
    filterProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 5,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  };

  fetchProducts = () => {
    Axios.get(`${URL_API}/products`)
      .then((result) => {
        alert("Berhasil");
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filterProductList: result.data,
        });
      })
      .catch(() => {
        // alert("Terjadi kesalahan server!");
      });
  };

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  searchBtnHandler = () => {
    const filterProductList = this.state.productList.filter((val) => {
      return (
        val.productName
          .toLowerCase()
          .includes(this.state.searchProductName.toLocaleLowerCase()) &&
        val.category
          .toLocaleLowerCase()
          .includes(this.state.searchCategory.toLocaleLowerCase)
      );
    });
    this.setState({
      filterProductList,
      maxPage: Math.ceil(filterProductList.length / this.state.itemPerPage),
      page: 1,
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filterProductList];
    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (b.productName > a.productName) {
        return 1;
      }
      return 0;
    };

    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filterProductList];
        break;
    }

    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );

    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
  };

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <div className="page">
        {/* <div>test</div> */}
        <div className="pg-container">
          <div className="pg-box">
            <div className="pg-box-1">
              <div className="pg-box1-text">
                <strong>Filter Products</strong>
              </div>
              <div className="pg-box1-table">
                <label htmlFor="searchProductName">Product Name</label>
                <input
                  onChange={this.inputHandler}
                  name="searchProductName"
                  type="text"
                  className="pg-box1-input"
                />
                <label htmlFor="searchCategory" className="pg-box1-search">
                  Search Category
                </label>
                <select
                  onChange={this.inputHandler}
                  name="searchCategory"
                  className="pg-box1-cat"
                >
                  <option value="">All Item</option>
                  <option value="kaos">Choco</option>
                  <option value="celana">Snack</option>
                  <option value="aksesoris">Drink</option>
                </select>
                <button onClick={this.searchBtnHandler} className="pg-box1-but">
                  Search
                </button>
              </div>
            </div>
            <div className="pg-box-2">
              <div className="pg-box2-text">
                <strong>Sort Product</strong>
              </div>
              <div className="pg-box2-choice">
                <label htmlFor="sortBy"></label>
                <select
                  onChange={this.inputHandler}
                  name="sortBy"
                  className="pg-box2-select"
                >
                  <option value="">Default</option>
                  <option value="lowPrice">Lowest Price</option>
                  <option value="highPrice">Highest Price</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
            <div className="pg-box-3">
              <div className="pg-box-3-container">
                <button
                  disabled={this.state.page === 1}
                  onClick={this.prevPageHandler}
                  className=""
                >
                  {"<"}
                </button>
                <div className="">
                  Page {this.state.page} of {this.state.maxPage}
                </div>
                <button
                  disabled={this.state.page === this.state.maxPage}
                  onClick={this.nextPageHandler}
                  className=""
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">{this.renderProducts()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
