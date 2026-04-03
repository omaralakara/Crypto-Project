import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetial";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays at the top of every page */}
      <Navbar onSearch={(val) => console.log("Searching for:", val)} />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/coin/:id" element={<CoinDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
