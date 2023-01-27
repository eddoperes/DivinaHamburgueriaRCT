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

import CustomersNew from './pages/customers/CustomersNew';
import CustomersEdit from './pages/customers/CustomersEdit';
import CustomersRemove from './pages/customers/CustomersRemove';
import CustomersList from './pages/customers/CustomersList';

import ProvidersNew from './pages/providers/ProvidersNew';
import ProvidersEdit from './pages/providers/ProvidersEdit';
import ProvidersRemove from './pages/providers/ProvidersRemove';
import ProvidersList from './pages/providers/ProvidersList';

import UsersNew from './pages/users/UsersNew';
import UsersEdit from './pages/users/UsersEdit';
import UsersRemove from './pages/users/UsersRemove';
import UsersList from './pages/users/UsersList';

import HallOrdersNew from './pages/hallorders/HallOrdersNew';
import HallOrdersEdit from './pages/hallorders/HallOrdersEdit';
import HallOrdersList from './pages/hallorders/HallOrdersList';

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

            <Route path="/Customers" element={<CustomersList/>} />
            <Route path="/Customers/New" element={<CustomersNew/>} />
            <Route path="/Customers/Edit/:id" element={<CustomersEdit/>} />
            <Route path="/Customers/Remove/:id" element={<CustomersRemove/>} />

            <Route path="/Providers" element={<ProvidersList/>} />
            <Route path="/Providers/New" element={<ProvidersNew/>} />
            <Route path="/Providers/Edit/:id" element={<ProvidersEdit/>} />
            <Route path="/Providers/Remove/:id" element={<ProvidersRemove/>} />

            <Route path="/Users" element={<UsersList/>} />
            <Route path="/Users/New" element={<UsersNew/>} />
            <Route path="/Users/Edit/:id" element={<UsersEdit/>} />
            <Route path="/Users/Remove/:id" element={<UsersRemove/>} />

            <Route path="/HallOrders" element={<HallOrdersList/>} />
            <Route path="/HallOrders/New" element={<HallOrdersNew/>} />
            <Route path="/HallOrders/Edit/:id" element={<HallOrdersEdit/>} />

          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
