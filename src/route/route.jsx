import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import Home from "../components/home/home";
  import Error404 from '../components/Error404/Error404'
import ProductPage from "../components/productPage/productPage";

  function Chemin() {
      return(
            <Routes>
              <Route path="/" element={<Navigate to="/product" replace/>}/>
              <Route path="/product" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        );
  }
  
  export default Chemin