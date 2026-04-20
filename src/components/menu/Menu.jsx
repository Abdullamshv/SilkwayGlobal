import React from "react";
import { Link } from "react-router-dom";
import { useMenuData } from "../../data/menuData";

export default function Menu({ closeMenu }) {
  const menuItems = useMenuData();

  return (
    <ul className="font-[montserrat]  flex flex-col gap-2">
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link
            to={item.link}
            onClick={closeMenu} 
            className="block my-1 px-4 py-3 mx-4 hover:bg-white/40 hover:scale-105 rounded-lg cursor-pointer transition font-medium text-gray-800"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}