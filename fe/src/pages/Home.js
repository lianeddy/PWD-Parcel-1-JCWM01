import React from "react";
import "./Home.css";

function Home() {
  const renderProducts = () => {
    console.log("test");
  };

  // const inputHandler = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   this.setState({ [name]: value });
  // };

  return (
    <>
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
                {/* <input
                  onChange={inputHandler}
                  name="searchProductName"
                  type="text"
                  className="pg-box1-input"
                /> */}
                {/* <label htmlFor="searchCategory" className="pg-box1-search">
                  Search Category
                </label>
                <select
                  onChange={inputHandler}
                  name="searchCategory"
                  className="pg-box1-cat"
                >
                  <option value="">All Item</option>
                  <option value="kaos">Choco</option>
                  <option value="celana">Snack</option>
                  <option value="aksesoris">Drink</option>
                </select> */}
                {/* <button onClick={searchBtnHandler} className="pg-box1-but">
                  Search
                </button> */}
              </div>
            </div>
            <div className="pg-box-2">
              <div className="pg-box2-text">
                <strong>Sort Product</strong>
              </div>
              <div className="pg-box2-choice">
                <label htmlFor="sortBy"></label>
                <select
                  // onChange={inputHandler}
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
            {/* <div className="pg-box-3">
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
            </div> */}
          </div>
          <div className="">
            <div className="">{renderProducts()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
