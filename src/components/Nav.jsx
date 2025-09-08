import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-darkBg text-white w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Ishaan Taneja</h1>
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <ul
          className={`md:flex md:gap-6 md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-darkBg md:bg-transparent transition-all duration-300 ${
            open ? "flex flex-col gap-4 p-4" : "hidden md:flex"
          }`}
        >
          {["Home", "Projects", "Blog", "Skills", "Contact", "Login"].map(
            (item) => (
              <li key={item} className="text-center md:text-left">
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
