import './App.css';
import Home from  './pages/Home'

import InventoryItemsNew from './pages/inventoryitems/InventoryItemsNew';
import InventoryItemsEdit from './pages/inventoryitems/InventoryItemsEdit';
import InventoryItemsRemove from './pages/inventoryitems/InventoryItemsRemove';
import InventoryItemsList from './pages/inventoryitems/InventoryItemsList';

import PurchaseOrdersNew from './pages/purchaseorders/PurchaseOrdersNew';
import PurchaseOrdersEdit from './pages/purchaseorders/PurchaseOrdersEdit';
import PurchaseOrdersList from './pages/purchaseorders/PurchaseOrdersList';

import InventoryEdit from './pages/inventories/InventoryEdit';
import InventoryList from './pages/inventories/InventoryList';

import MenuItemsRecipeNew from './pages/menuitemsrecipe/MenuItemsRecipeNew';
import MenuItemsRecipeEdit from './pages/menuitemsrecipe/MenuItemsRecipeEdit';
import MenuItemsRecipeRemove from './pages/menuitemsrecipe/MenuItemsRecipeRemove';
import MenuItemsRecipeList from './pages/menuitemsrecipe/MenuItemsRecipeList';

import MenuItemsResaleNew from './pages/menuitemsresale/MenuItemsResaleNew';
import MenuItemsResaleEdit from './pages/menuitemsresale/MenuItemsResaleEdit';
import MenuItemsResaleRemove from './pages/menuitemsresale/MenuItemsResaleRemove';
import MenuItemsResaleList from './pages/menuitemsresale/MenuItemsResaleList';

import MenusNew from './pages/menus/MenusNew';
import MenusEdit from './pages/menus/MenusEdit';
import MenusRemove from './pages/menus/MenusRemove';
import MenusList from './pages/menus/MenusList';

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

            <Route path="/Inventories/Edit/:id" element={<InventoryEdit/>} />
            <Route path="/Inventories" element={<InventoryList/>} />

            <Route path="/Login" element={<Login/>} />

            <Route path="/MenuItemsRecipe" element={<MenuItemsRecipeList/>} />
            <Route path="/MenuItemsRecipe/New" element={<MenuItemsRecipeNew/>} />
            <Route path="/MenuItemsRecipe/Edit/:id" element={<MenuItemsRecipeEdit/>} />
            <Route path="/MenuItemsRecipe/Remove/:id" element={<MenuItemsRecipeRemove/>} />

            <Route path="/MenuItemsResale" element={<MenuItemsResaleList/>} />
            <Route path="/MenuItemsResale/New" element={<MenuItemsResaleNew/>} />
            <Route path="/MenuItemsResale/Edit/:id" element={<MenuItemsResaleEdit/>} />
            <Route path="/MenuItemsResale/Remove/:id" element={<MenuItemsResaleRemove/>} />

            <Route path="/Menus" element={<MenusList/>} />
            <Route path="/Menus/New" element={<MenusNew/>} />
            <Route path="/Menus/Edit/:id" element={<MenusEdit/>} />
            <Route path="/Menus/Remove/:id" element={<MenusRemove/>} />

          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
