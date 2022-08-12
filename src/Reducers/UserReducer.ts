import { ProductsList } from "../Data/index";
const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const FETCHING_PRODUCTS = "FETCHING_PRODUCTS";
const PRODUCTS_FETCHED = "PRODUCTS_FETCHED";
const ERROR_FETCHING_PRODUCTS = "ERROR_FETCHING_PRODUCTS";
const FETCH_MORE_PRODUCTS = "FETCH_MORE_PRODUCTS";
const ADD_COLLECTION = "ADD_COLLECTION";
const REMOVE_COLLECTION = "REMOVE_COLLECTION";
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
type AddProductToCollection = {
  type: "ADD_COLLECTION";
  payload: {
    product: ProductType;
    // loading: boolean;
  };
};
type RemoveProductFromCollection = {
  type: "REMOVE_COLLECTION";
  payload: {
    product: ProductType;
    // loading: boolean;
  };
};
// action type
type ProductActions = AddProductToCollection | RemoveProductFromCollection;

// state type
export type ProductType = {
  productName: string;
  price: string;
  description: string;
  images: Array<string>;
  vendor: string;
  id: string;
};
export type UserStateType = {
  collections: ProductType[];
  loading: boolean;
  // error: boolean;
  // errorState?: Array<string>;
};
// initial state
export const productInitialState: UserStateType = {
  collections: [],
  loading: false,
};
export const addCollection = (
  dispatch: React.Dispatch<ProductActions>,
  product: ProductType
) => {
  dispatch({
    type: "ADD_COLLECTION",
    payload: {
      product,
      // loading: boolean;
    },
  });
};

export const removeCollection = (
  dispatch: React.Dispatch<ProductActions>,
  product: ProductType
) => {
  dispatch({
    type: "REMOVE_COLLECTION",
    payload: {
      product,
      // loading: boolean;
    },
  });
};
// actions
//      fetch products
//      fetch more products
//      trigger fetch error

// reducer itself
export const UserReducer = (state: UserStateType, action: ProductActions) => {
  switch (action.type) {
    case ADD_COLLECTION:
      return {
        collections: [...state.collections, action.payload.product],
        loading: false,
      };
    case REMOVE_COLLECTION:
      let filteredProduct = state.collections.filter(
        (item) => item.id !== action.payload.product.id
      );
      return {
        collections: [...filteredProduct],
        loading: false,
      };
    default:
      return {
        collections: [],
        loading: false,
      };
  }
};

export {};
