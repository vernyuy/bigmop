"use client";
import logo from '../assets/log.png'

import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="w-full px-8 py-3 bg-transparent">
      <header>
        <nav className="flex justify-between items-center gap-2 sm:gap-0 md:gap-2  text-black">
          <div className="flex items-center">
            <img src={logo} alt="" />
          </div>
          <div
            className={`sm:relative z-20 bg-white sm:bg-transparent sm:z-0 duration-1000 sm:min-h-fit sm:w-auto absolute top-[10%] left-0 w-full flex items-center px-8 ${
              menu ? " block" : "hidden sm:block"
            }`}
          >
            <ul className="flex sm:flex-row flex-col sm:items-center gap-5 w-full sm:w-fit">
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/pharmacy"}>About us</Link>
              </li>
              <li>
                <Link to={"/shop"}>Services</Link>
              </li>
              <li>
                <Link to={"/features"}>Categories</Link>
              </li>
              <li>
                <Link to={"/question-response"}>Contact</Link>
              </li>
              <li className="sm:hidden flex flex-row flex-wrap items-center justify-center gap-2 w-full pb-5">
                <Link
                  to="/signin"
                  className="border border-green-600 text-green-600 px-4 text-[12px] py-1 rounded-md whitespace-nowrap w-[35%]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 text-[12px] py-1 rounded-md whitespace-nowrap w-[35%]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-4">
              <div className="gap-4 hidden sm:flex">
                <Link
                  to="/signin"
                  className="border border-green-600 text-green-600 px-4 text-[12px] py-1 rounded-md whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 text-[12px] py-1 rounded-md whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>

            <div className="sm:hidden flex items-center duration-500">
              <div
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                {menu ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
