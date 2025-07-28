const Login = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-dark-purple font-inter">
      <div className="flex flex-col items-center gap-4 bg-delft-blue rounded-3xl p-8 text-platinum">
        <h2 className="font-medium text-2xl">Vaquitapp</h2>
        <div className="bg-ultra-violet p-2 rounded-[20px]">
          <button className=" bg-dark-cyan w-[200px] p-2 rounded-xl">
            Entrar
          </button>
          <button className=" w-[200px] p-2">Crear cuenta</button>
        </div>
        <form action="" className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              className="placeholder:text-gray-500 p-2 focus:outline-dark-cyan focus:outline-2 rounded-xl border border-dark-cyan"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pass">Contraseña</label>
            <input
              type="password"
              id="pass"
              placeholder="*****"
              className="placeholder:text-gray-500 p-2 focus:outline-dark-cyan focus:outline-2 rounded-xl border border-dark-cyan"
            />
          </div>
          <button className="w-full p-2 bg-dark-cyan rounded-xl">Entrar</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
