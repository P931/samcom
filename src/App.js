import {
  Grid,

} from '@mui/material';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './Componets/Product';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
