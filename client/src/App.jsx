import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/User/Dashboard/Dashboard";

import Private from "./components/Routes/UserRoutes/Private";
import AdminRoute from "./components/Routes/AdminRoutes/AdminRoute";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import SendNotification from "./pages/Admin/SendNotification/SendNotification";

import SubmittedRequests from "./pages/Admin/SubmittedRequests/SubmittedRequests";
import CreateCategory from "./pages/Admin/CreateCategory/CreateCategory";

import "antd/dist/reset.css";

import Search from "./pages/Search/Search";
import Profile from "./pages/User/Profile/Profile";

import TravelHistory from "./pages/User/TravelHistory/History";

import UserNotification from "./pages/User/UserNotification/UserNotification";

import Users from "./pages/Admin/Users/Users";
import SeeandDo from "./pages/See&Do/SeeandDo";

import SellerRoute from "./components/Routes/SellerRoutes/SellerRoute";
import SellerDashboard from "./pages/Seller/SellerDashboard/SellerDashboard";
import SellerProfile from "./pages/Seller/SellerProfile/SellerProfile";

import SellerReports from "./pages/Seller/SellerReports/SellerReports";
import UserReports from "./pages/User/UserReports/UserReports";

import TravelEssentials from "./pages/TravelEssentials/TravelEssentials";
import CommonPhrase from "./pages/CommonPhrase/CommonPhrase";
import SaudiWheather from "./pages/SaudiWheather/SaudiWheather";

import SafarifyCalendar from "./pages/SafarifyCalendar/SafarifyCalendar.jsx";
import Experiences from "./pages/Experiences/Experiences";

import Payment from "./pages/Payment/Payment";
import Orders from "./pages/User/Orders/Orders.jsx";
import Chat from "./pages/Chat/Chat";
import "./App.css";

import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Messages";
import SingleReport from "./pages/Admin/SingleReport/SingleReport";

import PlanPayment from "./pages/PlanPayment/PlanPayment";

import SellerPayment from "./pages/SellerPayment/SellerPayment";
import ExplorerRequests from "./pages/Seller/ExplorerRequests/ExplorerRequests";

import HomeZones from "./pages/Services/Services.jsx";
import CatgeoryBaseAttraction from "./pages/CatgeoryBaseService/CatgeoryBaseService.jsx";
import ExploreAll from "./pages/ExploreAll/ExploreAll.jsx";
import AboutSaudi from "./pages/AboutSaudi/AboutSaudi.jsx";
import SafetyTravelTips from "./pages/SafetyTravelTips/SafetyTravelTips.jsx";

import TravelRegulations from "./pages/TravelRegulations/TravelRegulations.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import AddService from "./pages/Seller/SellerQualification/AddService.jsx";
import Services from "./pages/Seller/Services/Services.jsx";
import UpdateService from "./pages/Admin/UpdateService/UpdateService.jsx";
import SingleService from "./pages/SingleService/SingleService.jsx";
import CatgeoryBaseService from "./pages/CatgeoryBaseService/CatgeoryBaseService.jsx";

const App = () => {
  const [theme] = useTheme();
  return (
    <>
      <div id={theme}>
        <Routes>
          <Route path="/" element={<SeeandDo />} />
          <Route path="/search" element={<Search />} />

          <Route path="/travel-essentials" element={<TravelEssentials />} />
          <Route path="/common-phrases" element={<CommonPhrase />} />
          <Route path="/saudi-wheather" element={<SaudiWheather />} />
          <Route path="/safarify-calendar" element={<SafarifyCalendar />} />
          <Route path="/message" element={<Message />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:sellerId" element={<Chat />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/single-service/:slug" element={<SingleService />} />

          <Route path="/dashboard" element={<Private />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />

            <Route path="user/orders" element={<Orders />} />
            <Route path="user/reports" element={<UserReports />} />

            <Route path="user/history" element={<TravelHistory />} />
            <Route path="user/notifications" element={<UserNotification />} />
            <Route path="user/reports" element={<SellerReports />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />

            <Route
              path="admin/send-notification"
              element={<SendNotification />}
            />

            <Route
              path="admin/submitted-reports"
              element={<SubmittedRequests />}
            />
            <Route path="admin/single-report/:id" element={<SingleReport />} />
            <Route path="admin/create-category" element={<CreateCategory />} />

            <Route path="admin/user" element={<Users />} />
          </Route>
          <Route path="/dashboard" element={<SellerRoute />}>
            <Route path="seller" element={<SellerDashboard />} />
            <Route path="seller/profile" element={<SellerProfile />} />

            <Route
              path="seller/explorer-requests"
              element={<ExplorerRequests />}
            />
            <Route path="seller/add-service" element={<AddService />} />
            <Route path="seller/services" element={<Services />} />
            <Route path="seller/services/:slug" element={<UpdateService />} />

            <Route path="seller/reports" element={<SellerReports />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/See&Do" element={<SeeandDo />} />

          <Route path="/services" element={<HomeZones />} />
          <Route path="/category/:name" element={<CatgeoryBaseService />} />
          <Route path="/exploreAll" element={<ExploreAll />} />

          <Route path="/SafetyTravelTips" element={<SafetyTravelTips />} />
          <Route path="/aboutSaudi" element={<AboutSaudi />} />
          <Route path="/travelRegulations" element={<TravelRegulations />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
