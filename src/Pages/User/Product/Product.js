import { useEffect, useState } from 'react';
import './product.scss';
import ProductModel from './ProductModel';
import { ApiGet, ApiPost } from '../../../services/helpers/API/ApiData';
import useDebounce from '../../Comman/UseDebounce';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [model, setModel] = useState(false);
  const [productData, setProductData] = useState();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [searchInput, setsearchInput] = useState('');
  // const [quantity, setQuantity] = useState(1);
  const [localStorageData, setLocalStorageData] = useState({});
  const navigate = useNavigate();

  // Debounced search input
  const debouncedSearchInput = useDebounce(searchInput, 1000);

  useEffect(() => {
    // getProduct();
    getCategory();
  }, []);

  useEffect(() => {
    localStorage.getItem('role') === 'dealer' ? getSortProduct(category[0]?.id) : getProduct();
  }, [category]);

  useEffect(() => {
    if (debouncedSearchInput) {
      getSearchProduct(debouncedSearchInput);
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
    setSelectCategory('');
    setsearchInput('');
    getProduct();
  };

   useEffect(() => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }
      setLocalStorageData(data);
    }, []);

  const cartHandl = (id, quantity) => {
    if (
      localStorageData.role === "user" ||
      localStorageData.role === "dealer"
    ) {
      addCart(id, quantity);
    } else {
      toast.error("Please Login First !");
      navigate("/login");
    }
  };

  const getProduct = () => {
    ApiGet('products/getAll')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    ApiGet('categories/getAll')
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
        setsearchInput('');
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

  const addCart = (id, quantity) => {
    const data = {
      productId: id,
      quantity,
    };
    ApiPost("carts/add", data)
      .then((res) => {
        toast.success("Product Added to Cart Successfully!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <div className='container'>
        <div className='heading'>
          <h3>Product List</h3>
          <div className='sort-data'>
            {localStorage.getItem('role') === 'dealer' ? (
              <select name='categoryId' value={selectCategory} onChange={catagoryChange}>
                {category?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            ) : (
              <select name='categoryId' value={selectCategory} onChange={catagoryChange}>
                <option value=''>All</option>
                {category?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}

            <div>
              <input type='text' value={searchInput || ''} onChange={searchInputHandle} placeholder='Search products' />
              <button onClick={clearHandle}>Clear</button>
            </div>
          </div>
        </div>
        <div className='product-grid'>
          {products?.map((x) => (
            <div className='product-card' key={x.id}>
              <div className='product-image' onClick={() => modelShow(x)}>
                {x.images.map((y, index) => (
                  <img src={y} alt='product' key={index} />
                ))}
              </div>
              <div className='product-details'>
                <div className='product-name' onClick={() => modelShow(x)}>
                  {x.name}
                </div>

                <div className='product-footer'>
                  {localStorage.getItem('role') === 'dealer' ? (
                    <div className='product-price-container'>
                      <div className='product-price'>User Price: &#8377;{x.price}</div>
                      <div className='product-price-dealer'>Dealer Price: &#8377;{x.dealerPrice}</div>
                    </div>
                  ) : (
                    <div className='product-price'>Price: &#8377;{x.price}</div>
                  )}
                  <button onClick={() => cartHandl(x.id, 1)} className='add-to-cart'>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {model && <ProductModel productData={productData} modalShowHandal={modalShowHandal} />}
    </>
  );
}
