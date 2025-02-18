import React from "react";
import { FaBagShopping } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { Link } from "react-router";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import Container from "../layout/Container";
import { FcAbout } from "react-icons/fc";
import { FaIdCard, FaInfoCircle } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { useSelector } from "react-redux";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

 


  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className=" flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex  items-center gap-2 rounded  font-medium${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-medium text-xs font-roboto"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Shop",
    icon: FaBagShopping,
    href: "/shop",
  },
  {
    label: "About Us",
    icon: MdContactPage,
    Link: "/about",
  },
  {
    label: "Card",
    icon: FaIdCard,
    Link: "/card",
  },
];

function NavList() {
   const loginUserdata = useSelector((state) => state.user.value);
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />

      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          // href={icon === FaBagShopping ? "/shop" : "/about"}
          variant="small"
          color="gray"
          className="font-medium text-blue-500"
        >
          <Link
            to={
              icon === FaBagShopping
                ? "/shop"
                : icon === MdContactPage
                ? "/about"
                : "/card"
            }
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-gray-900 font-roboto"> {label}</span>
            </MenuItem>
          </Link>
         
        </Typography>
      ))}
      {loginUserdata ? (
        <h2>{loginUserdata.name}</h2>
      ) : (
        <Link to={"/login"}>
          <Button size="sm" variant="text">
            <span className="font-roboto text-sm font-medium text-primary">
              Log In
            </span>
          </Button>
        </Link>
      )}
    </ul>
  );
}

export function EcommerceNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto  p-2 lg:rounded-full lg:pl-6">
      <Container>
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900 ">
          <Link to={"/"}>
            <Typography
              as="a"
              className="mr-4 ml-2 cursor-pointer py-1.5 text-primary font-roboto font-bold"
            >
              AH Shop
            </Typography>
          </Link>
          <div className="mx-auto hidden lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen}>
          <NavList />
        </MobileNav>
      </Container>
    </Navbar>
  );
}
