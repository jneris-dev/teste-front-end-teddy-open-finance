import { XIcon } from "@phosphor-icons/react";

import { useAppContext } from "../context/AppContext";

function Modal() {
  const { showModal, setShowModal } = useAppContext();

  if (!showModal.modal || !showModal.show) return null;

  const { title, onSubmit, module, description, data } = showModal.modal;

  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white pt-4 p-6 rounded-lg shadow-lg space-y-4 relative">
        <div className="flex items-end justify-between">
          <strong className="text-xl">
            {module === "createClient"
              ? "Criar cliente:"
              : module === "editClient"
              ? "Editar cliente:"
              : module === "deleteClient"
              ? "Excluir cliente:"
              : title}
          </strong>
          <button
            type="button"
            className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer"
            onClick={() => setShowModal({ show: false, modal: null })}
          >
            <XIcon size={20} weight="bold" />
          </button>
        </div>
        <div className="w-full h-auto">
          {module === "createClient" || module === "editClient" ? (
            <form
              className="w-full h-auto flex flex-col gap-3"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Digite o nome:"
                className="px-3 border-2 border-stone-200 rounded w-full h-10 outline-0 focus:border-teddy-500 placeholder:text-stone-400 transition-colors"
                value={data?.name || ""}
              />
              <input
                type="text"
                name="salary"
                id="salary"
                placeholder="Digite o salário:"
                className="px-3 border-2 border-stone-200 rounded w-full h-10 outline-0 focus:border-teddy-500 placeholder:text-stone-400 transition-colors"
                value={data?.salary || ""}
              />
              <input
                type="text"
                name="companyValuation"
                id="companyValuation"
                placeholder="Digite o valor da empresa:"
                className="px-3 border-2 border-stone-200 rounded w-full h-10 outline-0 focus:border-teddy-500 placeholder:text-stone-400 transition-colors"
                value={data?.companyValuation || ""}
              />
              <input
                type="submit"
                value="Criar cliente"
                className="bg-teddy-500 text-white font-bold w-full h-10 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
              />
            </form>
          ) : module === "deleteClient" ? (
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-stone-600">{description}</p>
              <button
                type="button"
                className="bg-teddy-500 text-white font-bold w-full h-10 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
                onClick={() => onSubmit(data?.id)}
              >
                Excluir cliente
              </button>
            </div>
          ) : module === "saveClient" ? (
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-stone-600">{description}</p>
              <button
                type="button"
                className="bg-teddy-500 text-white font-bold w-full h-10 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
                onClick={() => setShowModal({ show: false, modal: null })}
              >
                Entendi
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
