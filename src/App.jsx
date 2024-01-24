import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products";

function App() {
  return (
    // the app is wrapped in react's createContext function. Provider is a component property created by React
    // same default value set as in the Create Context file. In this case the same as the useState declared at the beginning
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
