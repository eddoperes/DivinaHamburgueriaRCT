import './App.css';
import Home from  './pages/Home'

import InventoryItemsNew from './pages/inventoryitems/InventoryItemsNew';
import InventoryItemsEdit from './pages/inventoryitems/InventoryItemsEdit';
import InventoryItemsRemove from './pages/inventoryitems/InventoryItemsRemove';
import InventoryItemsList from './pages/inventoryitems/InventoryItemsList';

import PurchaseOrdersNew from './pages/purchaseorders/PurchaseOrdersNew';
import PurchaseOrdersEdit from './pages/purchaseorders/PurchaseOrdersEdit';
import PurchaseOrdersList from './pages/purchaseorders/PurchaseOrdersList';

import InventoryList from './pages/inventories/InventoryList';

import Login from './pages/login/Login';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainContextProvider from './contexts/MainContext'

import  AppNavbar from  './components/AppNavbar'

function App() {

  return (
    <div className="App">          
      <MainContextProvider>
        <BrowserRouter>
          <AppNavbar></AppNavbar> 
          <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/InventoryItems" element={<InventoryItemsList/>} />
            <Route path="/InventoryItems/New" element={<InventoryItemsNew/>} />
            <Route path="/InventoryItems/Edit/:id" element={<InventoryItemsEdit/>} />
            <Route path="/InventoryItems/Remove/:id" element={<InventoryItemsRemove/>} />

            <Route path="/PurchaseOrders" element={<PurchaseOrdersList/>} />
            <Route path="/PurchaseOrders/New" element={<PurchaseOrdersNew/>} />
            <Route path="/PurchaseOrders/Edit/:id" element={<PurchaseOrdersEdit/>} />

            <Route path="/Inventories" element={<InventoryList/>} />

            <Route path="/Login" element={<Login/>} />

          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
