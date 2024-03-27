const Form = () => {
  return (
    <div className=" px-[40%] py-10">
      <div className=" border-2 w-[100%] h-[60%] rounded-[8px] ">
        <h1 className="text-3xl font-bold text-gray-500 px-8 mt-4">
          Formulario
        </h1>
        <form className=" p-8">
          <div className="">
            <label className="text-lg">Nombre*</label>
            <input
              type="text"
              className="border-2 rounded-[8px] h-[30px] w-[100%]"
              placeholder=""
              required
            />
          </div>
          <div className="my-6">
            <label className="text-lg">
              Email*
              <br />
            </label>
            <input
              type="email"
              className="border-2 rounded-[8px] h-[30px] w-[100%]"
              placeholder="Ejemplo@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-lg">Celular*</label>
            <input
              type="number"
              className="border-2 rounded-[8px] h-[30px] w-[100%]"
              placeholder=""
              required
            />
          </div>
          <button
            type="submit"
            className="w-[100%] px-8 py-2 rounded-xl mt-8 bg-primary text-white hover:bg-[#4f9cf9] hover:text-black transform transition-transform duration-500 hover:scale-110  "
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
