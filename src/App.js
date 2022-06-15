import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';

import Products from '../src/Components/Products/list.jsx';
function App() {
    return (
        <>
            <BrowserRouter>                
                <Routes>
                    <Route path="/" element={<Products />} />                   
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
