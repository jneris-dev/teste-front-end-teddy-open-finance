function Welcome() {
  return (
    <section className="welcome relative w-full h-dvh p-4">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col gap-5 w-full max-w-lg">
          <h1 className="sm:text-4xl text-3xl text-center">
            Olá, seja bem-vindo!
          </h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite o seu nome:"
              className="px-3 border-2 border-stone-200 rounded w-full h-14 outline-0 focus:border-teddy-500 placeholder:text-stone-400 transition-colors"
            />
            <input
              type="submit"
              value="Entrar"
              className="bg-teddy-500 text-white text-xl font-bold w-full h-14 rounded cursor-pointer hover:bg-teddy-600 transition-colors outline-0 focus:bg-teddy-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;