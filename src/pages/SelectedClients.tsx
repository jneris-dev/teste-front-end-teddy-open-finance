import Layout from "../components/Layout";
import Header from "../components/Header";
import Client from "../components/Client";
import Button from "../components/Button";

function SelectedClients() {
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => {
                  return <Client key={index} modules={["remove"]} />;
                })}
              </div>
            </div>
            <div className="w-full h-auto flex items-center justify-center">
              <Button
                type="button"
                onPress={() => {}}
                label="Limpar clientes selecionados"
                style="outline"
                classes="h-10"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SelectedClients;
