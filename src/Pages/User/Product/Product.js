import { useEffect, useState } from "react";
import "./product.scss";
import ProductModel from "./ProductModel";
import { ApiGet } from "../../../services/helpers/API/ApiData";
import useDebounce from "../../Comman/UseDebounce";  

export default function Product() {
  const [model, setModel] = useState(false);
  const [productData, setProductData] = useState();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [searchInput, setsearchInput] = useState('');

  // Debounced search input
  const debouncedSearchInput = useDebounce(searchInput, 1000);

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  useEffect(() => {
    if (debouncedSearchInput) {
      getSearchProduct(debouncedSearchInput);
    } else {
      getProduct();
    }
  }, [debouncedSearchInput]);

  const catagoryChange = (e) => {
    setSelectCategory(e.target.value);
    getSortProduct(e.target.value);
  };

  const searchInputHandle = (e) => {
    setsearchInput(e.target.value);
  };

  const clearHandle = () => {
    setSelectCategory("");
    setsearchInput("");
    getProduct();
  };

  const getProduct = () => {
    ApiGet("products/getAll")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    ApiGet("categories/getAll")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSearchProduct = (searchQuery) => {
    ApiGet(`products/search?search=${searchQuery}`)
      .then((res) => {
        setProducts(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSortProduct = (category) => {
    ApiGet(`products/search?categoryId=${category}`)
      .then((res) => {
        setProducts(res.data.results);
        setsearchInput('')
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalShowHandal = () => {
    setModel(false);
  };

  const modelShow = (x) => {
    setModel(true);
    setProductData(x);
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h3>Product List</h3>
          <div className="sort-data">
            <select
              name="categoryId"
              value={selectCategory}
              onChange={catagoryChange}
            >
              <option value="">All</option>
              {category?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div>
              <input
                type="text"
                value={searchInput || ""}
                onChange={searchInputHandle}
                placeholder="Search products"
              />
              <button onClick={clearHandle}>Clear</button>
            </div>
          </div>
        </div>
        <div className="product-grid">
          {products?.map((x) => (
            <div className="product-card" key={x.id}>
              <div className="product-image" onClick={() => modelShow(x)}>
                {x.images.map((y, index) => (
                  <img src={y} alt="product" key={index} />
                ))}
              </div>
              <span className="eye" onClick={() => modelShow(x)}>
                <i className="fa-solid fa-eye"></i>
              </span>
              <div className="product-details">
                <div className="product-name">{x.name}</div>
                <div className="product-price">Price: &#8377;{x.price}</div>
                {localStorage.getItem("role") === "dealer" && (
                  <div className="product-price">
                    Dealer Price: &#8377;{x.dealerPrice}
                  </div>
                )}
                <div className="product-description">{x.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {model && (
        <ProductModel
          productData={productData}
          modalShowHandal={modalShowHandal}
        />
      )}
    </>
  );
}
