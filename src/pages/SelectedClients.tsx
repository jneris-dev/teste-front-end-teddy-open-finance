import Layout from "../components/Layout";
import Header from "../components/Header";
import ClientCard from "../components/ClientCard";
import Button from "../components/Button";
import { useAppContext } from "../context/AppContext";

function SelectedClients() {
  const { auth, handleClearClients } = useAppContext();

  return (
    <Layout>
      <section className="selected-clients relative w-full h-auto">
        <Header />
        <div className="w-full h-auto min-h-dvh px-4 pt-8 pb-20">
          <div className="container mx-auto flex flex-col gap-6">
            <div className="w-full h-auto flex flex-col gap-2">
              <div className="flex xs:flex-row flex-col gap-2 items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Clientes selecionados:</h1>
                </div>
              </div>
              {auth && auth.clients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {auth.clients.map((client, index) => {
                    return (
                      <ClientCard
                        key={index}
                        modules={["remove"]}
                        client={client}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="xs:text-start text-center">
                  Você não possui clientes selecionados.
                </p>
              )}
            </div>
            <div className="w-full h-auto flex items-center justify-center">
              <Button
                type="button"
                onPress={handleClearClients}
                label="Limpar clientes selecionados"
                variant="outline"
                classes="h-10"
                disabled={
                  auth ? (auth.clients.length > 0 ? false : true) : true
                }
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SelectedClients;
