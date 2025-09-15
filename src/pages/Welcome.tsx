import { useState } from "react";

import Input from "../components/Input";
import { useAppContext } from "../context/AppContext";

function Welcome() {
  const [authUser, setAuthUser] = useState({
    name: "",
  });
  const { handleLogin, auth } = useAppContext();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authUser.name) {
      handleLogin(authUser.name);
    }
  };

  return (
    <section className="welcome relative w-full h-dvh p-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col gap-5 w-full max-w-lg">
          <h1 className="sm:text-4xl text-3xl text-center">
            Olá, seja bem-vindo!
          </h1>
          {auth && Object.keys(auth).length > 0 && (
            <div className="flex flex-col gap-2">
              <p>Ultimo acesso:</p>
              <button
                type="button"
                className="flex p-3 rounded border-1 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 w-full flex-col gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer transition-colors text-start"
                onClick={() => handleLogin(auth.userName)}
              >
                <span className="text-lg font-medium">{auth.userName}</span>
                <div className="flex gap-1 text-sm">
                  <strong>Data e Hora:</strong>
                  <span>{auth.startSession}</span>
                </div>
              </button>
              <div className="flex mt-2 items-center justify-center text-neutral-300 dark:text-neutral-700 gap-5">
                <hr className="h-1 flex-1 mt-1" />
                <p className="text-center">ou</p>
                <hr className="h-1 flex-1 mt-1" />
              </div>
            </div>
          )}
          <form onSubmit={handleAuth} className="flex flex-col gap-3">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite o seu nome:"
              value={authUser.name}
              onChange={setAuthUser}
              height="large"
              validator="Campo de nome obrigatório"
              required
            />
            <input
              type="submit"
              value="Entrar"
              className="bg-teddy-500 text-white text-xl font-bold w-full h-14 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600 disabled:opacity-70 disabled:pointer-events-none"
              disabled={authUser.name === ""}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
