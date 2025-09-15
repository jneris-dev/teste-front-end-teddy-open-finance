import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ClientCard from "../components/ClientCard";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";

import { useAppContext } from "../context/AppContext";

function Home() {
  let location = useLocation();
  const { users, setLoadingUsers, setShowModal, filters, setFilters } =
    useAppContext();

  useEffect(() => {
    if (location) {
      setLoadingUsers(true);
    }
  }, [location, filters]);

  return (
    <Layout>
      <section className="home relative w-full h-auto">
        <Header />
        <div className="w-full h-auto min-h-dvh px-4 pt-8 pb-20">
          <div className="container mx-auto flex flex-col gap-6">
            <div className="w-full h-auto flex flex-col gap-2">
              <div className="flex xs:flex-row flex-col gap-2 items-center justify-between">
                <div className="flex items-center gap-2">
                  <p>
                    <strong>
                      {users.clients
                        ? users.clients.length * users.totalPages
                        : "--"}
                    </strong>{" "}
                    clientes encontrados:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Clientes por página:</p>
                  <select
                    name="perPage"
                    id="perPage"
                    className="border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 rounded p-1 outline-0 focus:border-teddy-500 cursor-pointer text-sm"
                    value={filters.limit}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        limit: Number(e.target.value),
                        page: 1,
                      })
                    }
                  >
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.clients?.map((client, index) => {
                  return (
                    <ClientCard
                      key={index}
                      modules={["add", "edit", "delete"]}
                      client={client}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full h-auto flex items-center justify-center">
              <button
                type="button"
                className="w-full h-10 items-center justify-center bg-transparent border-2 border-teddy-500 text-teddy-500 rounded hover:bg-teddy-500 hover:text-white transition-colors flex gap-2 font-bold cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    modal: {
                      module: "createClient",
                    },
                  })
                }
              >
                Criar cliente
              </button>
            </div>
            <div className="w-full h-auto flex items-center justify-center">
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
