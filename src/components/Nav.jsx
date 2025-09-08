import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-darkBg text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Ishaan Taneja</h1>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <ul className={`md:flex md:gap-6 ${open ? "flex flex-col gap-4 mt-4" : "hidden"}`}>
          {["Home", "Projects", "Blog", "Skills", "Contact", "Login"].map((item) => (
            <li key={item}>
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-primary">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
