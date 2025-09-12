import Client from "../components/Client";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";

function Home() {
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
                    <strong>16</strong> clientes encontrados:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Clientes por página:</p>
                  <select
                    name="perPage"
                    id="perPage"
                    className="border border-stone-300 rounded p-1 outline-0 focus:border-teddy-500 cursor-pointer text-sm"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(16)].map((_, index) => {
                  return (
                    <Client key={index} modules={["add", "edit", "delete"]} />
                  );
                })}
              </div>
            </div>
            <div className="w-full h-auto flex items-center justify-center">
              <button
                type="button"
                className="w-full h-10 items-center justify-center bg-transparent border-2 border-teddy-500 text-teddy-500 rounded hover:bg-teddy-500 hover:text-white transition-colors flex gap-2 font-bold cursor-pointer"
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
