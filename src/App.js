import React from 'react';
import './App.scss';
import './config/style/bootstrap.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import Description from './pages/Description/Description';
import Welcome from './pages/Welcome/Welcome';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AuthContact from './pages/Auth/authContact';
import Cart from './pages/Cart/Cart';
import Seller from './pages/Seller/Seller';
import AddProducts from './pages/Seller/addProduct/addproducts';
import ProductStore from './pages/ProductStore/ProductStore';
import StoreAdmin from './pages/Seller/StoreAdmin/StoreAdmin';
import AuthProvider from './config/contexts/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
//import Banner from './components/Banner/Banner';
import BannerSlider from './components/BannerSlider/BannerSlider';
import CheckOut from './pages/CheckOut/CheckOut';
import Pay from './pages/CheckOut/FlutterWave';
import UpdateInfo from './pages/Profile/updateInfo/UpdateInfo';
import Security from './pages/Seller/Security';
import AddImages from './pages/Seller/addProduct/addImages';
import StoreImages from './pages/Seller/StoreAdmin/addStoreImages';
import StoreLogo from './pages/Seller/StoreAdmin/addStoreLogo';
import Wishlist from './pages/Wishlist/Wishlis';
import PasswordReset from './pages/Auth/passwordReset';
import DescriptionEdit from './pages/DescriptionEdit/DescriptionEdit';
import Faq from './pages/Faq/Faq';
import Dashboard from './pages/Dashboard/Dashboard';
import SuperAdmin from './pages/Dashboard/SuperAdmin';
import AdminProvider from './config/contexts/AdminContext';
import NetworkStatus from './components/NetworkStatus';
// import Search from './pages/Seller/Search';

function App() {
  return (
    <div className="App">
      <NetworkStatus/>
      <AuthProvider>
      <AdminProvider>
      <Router>
        <Routes>
        {/* <Route path='/' element={<Welcome/>}/> */}
          <Route path='/' element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='notification' element={<ProtectedRoutes> <Notifications/> </ProtectedRoutes>}/>
          <Route path='profile' element={ <ProtectedRoutes> <Profile/> </ProtectedRoutes> }/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='forgot-password' element={<PasswordReset/>}/>
          <Route path='auth-contact' element={<AuthContact/>}/>
          <Route path='product-desc/:id' element={<Description/>}/>
          <Route path='desc-edit/:id' element={<DescriptionEdit/>}/>
          <Route path='cart' element={<ProtectedRoutes> <Cart/> </ProtectedRoutes> }/>
          <Route path='seller' element={ <ProtectedRoutes> <Seller/> </ProtectedRoutes> }/>
          <Route path='add-products/:storeID' element={ <AddProducts/>}/>
          <Route path='add-images/:storeID/:productID' element={ <AddImages/>}/>
          <Route path='add-storeImages/:storeID/:imgType' element={ <StoreImages/>}/>
          <Route path='add-storeLogo/:storeID' element={ <StoreLogo/>}/>
          <Route path='store/:storeID' element={ <ProductStore/> }/>
          <Route path='store-admin/:storeID' element={ <ProtectedRoutes> <StoreAdmin/> </ProtectedRoutes>}/>
          <Route path='security' element={ <ProtectedRoutes> <Security/> </ProtectedRoutes>}/>
          <Route path='banner' element={ <BannerSlider/>}/>
          <Route path='check-out' element={<CheckOut/>}/>
          <Route path='pay' element={<Pay/>}/>
          <Route path='update-info' element={<UpdateInfo/>}/>
          <Route path='wishlist' element={<Wishlist/>}/>
          <Route path='faq' element={<Faq/>}/>
          <Route path='dashboard/:storeID' element={<Dashboard/>}/>
          <Route path='admin' element={<SuperAdmin/>}/>
        </Routes>
      </Router>
      </AdminProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

