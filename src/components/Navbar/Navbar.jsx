import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '../../utils';
import { removeUser } from '../../redux/slices/user.slice';
import { PATH } from '../../routes/path';
import 'animate.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // const currentUser = getLocalStorage("user");
  const { currentUser } = useSelector((state) => state.user);
  // console.log("🚀 ~ Navbar ~ currentUser:", currentUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogOut = () => {
    dispatch(removeUser(null));
    removeLocalStorage("user");
    removeLocalStorage("token");
    navigate(PATH.HOME);
    window.location.reload();
  };


  return (
    <>
      <nav className={`w-full z-[990] py-2 bg-rose-700 smm:bg-black lg:bg-rose-700`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* logo */}
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo-koi.jpg" className="h-10 rounded-full" alt="Koikoi Logo" />
            <span
              className="self-center text-2xl font-bold whitespace-nowrap text-white"
            >
              KoiKoi
            </span>
          </a>

          {/* dropdown */}
          <div className='relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            {/* Dropdown user-dropdown */}
            {currentUser ? (
              <button
                type="button"
                className="flex items-center font-bold rounded-full md:me-0 focus:ring-4 px-1 focus:ring-gray-300 hover:underline duration-300"
                id="user-menu-button"
                aria-expanded={dropdownVisible ? 'true' : 'false'}
                onClick={toggleDropdown}
              >
                {currentUser.avatar ? (
                  <img className="w-10 h-10 rounded-full object-cover" src={currentUser.avatar} />
                ) : (
                  <img className="w-10 h-10 rounded-full object-cover" src="/default-ava.png" />
                )}
                <span className={`ml-3 text-white smm:text-white leading-7 uppercase smm:w-28 truncate`}>
                  {currentUser.name}
                </span>
              </button>
            ) : (

              <button
                type="button"
                className=" text-sm bg-main rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"
                id="user-menu-button"
                aria-expanded={dropdownVisible ? 'true' : 'false'}
                onClick={toggleDropdown}
              >
                <img className="h-10" src="/default-ava.png" />
              </button>
            )}

            {/* Dropdown user-dropdown */}
            <div
              className={`absolute z-[999] my-4 text-base right-2/4  list-none bg-white divide-y divide-gray-100 rounded-lg shadow animate__animated animate__fadeInDown top-8 ${dropdownVisible ? '' : 'hidden'}`}
              id="user-dropdown"
            >
              {currentUser ? (
                <>
                  <div className="px-4 py-3">
                    <span className="block text-base text-gray-900 ">{currentUser.name}</span>
                    <span className="block text-sm  text-gray-500 truncate ">{currentUser.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => { navigate(PATH.PROFILE) }}
                    >
                      Dashboard
                    </li>
                    <li className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => { navigate(PATH.PROFILE) }}
                    >
                      Cart
                    </li>
                    <li>
                      <button
                        className="block rounded px-4 w-full py-2 text-base text-left text-red-800 hover:bg-red-100 "
                        onClick={handleLogOut}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <div className='px-3 w-40 py-3  space-x-5 mx-auto'>
                  <ul className="py-2 space-y-2" aria-labelledby="user-menu-button">
                    <li>
                      <button
                        className="block text-center px-5 w-full rounded py-2 text-base text-gray-700 hover:bg-gray-300"
                        onClick={() => navigate(PATH.LOGIN)}
                      >
                        Log In
                      </button>
                    </li>
                    <li>
                      <button
                        className="block text-center px-5 w-full rounded py-2 text-base text-gray-700 hover:bg-gray-300"
                        onClick={() => navigate(PATH.REGISTER)}
                      >
                        Register
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Dropdown main menu button for mobile */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded={menuVisible ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
              </svg>
            </button>
          </div>

          {/* main menu */}
          <div className={`items-center w-full md:flex md:w-auto md:order-1 ${menuVisible ? 'block animate__animated animate__fadeInDown' : 'hidden'} duration-500`}>
            <ul className="menu-phone flex flex-col font-medium p-4 md:p-0 mt-4 border smm:text-white border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <a aria-current="page" className={`text-white block py-2 px-3 rounded md:p-0 hover:text-black hover:bg-gray-100 md:hover:bg-transparent duration-300`} href="/">
                  Home
                </a>
              </li>
              <li>
                <a aria-current="page" className={`block py-2 px-3 rounded text-white hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:p-0 duration-300`} href="/">
                  About
                </a>
              </li>
              <li>
                <a aria-current="page" className={`block py-2 px-3 rounded text-white hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:p-0 duration-300`} href="/">
                  Services
                </a>
              </li>
              {/* <li>
                <a href="#" className={`block py-2 px-3 rounded text-white hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:p-0 duration-300`}>
                  Pricing
                </a>
              </li> */}
              <li>
                <a href="#" className={`block py-2 px-3 rounded text-white hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:p-0 duration-300`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div >
      </nav >
    </>
  )
}

export default Navbar
