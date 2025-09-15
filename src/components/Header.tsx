import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoonIcon, SunDimIcon, ListIcon } from "@phosphor-icons/react";

import MobileMenu from "./MobileMenu";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  let location = useLocation();

  const { theme, handleToggleTheme } = useAppContext();
  const { auth, handleLogout } = useAuthContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className="w-full h-auto p-4 bg-white dark:bg-neutral-950 shadow z-10 relative">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 rounded outline-0 border border-transparent focus:border-neutral-300 cursor-pointer md:hidden"
              onClick={() => setShowMobileMenu(true)}
            >
              <ListIcon
                size={24}
                className="text-neutral-600 dark:text-neutral-300"
              />
            </button>
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="max-w-full w-auto h-auto dark:[filter:invert(1)_hue-rotate(180deg)_brightness(1)_contrast(1)]"
            />
          </div>
          <div className="md:flex hidden">
            <ul className="flex items-center gap-8">
              <li
                className={
                  "group" + (location.pathname === "/" ? " active" : "")
                }
              >
                <Link
                  to="/"
                  className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500"
                >
                  Clientes
                </Link>
              </li>
              <li
                className={
                  "group" +
                  (location.pathname === "/selected-clients" ? " active" : "")
                }
              >
                <Link
                  to="/selected-clients"
                  className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500"
                >
                  Clientes selecionados
                </Link>
              </li>
              <li className="group">
                <button
                  type="button"
                  className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
          <div className="flex gap-2 items-center">
            <span>
              Olá, <strong>{auth?.userName}</strong>!
            </span>
            <button
              type="button"
              className="p-2 rounded outline-0 border border-transparent cursor-pointer"
              onClick={handleToggleTheme}
            >
              {theme ? (
                <SunDimIcon size={24} className="text-neutral-400" />
              ) : (
                <MoonIcon size={24} className="text-neutral-700" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        show={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />
    </>
  );
}

export default Header;
