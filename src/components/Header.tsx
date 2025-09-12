import { ListIcon } from "@phosphor-icons/react/dist/ssr";

function Header() {
  return (
    <header className="w-full h-auto p-4 bg-white shadow z-10 relative">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer md:hidden">
            <ListIcon size={24} className="text-stone-600" />
          </button>
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="max-w-full w-auto h-auto"
          />
        </div>
        <div className="md:flex hidden">
          <ul className="flex items-center gap-8">
            <li className="group active">
              <a
                href=""
                className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500"
              >
                Clientes
              </a>
            </li>
            <li className="group">
              <a
                href=""
                className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500"
              >
                Clientes selecionados
              </a>
            </li>
            <li className="group">
              <a
                href=""
                className="border-b border-transparent hover:border-teddy-500 hover:text-teddy-500 group-[.active]:border-teddy-500 group-[.active]:text-teddy-500"
              >
                Sair
              </a>
            </li>
          </ul>
        </div>
        <div>
          Olá, <strong>Usuário</strong>!
        </div>
      </nav>
    </header>
  );
}

export default Header;