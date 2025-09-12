import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { useAppContext } from "../context/AppContext";

type ClientModuleType = "add" | "edit" | "delete" | "remove";
interface ClientProps {
  modules: ClientModuleType[];
}

function Client({ modules }: ClientProps) {
  let mods = modules;
  const { setShowModal } = useAppContext();

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center gap-3 w-full">
      <strong className="text-xl">Eduardo</strong>
      <div className="flex flex-col gap-1 text-center">
        <p>Salário: R$3.500,00</p>
        <p>Empresa: R$120.000,00</p>
      </div>
      <div
        className={
          "w-full flex items-center gap-4" +
          (modules.length === 1 ? " justify-end" : " justify-between")
        }
      >
        {mods.includes("add") && (
          <button
            type="button"
            className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
            onClick={() =>
              setShowModal({
                show: true,
                modal: {
                  module: "createClient",
                  onSubmit: () => {},
                },
              })
            }
          >
            <PlusIcon size={24} />
          </button>
        )}
        {mods.includes("edit") && (
          <button
            type="button"
            className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
            onClick={() =>
              setShowModal({
                show: true,
                modal: {
                  module: "editClient",
                  onSubmit: () => {},
                },
              })
            }
          >
            <PencilIcon size={24} />
          </button>
        )}
        {mods.includes("delete") && (
          <button
            type="button"
            className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
            onClick={() =>
              setShowModal({
                show: true,
                modal: {
                  module: "deleteClient",
                  onSubmit: () => {},
                  description: "Você está prestes a excluir o cliente: Eduardo",
                },
              })
            }
          >
            <TrashIcon size={24} className="text-red-500" />
          </button>
        )}
        {mods.includes("remove") && (
          <button
            type="button"
            className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
          >
            <MinusIcon size={24} className="text-teddy-500" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Client;
