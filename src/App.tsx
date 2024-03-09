import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hamburgers from "./pages/Hamburgers/Hamburgers";
import Sobremesas from "./pages/Sobremesas/Sobremesas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hamburgers" element={<Hamburgers />} />
        <Route path="/sobremesas" element={<Sobremesas/>}/>
      </Routes>
    </BrowserRouter>
  );
}
