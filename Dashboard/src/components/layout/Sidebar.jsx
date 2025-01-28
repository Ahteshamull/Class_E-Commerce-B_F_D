import React from "react";
import {
  MdOutlineAddHomeWork,
  MdOutlineDashboard,
  MdOutlineAddchart,
} from "react-icons/md";
import { LuReplaceAll } from "react-icons/lu";
import { VscCalendar, VscCheckAll, VscExpandAll } from "react-icons/vsc";
import { MdStoreMallDirectory } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div>
      <nav className=" flex h-screen w-[220px] flex-col overflow-auto bg-white px-6 py-6 font-[sans-serif] shadow-lg select-none">
        <div className="flex cursor-pointer flex-wrap items-center">
          <div className="relative">
            <img
              src="https://readymadeui.com/profile_2.webp"
              className="h-12 w-12 rounded-full border-white"
            />
            <span className="absolute right-0 bottom-0 block h-3 w-3 rounded-full border-2 border-white bg-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold text-[#3949ab]">John Doe</p>
            <p className="mt-0.5 text-xs text-gray-500">D.IN Medicine</p>
          </div>
        </div>

        <ul className="mt-10 flex-1 space-y-8 pl-3">
          <li>
            <Link
              to={""}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <MdOutlineDashboard className="mr-4 h-[18px] w-[18px]" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={"add-product"}
              href="javascript:void(0)"
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <VscExpandAll className="mr-4 h-[18px] w-[18px]" />
              <span>Add Product</span>
            </Link>
          </li>
          <li>
            <Link
              to={"all-products"}
              href="javascript:void(0)"
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <MdOutlineAddHomeWork className="mr-4 h-[18px] w-[18px]" />
              <span>All Products</span>
            </Link>
          </li>
          <li>
            <Link
              to={"add-cetagory"}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <MdOutlineAddchart className="mr-4 h-[18px] w-[18px]" />
              <span>Add Cetagory</span>
            </Link>
          </li>
          <li>
            <Link
              to={"all-cetagory"}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <LuReplaceAll className="mr-4 h-[18px] w-[18px]" />
              <span>All Cetagory</span>
            </Link>
          </li>
          <li>
            <Link
              to={"add-store"}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <IoStorefrontSharp className="mr-4 h-[18px] w-[18px]" />
              <span>Add Store</span>
            </Link>
          </li>
          <li>
            <Link
              to={"all-stores"}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <MdStoreMallDirectory className="mr-4 h-[18px] w-[18px]" />
              <span>All Store</span>
            </Link>
          </li>
          <li>
            <Link
              to={""}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                className="mr-4 h-[18px] w-[18px]"
                viewBox="0 0 682.667 682.667"
              >
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000" />
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#a)"
                  transform="matrix(1.33 0 0 -1.33 0 682.667)"
                >
                  <path
                    fill="none"
                    strokeMiterlimit={10}
                    strokeWidth={40}
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    data-original="#000000"
                  />
                  <path
                    d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                    data-original="#000000"
                  />
                </g>
              </svg>
              <span>Inbox</span>
            </Link>
          </li>
        </ul>
        <ul className="mt-8 space-y-8 pl-3">
          <li>
            <Link
              to={""}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="mr-4 h-[18px] w-[18px]"
                viewBox="0 0 512 512"
              >
                <circle cx={256} cy="378.5" r={25} data-original="#000000" />
                <path
                  d="M256 0C114.516 0 0 114.497 0 256c0 141.484 114.497 256 256 256 141.484 0 256-114.497 256-256C512 114.516 397.503 0 256 0zm0 472c-119.377 0-216-96.607-216-216 0-119.377 96.607-216 216-216 119.377 0 216 96.607 216 216 0 119.377-96.607 216-216 216z"
                  data-original="#000000"
                />
                <path
                  d="M256 128.5c-44.112 0-80 35.888-80 80 0 11.046 8.954 20 20 20s20-8.954 20-20c0-22.056 17.944-40 40-40s40 17.944 40 40-17.944 40-40 40c-11.046 0-20 8.954-20 20v50c0 11.046 8.954 20 20 20s20-8.954 20-20v-32.531c34.466-8.903 60-40.26 60-77.469 0-44.112-35.888-80-80-80z"
                  data-original="#000000"
                />
              </svg>
              <span>Help Center</span>
            </Link>
          </li>
          <li>
            <Link
              to={""}
              className="relative left-0 flex items-center rounded-md text-sm font-semibold text-[#3949ab] transition-all hover:left-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="mr-4 h-[18px] w-[18px]"
                viewBox="0 0 6.35 6.35"
              >
                <path
                  d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                  data-original="#000000"
                />
              </svg>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
