import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

import { ChevronDown } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import logo from "@/assets/images/images.jpg";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { FaHome } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";

import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentsDetails,
  RouteIndex,
  RouteUsers,
} from "@/helpers/RouteName";

import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);

  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger className="absolute -right-8 top-17 md:block hidden z-50" />
      {/* Logo */}
      <SidebarHeader className="flex items-center  p-4">
        {/* <div>
          <img src={logo} className="w-30 rounded-md" />
        </div> */}
      </SidebarHeader>

      <SidebarContent className="pt-5 mt-3">
        {/* MAIN MENU */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteIndex}>
                  <FaHome />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteBlog}>
                      <ImBlogger />
                      <span>Blog</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteCommentsDetails}>
                      <FaCommentAlt />
                      <span>Comments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}

            {user && user.isLoggedIn && user?.user?.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteCategoryDetails}>
                      <BiSolidCategory />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={RouteUsers}>
                      <FaUserGroup />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* CATEGORY MENU */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarMenuButton asChild>
              <CollapsibleTrigger className="flex items-center w-full">
                <MdCategory />
                <span>Categories</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarMenuButton>

            <CollapsibleContent>
              <SidebarMenu>
                {categoryData?.categories?.map((category) => (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton asChild>
                      <Link to={RouteBlogByCategory(category.slug)}>
                        <TbCategory2 />
                        <span>{category.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user?.user?.avatar} />
                </Avatar>
                <div className="ine-height: 2">
                  <p>{user?.user?.name}</p>
                  <p>{user?.user?.role}</p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
