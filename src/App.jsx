import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Programs from "./sections/programs/Programs";
import "./i18n"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs/:country" element={<Programs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
