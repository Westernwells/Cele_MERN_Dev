import { fetchAllProducts } from "../Api";
import { ProductsList } from "../Data/index";
const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const FETCHING_PRODUCTS = "FETCHING_PRODUCTS";
const PRODUCTS_FETCHED = "PRODUCTS_FETCHED";
const ERROR_FETCHING_PRODUCTS = "ERROR_FETCHING_PRODUCTS";
const FETCH_MORE_PRODUCTS = "FETCH_MORE_PRODUCTS";
// type ActionTypesOnly = FETCH_PRODUCTS |

// types
//      FETCHPRODUCTS
type FetchProducts = {
  type: "FETCH_PRODUCTS";
  payload?: {
    loading: boolean;
  };
};
//      FETCHINGPRODUCTS
type FetchingProducts = {
  type: "FETCHING_PRODUCTS";
  payload: {
    loading: boolean;
  };
};

//      PRODUCTFETCHED
type ProductsFetched = {
  type: "PRODUCTS_FETCHED";
  payload: {
    loading: boolean;
    products: Array<ProductType>;
    error: boolean;
  };
};
//      ERRORFETCHINGPRODUCT
type ErrorFetchingProducts = {
  type: "ERROR_FETCHING_PRODUCTS";
  payload: {
    loading: boolean;
    error: boolean;
    // products:Array<ProductType>
  };
};

// fetch more products
type FetchMoreProducts = {
  type: "FETCH_MORE_PRODUCTS";
  payload: {
    // loading: boolean;
    pagination: number;
  };
};
// action type
type ProductActions =
  | FetchProducts
  | FetchingProducts
  | ProductsFetched
  | ErrorFetchingProducts
  | FetchMoreProducts;
// state type
export type ProductType = {
  productName: string;
  price: string;
  description: string;
  images: Array<string>;
  vendor: string;
  id: string;
  link: string;
  vendorUrl: string;
};
export type ProductsStateType = {
  products: ProductType[];
  loading: boolean;
  error: boolean;
  errorState?: Array<string>;
};
// initial state
export const productInitialState: ProductsStateType = {
  products: [],
  loading: false,
  error: false,
  errorState: [],
};
export const fetchProducts = async (
  dispatch: React.Dispatch<ProductActions>,
  pagination: number = 1
) => {
  dispatch({
    type: "FETCHING_PRODUCTS",
    payload: {
      loading: true,
    },
  });
  const data = await fetchAllProducts();
  // const data = ProductsList;

  dispatch({
    type: "PRODUCTS_FETCHED",
    payload: {
      loading: false,
      products: (data as Array<ProductType>).slice(0, 16 * pagination),
      error: false,
    },
  });
};
// actions
//      fetch products
//      fetch more products
//      trigger fetch error

// reducer itself
export const ProductsReducer = (
  state: ProductsStateType,
  action: ProductActions
) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { products: [], loading: false, error: false, errorState: [] };
    case FETCHING_PRODUCTS:
      return { ...state, loading: action.payload.loading };

    case PRODUCTS_FETCHED:
      return {
        ...state,
        loading: action.payload.loading,
        products: action.payload.products,
        error: action.payload.error,
      };

    case ERROR_FETCHING_PRODUCTS:
      return {
        products: [],
        loading: false,
        error: false,
        errorState: [],
      };

    case FETCH_MORE_PRODUCTS:
      return {
        products: [],
        loading: false,
        error: false,
        errorState: [],
      };
    default:
      console.log("hello world");
      return {
        products: [],
        loading: false,
        error: false,
        errorState: [],
      };
  }
};

export {};
