import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./RestockProduct.css";

class RestockProduct extends React.Component {
  state = {
    productList: [],

    editId: 0,

    editStock: 0,
  };

  fetchProducts = () => {
    Axios.get("http://localhost:3302/adminreport/productdata")
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  editToogle = (editData) => {
    this.setState({ editId: editData.id, editStock: editData.stock });
  };

  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveButtonHandler = () => {
    Axios.patch("http://localhost:3302/adminreport/restock", {
      stock: this.state.editStock,
      id: this.state.editId,
    })
      .then((res) => {
        this.fetchProducts();
        this.cancelEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProducts = () => {
    return this.state.productList.map((val) => {
      if (val.id === this.state.editId) {
        return (
          <tr className="restock-tr-1">
            <td className="restock-td-1">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/292/445/small/illustration-of-box-icon-symbol-free-vector.jpg"
                className="restock-img"
              />
              {val.p_name}
            </td>
            <td className="restock-td-1">Rp.{val.admin_price}</td>
            <td className="restock-td-1">Rp.{val.selling_price}</td>
            <td className="restock-td-1">
              <input
                type="number"
                name="editStock"
                onChange={this.inputHandler}
                value={this.state.editStock}
                className="restock-input-stock"
              />
            </td>
            <td className="restock-td-15">
              <button
                className="restock-td-button"
                onClick={this.saveButtonHandler}
              >
                Save
              </button>

              <button className="restock-td-button" onClick={this.cancelEdit}>
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr className="restock-tr-1">
          <td className="restock-td-1">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/292/445/small/illustration-of-box-icon-symbol-free-vector.jpg"
              className="restock-img"
            />
            {val.p_name}
          </td>
          <td className="restock-td-1">Rp.{val.admin_price}</td>
          <td className="restock-td-1">Rp.{val.selling_price}</td>
          <td className="restock-td-1">{val.stock}</td>
          <td className="restock-td-15">
            <button
              className="restock-td-button"
              onClick={() => {
                this.editToogle(val);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="restock-con">
        <div className="restock-container">
          <h3 className="restock-h3">Products Management</h3>
          <tr className="restock-tr-utama">
            <th className="restock-th-1">Product Name</th>
            <th className="restock-th-1">Cost Price</th>
            <th className="restock-th-1">Selling Price</th>
            <th className="restock-th-1">Stock</th>
            <th className="restock-th-15"></th>
          </tr>
          {this.renderProducts()}
        </div>
      </div>
    );
  }
}

export default RestockProduct;

// function RestockProduct() {
//   const [productDataa, setProductDataa] = useState();
//   const [renderProduct, setRenderProduct] = useState();

//   // state edit stock
//   const [edit, setEdit] = useState(0);
//   const [editValue, setEditValue] = useState();
//   const [editStock, setEditStock] = useState();

//   useEffect(() => {
//     getProductData();
//   }, []);

//   // // COMPONENT DID UPDATE
//   // const mounted = useRef();
//   // useEffect(() => {
//   //   if (!mounted.current) {
//   //     // do componentDidMount logic
//   //     // mounted.current = true;
//   //     getProductData();
//   //   } else {
//   //     // do componentDidUpdate logic
//   //   }
//   // });

//   const editToggle = (id) => {
//     setEdit(id);
//   };

//   const getProductData = () => {
//     Axios.get("http://localhost:3302/adminreport/productdata")
//       .then((res) => {
//         setProductDataa(res.data);
//         console.log(res.data);
//         // setRenderProduct(renderProduct);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const inputHandler = (event) => {
//     const { name, value } = event.target.name;

//     setEditValue({ [name]: value });
//   };

//   const renderProductData = () => {
//     var renProduct = productDataa.map((i) => {
//       console.log(i.id);
//       if (i.id === edit) {
//         return (
//           <tr className="restock-tr-1">
//             <td className="restock-td-1">
//               <img
//                 src="https://static.vecteezy.com/system/resources/thumbnails/002/292/445/small/illustration-of-box-icon-symbol-free-vector.jpg"
//                 className="restock-img"
//               />
//               {i.p_name}
//             </td>
//             <td className="restock-td-1">Rp.{i.admin_price}</td>
//             <td className="restock-td-1">Rp.{i.selling_price}</td>
//             <td className="restock-td-1">
//               <input
//                 value={i.stock}
//                 type="text"
//                 onChange={() => {
//                   inputHandler();
//                 }}
//                 name="editStock"
//               ></input>
//             </td>
//             <td className="restock-td-15">
//               <button
//                 className="restock-td-button"
//                 onClick={() => {
//                   console.log(i.id);
//                   editToggle(i.id);
//                 }}
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         );
//       } else {
//         return (
//           <tr className="restock-tr-1">
//             <td className="restock-td-1">
//               <img
//                 src="https://static.vecteezy.com/system/resources/thumbnails/002/292/445/small/illustration-of-box-icon-symbol-free-vector.jpg"
//                 className="restock-img"
//               />
//               {i.p_name}
//             </td>
//             <td className="restock-td-1">Rp.{i.admin_price}</td>
//             <td className="restock-td-1">Rp.{i.selling_price}</td>
//             <td className="restock-td-1" id={i.id}>
//               {i.stock}
//             </td>
//             <td className="restock-td-15">
//               <button
//                 className="restock-td-button"
//                 id={i.id}
//                 onClick={() => {
//                   console.log(i.id);
//                   editToggle(i.id);
//                 }}
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         );
//       }
//     });
//     console.log(renProduct, "[red Product]");
//     setRenderProduct(renProduct);
//   };

//   return (
// <div className="restock-con">
//   <button
//     onClick={() => {
//       renderProductData();
//     }}
//   />
//   <div className="restock-container">
//     <h3 className="restock-h3">Products Management</h3>
//     <tr className="restock-tr-utama">
//       <th className="restock-th-1">Product Name</th>
//       <th className="restock-th-1">Cost Price</th>
//       <th className="restock-th-1">Selling Price</th>
//       <th className="restock-th-1">Stock</th>
//       <th className="restock-th-15"></th>
//     </tr>
//     {renderProduct}
//   </div>
// </div>
//   );
// }

// export default RestockProduct;
