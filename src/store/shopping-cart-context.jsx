import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [], // empty default value to match the useState inside the App component
  addItemsToCart: () => {}, // empty dummy arrow function set as context default value
  updateCart: () => {},
});

// createContext is a react function that allows passing of data without the need of prop drilling
// it is stored in a constant which will be a react component and should begin with a capital letter
// inside createContext is any datatype we want to store
// a default value is required by React incase a component not wrapped in the Provider tries to access the context value

function ShoppingCartReducer(state, action) { // use reducer must take 2 arguments, the state as the 1st argument and the dispatcher as the 2nd

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // spread state is not needed here because we have only one value
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_CART") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state, // spread state is not needed here because we have only one value
      items: updatedItems,
    };
  }

  return state;
}

// all the logic and state management in the app can also be migrated to the context app and used as a wrapper to pass along the children
// in order for it to function it must have a return statement, in this case, the context constant .Provider wraps the children

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(ShoppingCartReducer, {items: []}) // reducer needs a second argument as an initial default value

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ // react reducer's dispatches is used to dispatch an action. Any datatype can be stored inside
      type: 'ADD_ITEM',
      payload: id
    })
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_CART",
      payload: {
        productId, // if key value pairs match in parameters, they can be declared once. So no need to declare 'productID: productID'
        amount,
      },
    });
  }

  const contextValue = {
    items: shoppingCartState.items, // context items value is the value of our declared state at the beginninf
    addItemsToCart: handleAddItemToCart, // the add items to cart function can now be stored and passed as a prop
    updateCart: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// an alternative to Context Provider is Consumer, which may appear in some older coder bases
// it uses an an opening an closing tag, in between it dynamically {} outputs a function inside curly braces
// the function carried out takes the context as a parameter and returns the React components inside the function

{/* <CardContext.Consumer>
      {(contextValue) => {
        return (
          <div>
            <p>your React code</p>
          </div>
        )
      }
    }
    </CardContext.Consumer> */}
