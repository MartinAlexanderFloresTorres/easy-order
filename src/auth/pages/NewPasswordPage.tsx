const NewPasswordPage = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[450px] border border-zinc-800 w-full mx-auto bg-zinc-900 px-6 pb-10 rounded-md flex flex-col gap-6">
      <div className="w-full pt-5">
        <legend className="text-center text-lg md:text-2xl font-extrabold text-white uppercase">Nueva Contraseña</legend>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-white font-bold" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="password"
          name="password"
          id="password"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-white font-bold" htmlFor="repeatPassword">
          Repetir contraseña
        </label>
        <input
          className="p-2 text-sm focus-visible:outline  focus-visible:outline-zinc-700 rounded-md bg-zinc-800"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          autoComplete="off"
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="submit"
          className="px-5 py-2 text-[14px] w-full rounded-md text-center bg-orange-700 hover:bg-orange-600 transition-all duration-300 uppercase font-extrabold"
        >
          Cambiar contraseña
        </button>
      </div>
    </form>
  );
};

export default NewPasswordPage;
