import { RiCheckboxBlankCircleFill,RiArrowRightLine } from "react-icons/ri";


const Content =() =>{
    return(
        <section className=" min-h-[90vh] grid grid-cols-1 xl:grid-cols-8  bg-cover " style={{ backgroundImage: `url('/src/assets/img/fondo.jpg')` }}>           
                <div className=" md:col-span-4 flex items-center justify-center xl:p-24 p-4">
                    <div className="flex flex-col gap-6">
                        <h1 id="Inicio" className="text-4xl xl:text-6xl font-bold leading-[5rem] xl:leading-[6.5rem] text-gray-500 ">
                            Get More Done with
                            <span className="text-white py-2 px-6 border-8 border-white relative ml-4">SIM SAS
                            <RiCheckboxBlankCircleFill className="text-base absolute -left-5 -top-5  rounded-full text-primary p-2 box-content bg-white" />
                            <RiCheckboxBlankCircleFill className="text-base absolute -right-5 -top-5  rounded-full text-primary p-2 box-content bg-white" />
                            <RiCheckboxBlankCircleFill className="text-base absolute -left-5 -bottom-5  rounded-full text-primary p-2 box-content bg-white" />
                            <RiCheckboxBlankCircleFill className="text-base absolute -right-5 -bottom-5  rounded-full text-primary p-2 box-content bg-white" />
                            </span> 
                            </h1>
                        <p className="text-gray-300 text-lg leading-8 ">Project management software that enables your teams to collaborate, plan, analyze and manage everyday tasks</p>
                        <div className="pt-5 flex">
                            <button className="bg-[#4f9cf9] p-3 text-white rounded-[10px] flex transform transition-transform duration-500 hover:scale-110 ">
                                Try Whitepace free<RiArrowRightLine className="ml-2 mt-1.5" />
                            </button>
                            <button className="ml-4 border-2 p-3 text-white rounded-[10px] flex hover:bg-white hover:text-black ">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-4 flex  ml-6 -mt-20 xl:mt-20">
                    <img src="/src/assets/img/imgcontent.png" className="h-[50%] w-[90%] md:h-[60%] md:w-[90%] object-cover mt-20  "/>
                </div>
        </section>
    )}


export default Content;