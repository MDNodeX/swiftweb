import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/images/logo-2.png";
import { PiSignInDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { IoMdSearch } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
// icons
import { FaHome } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineRoundaboutRight } from "react-icons/md";

import {
  RouteBlogByCategory,
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteBlog,
  RouteBlogSection,
  RouteAbout,
  RouteService,
} from "@/helpers/RouteName";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import usericon from "@/assets/images/user.png";
import { FaUser } from "react-icons/fa6";
import { FaBloggerB } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
// import { useSidebar } from "./ui/sidebar";
import { useFetch } from "@/hooks/useFetch";

const Topbar = () => {
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  // const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Implement logout logic here
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        return showToast(data.message || "Logout failed!", "error");
      }
      showToast(data.message || "Logout successful!", "success");
      dispatch(removeUser());
      navigate(RouteIndex);
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex justify-between items-center h-16 fixed top-0 left-0 w-full z-50 md:px-10 gap-3 px-5 bg-[#f8f9fa] border-b">
      <div className="flex justify-center items-center md:w-[150px] w-900">
        <img src={logo} width="100%" height="auto" />
      </div>
      <div className="w-[500px] px-10">
        <div
          className={`md:relative absolute md:block bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? "block" : "hidden"}`}
        >
          <SearchBox />
        </div>
      </div>
      <div>
        <nav className="lg:block hidden">
          <ul className="flex space-x-4">
            <li className="flex items-center gap-1 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <FaHome />
              <Link to={RouteIndex}>Home</Link>
            </li>
            <li className="flex items-center gap-1 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <RiCustomerService2Fill />
              <Link to={RouteService}>Services</Link>
            </li>
            <li className="flex items-center gap-1 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <MdOutlineRoundaboutRight />
              <Link to={RouteAbout}>About</Link>
            </li>
            <li className="flex items-center gap-1 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <ImBlogger />
              <Link to={RouteBlogSection}>Blog</Link>
            </li>

            <li className="flex items-center gap-1 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <DropdownMenu modal={false}>
                {/* Trigger */}
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center gap-1 cursor-pointer">
                    <MdCategory />
                    Category
                  </span>
                </DropdownMenuTrigger>

                {/* Content */}
                <DropdownMenuContent
                  align="start"
                  sideOffset={5}
                  className="w-56"
                >
                  {categoryData?.categories?.map((category) => (
                    <DropdownMenuItem key={category.category_id} asChild>
                      <Link to={RouteBlogByCategory(category.slug)}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block "
        >
          <IoMdSearch size={25} />
        </button>
        {!user.isLoggedIn ? (
          <Button
            type="submit"
            size="sm"
            className=" hover:-translate-y-0.1 active:scale-[0.00] bg-[#003057] text-white hover:bg-[#050A30]"
          >
            <Link
              to={RouteSignIn}
              className="flex items-center gap-1 text-md font-semibold"
            >
              <PiSignInDuotone />
              Sign In
            </Link>
          </Button>
        ) : (
          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src={user.user.avatar} />
                    <AvatarFallback>
                      text
                      <img src={usericon} width={40} />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p>{user.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Common menu */}
                  <DropdownMenuItem asChild>
                    <Link to={RouteProfile}>
                      <FaUser />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={RouteBlogAdd}>
                      <FaBloggerB />
                      Create Blog
                    </Link>
                  </DropdownMenuItem>
                  {/* 🔥 ADMIN MENU */}
                  {/* user && user.isLoggedIn && user?.user?.role === "admin" */}
                  {user?.user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link to={RouteBlog}>Blog</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/comments">Comments</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/categories">Categories</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/users">Users</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxRLine color="red" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      {/* Mobile / Tablet Menu icon */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        type="button"
        className="lg:hidden block"
      >
        <TiThMenu size={28} />
      </button>
      {/* Mobile / Tablet Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-16 right-5 w-64 bg-white shadow-lg rounded-lg border p-4 lg:hidden z-50"
        >
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <FaHome />
              <Link to={RouteIndex}>Home</Link>
            </li>

            <li className="flex items-center gap-2 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <RiCustomerService2Fill />
              <Link to={RouteService}>Services</Link>
            </li>

            <li className="flex items-center gap-2 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <MdOutlineRoundaboutRight />
              <Link to={RouteAbout}>About</Link>
            </li>

            <li className="flex items-center gap-2 text-md font-semibold text-[#003057] hover:text-[#c8102e]">
              <ImBlogger />
              <Link to={RouteBlogSection}>Blog</Link>
            </li>

            {/* Categories */}
            <div className="border-t pt-3">
              <p className="flex items-center gap-2 font-semibold text-[#003057] mb-2">
                <MdCategory />
                Categories
              </p>

              <div className="flex flex-col gap-2 ml-2">
                {categoryData?.categories?.map((category) => (
                  <Link
                    key={category.category_id || category.id}
                    to={RouteBlogByCategory(category.slug)}
                    className="text-sm hover:text-[#c8102e]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Topbar;
