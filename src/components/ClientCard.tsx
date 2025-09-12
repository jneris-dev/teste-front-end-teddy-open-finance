import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { useAppContext } from "../context/AppContext";
import type { Client } from "../interfaces/client_interface";
import { toCurrencyBRL } from "../util/formats";

type ClientModuleType = "add" | "edit" | "delete" | "remove";
interface ClientProps {
  modules: ClientModuleType[];
  client: Client;
}

function ClientCard({ modules, client }: ClientProps) {
  let mods = modules;
  const { setShowModal } = useAppContext();

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center gap-3 w-full">
      <strong
        className="text-xl truncate w-full text-center"
        title={client.name}
      >
        {client.name}
      </strong>
      <div className="flex flex-col gap-1 text-center">
        <p>Salário: {toCurrencyBRL(client.salary)}</p>
        <p>Empresa: {toCurrencyBRL(client.companyValuation)}</p>
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
                  module: "saveClient",
                  onSubmit: () => {},
                  description:
                    "Cliente " +
                    client.name +
                    " adicionado aos selecionados com sucesso!",
                  title: "Cliente selecionado",
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
                  data: client,
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
                  description:
                    "Você está prestes a excluir o cliente: " + client.name,
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

export default ClientCard;
