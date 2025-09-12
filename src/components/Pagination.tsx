import {
  CaretLeftIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

function Pagination() {
  return (
    <nav
      className="flex items-center gap-x-1 font-medium"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-stone-800 hover:bg-stone-200 focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        aria-label="Previous"
        disabled
      >
        <CaretLeftIcon size={20} />
        <span className="sr-only">Previous</span>
      </button>
      <div className="flex items-center gap-x-1">
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 flex justify-center items-center bg-teddy-500 text-stone-100 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-stone-300 disabled:opacity-50 disabled:pointer-events-none"
          aria-current="page"
        >
          1
        </button>
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 flex justify-center items-center text-stone-800 hover:bg-stone-200 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          2
        </button>
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 flex justify-center items-center text-stone-800 hover:bg-stone-200 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          3
        </button>
        <div className="inline-block">
          <button
            type="button"
            className="group min-h-9.5 min-w-9.5 flex justify-center items-center text-stone-400 hover:text-teddy-500 p-2 text-sm rounded-lg focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            <DotsThreeIcon size={22} />
          </button>
        </div>
        <button
          type="button"
          className="min-h-9.5 min-w-9.5 flex justify-center items-center text-stone-800 hover:bg-stone-200 py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          8
        </button>
      </div>
      <button
        type="button"
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-stone-800 hover:bg-stone-200 focus:outline-hidden focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        aria-label="Next"
      >
        <span className="sr-only">Next</span>
        <CaretRightIcon size={20} />
      </button>
    </nav>
  );
}

export default Pagination;
