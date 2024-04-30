import { RiArrowRightLine } from "react-icons/ri";

const SecuDatos = () => {
  return (
    <section className=" min-h-[50vh] xl:min-h-[90vh] grid grid-cols-1 xl:grid-cols-8 ">           
                <div className=" md:col-span-4 flex items-center justify-center xl:pl-[22%] p-4 -mt-[18%]">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl xl:text-6xl font-bold leading-[4rem] xl:leading-[6.5rem] text-black mt-[20%] xl:mt-0 ">
                            100% your data
                            </h1>
                            
                        <p className="text-black text-[15px] leading-6 -mt-3 font-sans ">The app is open source and your notes are saved to an open format,so you´ll always have access to them. Uses End-To-End encryption (E2EE) to secure your notes and ensure no-one-but yourself can access them.</p>
                        <div className="pt-5 flex">
                        <button className="bg-[#4f9cf9] px-8 py-3 text-white rounded-[7px] flex transform transition-transform duration-500 hover:scale-110 ">
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