import React,{useState, useEffect} from 'react';
import Catalogo from './components/Catalogo/Catalogo';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Product from './components/Products/product.js';
import './app.css';
import Admin from './components/Admin/Admin';
import {getCategories} from './Redux/categories/categories.js';
import {getProducts} from './Redux/products/products.js';
import {useDispatch, useSelector} from 'react-redux';
import Carrito from './components/Carrito/carrito.js';
import User from './components/User/user.js';
import Activity from './components/Activity/activity.js';
import Login from './components/LogIn/Login.js';
import Index from './components/Index/index.js'
function App() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.users.user)
  const products = useSelector(store => store.products.products)
  const categories = useSelector(store => store.categories.categories)
  const [search,setSearchApp] = useState({
    array: [],
    word: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  },[])

  
  return (
    <Router>
        <Nav user={user} categories={categories} setSearchApp = {setSearchApp}/>
 
        <Route
       exact path='/'
       component={Index}
       />
       
        <Route
        exact path="/products/search"
        render={()=> <Catalogo products = {
          search.array
        }/>}
        />
        
        <Route
        path='/admin'
        render={() => <Admin products={products} categories={categories}/>}
        />

        <Route 
         exact path='/catalogo'
         render={()=> <Catalogo products={products} />}
        />

        <Route 
         exact path= "/catalogo/:id"
         render={({match})=> <Catalogo products={products.filter(p => p.categoryId === Number(match.params.id))} />}
        />

        <Route
           path='/catalogo/product/:id'
          render={({match}) => 
          <div className='product'>
            <Product user={user} data={products.filter(p => p.id === Number(match.params.id))}/>
          </div>}
        />
          <Route
        exact path = '/user'
        component={User}
        />
        <Route
          exact path = '/login'
          component ={Login}
        />

        <Route
        exact path ='/user/activity' 
        render = {() => <Activity user = {user}/>}
        />

       <Route
       exact path="/carrito"
       render = {() => <Carrito user = {user}/>}
       />

       
    </Router>
  );
}

export default App;
