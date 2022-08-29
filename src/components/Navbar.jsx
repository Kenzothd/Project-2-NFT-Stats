import { Outlet, useNavigate } from "react-router-dom";
import { GasPump } from "phosphor-react";
import { useEffect, useState, useRef } from "react";

function Navbar({ setSearchInput }) {
  const [gwei, setGwei] = useState();
  const searchInput = useRef();
  let navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearchInput(searchInput.current.value);
      navigate("../search");
    }
  };

  //tbc for mediaquery
  //   const navList = {};

  return (
    <>
      <nav className="bg-gray-900 border-gray-200 px-2 sm:px-2 py-3 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex gap-5">
            <a className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 fill-white stroke-blue-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>

              <p className="self-center whitespace-nowrap font-poppins">
                <span className="text-2xl font-semibold text-white italic">
                  Nifty
                </span>
                <span className="text-2xl font-semibold text-blue-500 italic">
                  Stats
                </span>
              </p>
            </a>

            <div className="justify-between items-center w-full md:flex md:w-auto ">
              <ul className=" text-slate-200 flex flex-col p-2 rounded-lg  border  md:flex-row md:space-x-1 md:mt-0 md:text-sm md:font-medium md:border-slate-400 md:border-opacity-75">
                <li>
                  <a
                    href="https://etherscan.io/gastracker"
                    className=" flex justify-between gap-1 block py-1 pr-4 pl-3 rounded hover:bg-gray-500 md:hover:bg-transparent md:hover:text-white md:p-0 "
                    target="blank"
                  >
                    <GasPump size={20} className="" />
                    Gwei
                  </a>
                </li>
                <li className="px-1 text-sm">
                  {/* {gwei?.result?.ProposeGasPrice} */}
                  12
                </li>
              </ul>
            </div>
          </div>

          <div className="relative px-1 ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              ref={searchInput}
              onKeyPress={handleSearch}
              type="text"
              id="search-navbar"
              className="block p-2 pl-10 pr-0 w-60 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Collection..."
              size="100"
            />
            <div className="flex absolute inset-y-0 right-5 items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
          </div>

          <div
            className=" hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent ">
              <li>
                <a
                  href="#"
                  className="block font-poppins text-base pr-4 pl-3 text-blue-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block font-poppins text-base pr-4 pl-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0"
                >
                  Top Market Cap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block font-poppins text-base pr-4 pl-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0"
                >
                  Minting Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block font-poppins text-base pr-4 pl-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 "
                >
                  Watchlist
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
