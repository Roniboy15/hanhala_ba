import AdminLogin from "../admin_comps/adminLogin"
import AdminHome from "../admin_comps/home"
import Home from "../client_comps/home"
import React from "react"
import { Route } from "react-router-dom"
import SumaHome from "../admin_comps/suma/home"

export const clientRoutes = () => {
    return(
      <React.Fragment>
         <Route path="/" element={<Home />} />
      </React.Fragment>
    )
  }
  
  export const adminRoutes = () => {
    return(
      <React.Fragment>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/sommermachane" element={<SumaHome />} />
        <Route path="/admin/wintermachane" element={<AdminHome />} />
        <Route path="/admin/il-reise" element={<AdminHome />} />
        <Route path="/admin/sayarim" element={<AdminHome />} />
      </React.Fragment>
             
    )
  }