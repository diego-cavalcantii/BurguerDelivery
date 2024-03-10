import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hamburgers from "./pages/Hamburgers/Hamburgers";
import Desserts from "./pages/Desserts/Desserts";
import Beverages from "./pages/Beverages/Beverages";
import Appetizers from "./pages/Appetizes/Appetizers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hamburgers" element={<Hamburgers />} />
        <Route path="/sobremesas" element={<Desserts />} />
        <Route path="/bebidas" element={<Beverages />} />
        <Route path="/bebidas" element={<Beverages />} />
        <Route path="/entradas" element={<Appetizers />} />
      </Routes>
    </BrowserRouter>
  );
}
