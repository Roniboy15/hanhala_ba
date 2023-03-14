import AdminHome from "../components/admin_comps/home"
import Home from "../components/client_comps/home"
import React from "react"
import { Route } from "react-router-dom"
import SumaHome from "../components/admin_comps/suma/sumaHome"
import Forms from "../components/admin_comps/forms"
import AboutUs from "../components/client_comps/contact"

export const clientRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<AboutUs/>} />
    </React.Fragment>
  )
}

export const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/sommermachane" element={<SumaHome />} />
      <Route path="/admin/wintermachane" element={<AdminHome />} />
      <Route path="/admin/il-reise" element={<AdminHome />} />
      <Route path="/admin/sayarim" element={<AdminHome />} />
      <Route path="/admin/forms" element={<Forms />} />
    </React.Fragment>
  )
}