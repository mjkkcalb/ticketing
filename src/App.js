import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";


import Data from './components/Search/Data';
import Test from './components/Search/Test';
import EX from "./components/Search/EX";
import Reserve from "./components/Search/Reserve";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import SavePage from "./Pages/SavePage";
import MyPage from "./Pages/MyPage";
import SignUp from "./components/Login/Singup";
import Payment from "./components/Search/Payment";

function App() {
  return (
    < >
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/save" element={<SavePage />} />
        <Route path="/payment/:title" element={<Payment />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/ex" element={<EX />} />
        <Route path="/reserve/:title" element={<Reserve />} />
      </Routes>
    </>
  );
}

export default App;
