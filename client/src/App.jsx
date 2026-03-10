import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';          // 👈 add this
import 'react-toastify/dist/ReactToastify.css';            // 👈 add this
import Menubar from './components/Menubar/Menubar'
import Dashboard from './pages/Dashboard/Dashboard'
import ManageCategory from './pages/ManageCategories/ManageCategories'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'

const App = () => {
    return (
        <BrowserRouter>
            <Menubar />
            <ToastContainer position="top-right" autoClose={3000} />  {/* 👈 fixed */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/category" element={<ManageCategory />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/explore" element={<Explore />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;