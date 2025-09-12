import {
  ArrowCircleLeftIcon,
  SignOutIcon,
  UserCheckIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  show: boolean;
  onClose: () => void;
}

function MobileMenu({ show, onClose }: MobileMenuProps) {
  return (
    <div
      className={`mobile-menu fixed inset-0 z-40 duration-500 ${
        show ? "visible" : "invisible"
      }`}
    >
      <div className="w-full h-full" onClick={onClose}></div>
      <aside
        className={`w-full max-w-3xs absolute top-0 left-0 h-full shadow-xl rounded-r-2xl flex flex-col transition-transform duration-500 ${
          show ? "translate-x-0" : "-translate-x-full -ml-8"
        } ${show ? "" : "pointer-events-none"}`}
      >
        <div className="p-4 bg-transparent backdrop-blur-xl h-32 flex items-center justify-center transition-none">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="max-w-full w-auto h-auto"
          />
        </div>
        <div className="py-10 flex flex-col w-full h-full flex-1 bg-white">
          <ul className="flex flex-col gap-4">
            <li
              className={`group ${location.pathname === "/" ? "active" : ""}`}
            >
              <Link
                to="/"
                className="flex gap-3 w-full py-2 px-4 border-r-2 border-transparent group-hover:text-teddy-500 group-hover:border-r-teddy-500 group-[.active]:text-teddy-500 group-[.active]:border-r-teddy-500"
                onClick={onClose}
              >
                <UserIcon
                  size={24}
                  className="text-stone-500 group-hover:text-teddy-500 group-[.active]:text-teddy-500"
                />
                <span>Clientes</span>
              </Link>
            </li>
            <li
              className={`group ${
                location.pathname === "/selected-clients" ? "active" : ""
              }`}
            >
              <Link
                to="/selected-clients"
                className="flex gap-3 w-full py-2 px-4 border-r-2 border-transparent group-hover:text-teddy-500 group-hover:border-r-teddy-500 group-[.active]:text-teddy-500 group-[.active]:border-r-teddy-500"
                onClick={onClose}
              >
                <UserCheckIcon
                  size={24}
                  className="text-stone-500 group-hover:text-teddy-500 group-[.active]:text-teddy-500"
                />
                <span>Clientes selecionados</span>
              </Link>
            </li>
            <li className="group">
              <button
                type="button"
                className="flex gap-3 w-full py-2 px-4 border-r-2 border-transparent group-hover:text-teddy-500 group-hover:border-r-teddy-500 group-[.active]:text-teddy-500 group-[.active]:border-r-teddy-500"
              >
                <SignOutIcon
                  size={24}
                  className="text-stone-500 group-hover:text-teddy-500 group-[.active]:text-teddy-500"
                />
                <span>Sair</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="absolute -right-5 top-32 -translate-y-1/2">
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-stone-950 flex items-center justify-center text-white hover:bg-teddy-500 cursor-pointer transition-colors"
            onClick={onClose}
          >
            <ArrowCircleLeftIcon size={22} weight="fill" />
          </button>
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;
