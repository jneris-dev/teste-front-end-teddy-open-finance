import { useEffect, useState, type FormEvent } from "react";
import { XIcon } from "@phosphor-icons/react";

import { useAppContext } from "../context/AppContext";
import type { Client } from "../interfaces/client_interface";
import Input from "./Input";

function Modal() {
  const {
    showModal,
    setShowModal,
    handleCreateClient,
    handleEditClient,
    handleDeleteClient,
  } = useAppContext();

  if (!showModal.modal || !showModal.show) return null;

  const { title, module, description, data } = showModal.modal;

  const [formClient, setFormClient] = useState<Client>({
    name: "",
    salary: "",
    companyValuation: "",
  });

  function submitForm(event: FormEvent) {
    event.preventDefault();

    if (module === "createClient") handleCreateClient(formClient);

    if (module === "editClient" && data)
      handleEditClient(Number(data.id), formClient);

    setShowModal({ show: false, modal: null });
  }

  function deleteClient(id: number) {
    handleDeleteClient(id);
    setShowModal({ show: false, modal: null });
  }

  useEffect(() => {
    if (data) setFormClient(data);
  }, [data]);

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
              onSubmit={submitForm}
            >
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome:"
                value={formClient.name}
                onChange={setFormClient}
                validator={"O nome é obrigatório."}
                height="medium"
                required
              />
              <Input
                type="currency"
                id="salary"
                name="salary"
                placeholder="Digite o salário:"
                value={formClient.salary}
                onChange={setFormClient}
                validator={"O valor do salário é obrigatório."}
                height="medium"
                required
              />
              <Input
                type="currency"
                id="companyValuation"
                name="companyValuation"
                placeholder="Digite o valor da empresa:"
                value={formClient.companyValuation}
                onChange={setFormClient}
                validator={"O valor da empresa é obrigatório."}
                height="medium"
                required
              />
              <input
                type="submit"
                value={
                  module === "createClient"
                    ? "Criar cliente"
                    : "Salvar alterações"
                }
                className="bg-teddy-500 text-white font-bold w-full h-10 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
              />
            </form>
          ) : module === "deleteClient" ? (
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-stone-600">{description}</p>
              <button
                type="button"
                className="bg-teddy-500 text-white font-bold w-full h-10 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
                onClick={() => data && deleteClient(Number(data.id))}
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
