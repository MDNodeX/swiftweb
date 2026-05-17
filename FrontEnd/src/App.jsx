import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Layout from "./Layout/layout";
import {
  RouteAbout,
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteBlogSection,
  RouteCategoryDetails,
  RouteCommentsDetails,
  RouteContact,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteService,
  RouteSignIn,
  RouteSignUp,
  RouteUsers,
} from "./helpers/RouteName";
import { Toaster } from "sonner";

import Index from "./Pages/Index";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import CategoryDetails from "./Pages/Category/CategoryDetails";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import AddBlog from "./Pages/Blog/AddBlog";
import BlogDetails from "./Pages/Blog/BlogDetails";
import EditBlog from "./Pages/Blog/EditBlog";
import SingleBlogDetails from "./Pages/SingleBlogDetails";
import BlogByCategory from "./Pages/Blog/BlogByCategory";
import SearchResult from "./Pages/SearchResult";
import Comments from "./Pages/Comments";
import User from "./Pages/User";
import BlogSection from "./Pages/BlogSection";
import About from "./Pages/About";
import Service from "./Pages/Service";
import Contact from "./Pages/Contact";

import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          {/* PUBLIC */}
          <Route index element={<Index />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch} element={<SearchResult />} />
          <Route path={RouteBlogSection} element={<BlogSection />} />
          <Route path={RouteAbout} element={<About />} />
          <Route path={RouteService} element={<Service />} />
          <Route path={RouteContact} element={<Contact />} />

          {/* LOGGED USER */}
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentsDetails} element={<Comments />} />
          </Route>

          {/* ADMIN */}
          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteUsers} element={<User />} />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
          </Route>
        </Route>

        {/* AUTH */}
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
