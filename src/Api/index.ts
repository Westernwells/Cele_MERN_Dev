import { ProductsList } from "../Data";
import { ProductType } from "../Reducers/ProductReducer";

export const fetchProductById = (id: string) => {
  return new Promise((resolve, reject) => {
    let result = ProductsList.find((item) => item.id == id);
    if (result !== undefined) {
      resolve(result);
    } else {
      reject("erro finding product");
    }
  });
};

export const fetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(ProductsList);
    } catch (error) {
      reject("erro finding product");
    }
  });
};

console.log(fetchProductById("1"));
console.log("Hello world");
