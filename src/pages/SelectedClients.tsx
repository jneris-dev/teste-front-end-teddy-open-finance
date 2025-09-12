import Layout from "../components/Layout";
import Header from "../components/Header";
import Client from "../components/Client";
import Button from "../components/Button";

const mokedClients = [
  {
    id: 327,
    name: "Test Timeout",
    salary: 120,
    companyValuation: 1500000,
    createdAt: "2025-09-07T14:58:43.008Z",
    updatedAt: "2025-09-07T14:58:43.008Z",
  },
  {
    id: 328,
    name: "Ralf",
    salary: 140,
    companyValuation: 18000,
    createdAt: "2025-09-07T15:13:10.177Z",
    updatedAt: "2025-09-07T15:13:10.177Z",
  },
];

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
                {mokedClients.map((client, index) => {
                  return (
                    <Client key={index} modules={["remove"]} client={client} />
                  );
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
