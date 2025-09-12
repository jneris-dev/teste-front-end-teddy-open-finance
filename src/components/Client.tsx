import { PencilIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";

function Client() {
  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center gap-3 w-full">
      <strong className="text-xl">Eduardo</strong>
      <div className="flex flex-col gap-1 text-center">
        <p>Salário: R$3.500,00</p>
        <p>Empresa: R$120.000,00</p>
      </div>
      <div className="w-full flex items-center justify-between gap-4">
        <button
          type="button"
          className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
        >
          <PlusIcon size={24} />
        </button>
        <button
          type="button"
          className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
        >
          <PencilIcon size={24} />
        </button>
        <button
          type="button"
          className="p-2 rounded outline-0 border border-transparent focus:border-stone-300 cursor-pointer hover:bg-stone-100"
        >
          <TrashIcon size={24} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default Client;
