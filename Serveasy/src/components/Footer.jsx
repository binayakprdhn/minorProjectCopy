// import React from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <footer className="container min-w-full shadow-none rounded-none">
      <div className=" fixed-bottom mt-300 min-h-[500px] bg-primary  overflow-hidden z-[1]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block fill-white w-100"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-15 text-[18px] px-4">
          <div className="flex flex-col">
            <h2 className="text-3xl text-grey-500 my-4 font-semibold text-black py-2 uppercase">
              Footer
            </h2>
            <p>
              Serveasy is a multifaceted web app seamlessly blending meal
              recommendations and e-commerce, offering users personalized dining
              suggestions while incorporating a scheduling system, reviews, and
              ratings for an enhanced culinary experience.
            </p>
          </div>
          <div className="flex flex-col ">
            <ul>
              <li className="text-[22px] list-none font-semibold text-black py-2 uppercase">
                Links
              </li>
              <li className="my-4 list-none ">
                <NavLink
                  to="/Order"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Order
                </NavLink>
              </li>
              <li className="my-4 list-none">
                <NavLink
                  to="/Account"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Account
                </NavLink>
              </li>
              <li className="my-4 list-none">
                <NavLink
                  to="/Setting"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <ul>
              <li className="text-[22px] list-none font-semibold text-black py-2 uppercase">
                Information
              </li>
              <li className="my-4 list-none">Email: serveasy@gmail.com</li>
              <li className="my-4 list-none">
                <a href="tel:9800000000">Phone: +977 9800000000</a>
              </li>
            </ul>
            <div className="flex space-x-4 justify-center">
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaLinkedinIn size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaTwitter size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaInstagram size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
          <div className="flex flex-col ">
            <ul>
              <li className="text-[22px] list-none font-semibold text-black py-2 uppercase">
                General
              </li>
              <li className="my-4 list-none">About Us</li>
              <li className="my-4 list-none">Foods</li>
              <li className="my-4 list-none">Contacts</li>
            </ul>
          </div>
          {/* <div className="mt-10 flex">
            <div className="h-full flex items-center justify-center mb-5">
              <form action="" className="w-96 relative">
                <input
                  type="email"
                  className="w-full text-gray-800 p-4 h-10 rounded-full focus:outline-none focus:border border-warning"
                />
                <button
                  className="bg-primary-400 px-8 py-2 rounded-full text-white absolute top-0 right-0"
                  type="Submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div> */}
        </div>
        <h6 className="text-center w-50 h-20 mb-1">
          &copy; Copy rights reserved {Year}
        </h6>
        <h6 className="text-center w-50 h-20 mb-1">
          &copy; Made by Binayak, Swornima, Sauharda & Yudhir
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
