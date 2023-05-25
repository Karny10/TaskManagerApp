import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./Components/Login"
import Home from "./Components/Home"

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/home" element = {<Home/>}/>

    </Routes>
   </BrowserRouter>
  )
}

export default App
