import React from 'react'
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import About from '../pages/About'
import Home from '../pages/Home'

const AppRouter = () => {
  return (
    <Router>
      {/* <NavBar/> */}
      <Routes>

        <Route path="/" element={<Dashboard/>}>
          <Route index element={<Home/>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          {/* <Route index element={<Home}
          <Route privaterouter>

          </Route> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter