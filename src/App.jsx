import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Router>
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              onSearch={setSearchQuery} // ← add this
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
