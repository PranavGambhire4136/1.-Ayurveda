import { useState } from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import {Blog, Home, NewBlog, NewPlant, PlantInformation} from "./Pages/All";
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import DetailPlantInfo from './Pages/DetailPlantInfo';
import Footer from './Components/Footer';
import Profile from './Pages/Auth/Profile';
import AdditionalInformation from './Pages/Auth/AdditionalInformation';

function App() {

  return (
    <div className='bg-[#97afba]'>
      <Navbar />
      <div className='border-t-4'>
        <Routes>
          <Route path='/' element = {<Home />} /> 
          <Route path = "/plantInformation" element = {<PlantInformation />} />
          <Route path='/plantInformation/:id' element = {<DetailPlantInfo />} />
          <Route path = "/newPlant" element = {<NewPlant />} />
          <Route path = "/blog" element = {<Blog />} />
          <Route path='/newBlog' element = {<NewBlog />} />
          <Route path = "/signup" element = {<SignUp/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/viewProfile' element = {<Profile />} />
          <Route path = '/additionalInformation' element = {<AdditionalInformation />} />
        </Routes>
        <Footer />
      </div>
    </div>

  )
}

export default App;
