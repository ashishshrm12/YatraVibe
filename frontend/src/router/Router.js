import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import SearchResultList from '../pages/SearchResultList';
import Thankyou from '../pages/Thankyou';
import Weather from '../pages/Weather';
import MapPage from '../pages/MapPage';
import MyBookings from '../pages/MyBooking';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/weather' element={<Weather/>} />
        <Route path='/direction' element={<MapPage/>} />
        <Route path='/mybooking' element={<MyBookings/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<Thankyou/>} />
        <Route path='/tours/search' element={<SearchResultList/>} />
    </Routes>
  )
}

export default Router
