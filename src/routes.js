/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import Login from "views/pages/Login.jsx";
import Register from "views/pages/Register.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import UserProfile from "views/pages/UserProfile.jsx";

const routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Pages",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth"
      },
      {
        path: "/user-profile",
        name: "UserProfile",
        mini: "UP",
        component: UserProfile,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "nc-icon nc-ruler-pencil",
    state: "formsCollapse",
    views: [{
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin"
      }
    ]
  },
  {
    icon: "nc-icon nc-pin-3",
    path: "/google-maps",
    name: "Mapa",
    component: GoogleMaps,
    layout: "/admin"
    
  },
  {
    name: "Sair",
    icon: "nc-icon nc-minimal-left",
    path: "/login",
    component: Login,
    layout: "/auth"
  }
];

export default routes;