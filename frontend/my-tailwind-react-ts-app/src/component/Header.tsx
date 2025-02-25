import React from "react";
import logo from "../../../assets/freeRoomsLogo.png";
import search_icon from "../../../assets/search_icon.svg";
import moon_icon from "../../../assets/moon_icon.svg";
import menu_icon from "../../../assets/menu_icon.svg";
import map_icon from "../../../assets/map_icon.svg";
import closed_logo from "../../../assets/freeroomsDoorClosed.png";

const Header: React.FC = () => {
  const [logoSrc, setLogoSrc] = React.useState(logo);

  const handleLogoClick = () => {
    setLogoSrc((prevLogoSrc) => (prevLogoSrc === logo ? closed_logo : logo));
  };
  return (
    <div className="navbar bg-base-100 border-b border-gray-300 w-full mb-6">
      <div className="flex-1">
        <img
          src={logoSrc}
          alt="Logo"
          className="h-10"
          onClick={handleLogoClick}
        />
        <h1 className="text-2xl text-orange-400 font-bold">FreeRooms</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2 space-x-2">
          <li>
            <button className="btn btn-square btn-outline text-orange-500 hover:text-white">
              <img src={search_icon} alt="Search Icon" className="h-6" />
            </button>
          </li>
          <li>
            <button className="btn btn-square btn-outline text-orange-500 hover:text-white">
              <img src={menu_icon} alt="Search Icon" className="h-6" />
            </button>
          </li>
          <li>
            <button className="btn btn-square btn-outline text-orange-500 hover:text-white">
              <img src={map_icon} alt="Search Icon" className="h-6" />
            </button>
          </li>
          <li>
            <button className="btn btn-square btn-outline text-orange-500 hover:text-white">
              <img src={moon_icon} alt="Search Icon" className="h-6" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
