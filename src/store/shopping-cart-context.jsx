import { createContext } from "react";

export const CartContext = createContext({
  items: [], // empty default value to match the useState inside the App component
  addItemsToCart: () => {}, // empty dummy arrow function set as context default value
  updateCart: () => {}
});

// createContext is a react function that allows passing of data without the need of prop drilling
// it is stored in a constant which will be a react component and should begin with a capital letter
// inside createContext is any datatype we want to store
// a default value is required by React incase a component not wrapped in the Provider tries to access the context value
