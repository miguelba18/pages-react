import { RiArrowRightLine } from "react-icons/ri";

const SecuDatos = () => {
  return (
    <section className=" min-h-[50vh] xl:min-h-[90vh] grid grid-cols-1 xl:grid-cols-8 ">           
                <div className=" md:col-span-4 flex items-center justify-center xl:pl-[22%] p-4 -mt-[18%]">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl xl:text-6xl font-bold leading-[4rem] xl:leading-[4.5rem] text-black mt-[20%] xl:mt-0 ">
                            Tus datos 100% seguros con nosotros
                            </h1>
                            
                        <p className="text-black text-[15px] leading-6 -mt-3 font-sans ">La aplicación almacena tus notas y se guardan en un formato abierto, por lo que siempre tendrás acceso a ellas. Utiliza cifrado de extremo a extremo (E2EE) para proteger sus notas y garantizar que nadie más que usted pueda acceder a ellas.</p>
                        <div className="pt-5 flex">
                        <button className="flex mb-2 justify-center items-center gap-4 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3] ">
                                Read more<RiArrowRightLine className="ml-2 mt-1.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-4 flex ml-[15%] xl:ml-0  mt-[3%] xl:mt-[10%] pb-8 xl:p-0">
                    <img src="/src/assets/img/roundsecurity.png" className="h-[100%] w-[80%] xl:h-[60%] xl:w-[70%] object-cover >  "/>
                </div>
           
        </section>
  )
}

export default SecuDatos