import {
  CaretLeftIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

import { useAppContext } from "../context/AppContext";
import React from "react";

function Pagination() {
  const { users, filters, setFilters } = useAppContext();

  const { currentPage, totalPages } = users;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push("...");
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 4) {
      endPage = 5;
    } else if (currentPage > totalPages - 4) {
      startPage = totalPages - 4;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbersToRender = getPageNumbers();

  const handlePageClick = (page: string | number) => {
    if (page !== "...") {
      setFilters({
        ...filters,
        page: Number(page),
      });
    }
  };

  return (
    <nav
      className="flex items-center gap-x-1 font-medium"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-hidden focus:bg-neutral-200 dark:focus:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => {
          if (filters.page > 1) {
            setFilters({ ...filters, page: filters.page - 1 });
          }
        }}
      >
        <CaretLeftIcon size={20} />
        <span className="sr-only">Previous</span>
      </button>
      <div className="flex items-center gap-x-1">
        {pageNumbersToRender.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <div className="inline-block">
                <button
                  type="button"
                  className="group min-h-9.5 min-w-9.5 flex justify-center items-center text-neutral-400 dark:text-neutral-800 hover:text-teddy-500 p-2 text-sm rounded-lg focus:outline-hidden focus:bg-neutral-200 disabled:opacity-50 disabled:pointer-events-none"
                  disabled
                >
                  <DotsThreeIcon size={22} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={`min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer
                  ${
                    page === currentPage
                      ? "bg-teddy-500 text-neutral-100"
                      : "text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:bg-neutral-200 dark:focus:bg-neutral-800"
                  }`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        type="button"
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-hidden focus:bg-neutral-200 dark:focus:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => {
          if (filters.page < totalPages) {
            setFilters({ ...filters, page: filters.page + 1 });
          }
        }}
      >
        <span className="sr-only">Next</span>
        <CaretRightIcon size={20} />
      </button>
    </nav>
  );
}

export default Pagination;
