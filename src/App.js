import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.min.css';

import Products from './Components/Products/detail.jsx';
import Cart from './Components/Cart/index.jsx';
function App() {
    const [data, setData] = useState();
    return (
        <>
            <BrowserRouter>                
                <Routes>
                    <Route path="/" element={<Products  setData={setData}/>} />
                    <Route path="/cart" element={<Cart data={data}/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
