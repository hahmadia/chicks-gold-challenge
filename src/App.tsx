import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import ProductListingPage from './components/ProductListingPage/ProductListingPage';
import Footer from './components/Footer/Footer';
import './index.css'

function App() {
  return (
    <CartProvider>
        <Header />
         <ProductListingPage />
        <Footer /> 
    </CartProvider>
  );
}

export default App;
