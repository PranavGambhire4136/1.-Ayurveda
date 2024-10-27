import { useState } from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import {Blog, Home, NewBlog, NewPlant, PlantInformation} from "./Pages/All";
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} /> 
        <Route path = "/plantInformation" element = {<PlantInformation />} />
        <Route path = "/newPlant" element = {<NewPlant />} />
        <Route path = "/blog" element = {<Blog />} />
        <Route path='/newBlog' element = {<NewBlog />} />
        <Route path = "/signup" element = {<SignUp/>} />
        <Route path = '/login' element = {<Login />} />
      </Routes>
    </div>

  )
}

export default App;
