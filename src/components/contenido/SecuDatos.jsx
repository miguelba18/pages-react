const SecuDatos = () => {
  return (
    <section className=" xl:flex mb-4  ">
      <div className=" md:col-span-4 flex justify-center  p-4  ">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl xl:text-6xl font-bold leading-[4rem] xl:leading-[4.5rem] text-black mt-8 ">
            Tus datos 100% seguros con nosotros
          </h1>

          <p className="text-black text-[15px] leading-6 -mt-3 font-sans ">
            La aplicación almacena tus notas y se guardan en un formato abierto,
            por lo que siempre tendrás acceso a ellas. Utiliza cifrado de
            extremo a extremo (E2EE) para proteger sus notas y garantizar que
            nadie más que usted pueda acceder a ellas.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <img
          src="../../public/assets/img/marcas/dian.png"
          className="h-[50%] w-[80] object-cover "
        />
      </div>
    </section>
  );
};

export default SecuDatos;
