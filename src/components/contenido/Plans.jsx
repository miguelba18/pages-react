import { RiCheckboxCircleLine } from "react-icons/ri";

const Plans = () => {
  return (
    <div className="p-8">
        <div className="text-center">
            <h1 id="Plans" className="text-7xl font-bold p-8">Choose Your Plan</h1>
            <p className="p-2<">Whether you want to get organized, keep your personal life on track. or boost workplace productivity,Evernote has the<br/> right plan for you</p>
        </div>
        <div className="xl:flex xl:px-20 ">
            <div className="border-2 border-[#ffe595] rounded-[8px] p-8 xl:w-[30%] xl:ml-10 my-20 hover:bg-[#043873] hover:text-white transform transition-transform duration-500 hover:scale-110 hover:border-0 cursor-pointer">
                <h1 className="text-2xl font-semibold " >Free</h1>
                <p className="text-3xl font-bold my-4 text-[#ffe595]">$0</p>
                <p>Capture ideas and find them quickly</p>
                <ul className="leading-[45px]">
                    <li className="flex "><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Sync unlimited devices</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]"  />10 GB monthly uploads</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />200 MB max. note size</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Customize Home dashboard and access extra widgets</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Connect primary Google Calendar account</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Add due dates,  reminders, and notificacions to your tasks</li>
                    <button className="bg-white border-2 border-[#ffe595] py-0 px-8 text-black rounded-[10px] flex hover:bg-[#4f9cf9] hover:border-0">
                        Get Started
                    </button>
                </ul>
            </div>
            <div className="border-2 border-[#ffe595] rounded-[8px] p-8 xl:w-[30%] xl:ml-10 my-20 hover:bg-[#043873] hover:text-white transform transition-transform duration-500 hover:scale-110 hover:border-0 cursor-pointer ">
                <h1 className="text-2xl font-semibold " >Free</h1>
                <p className="text-3xl font-bold my-4 text-[#ffe595]">$0</p>
                <p>Capture ideas and find them quickly</p>
                <ul className="leading-[45px]">
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Sync unlimited devices</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]"  />10 GB monthly uploads</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />200 MB max. note size</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Customize Home dashboard and access extra widgets</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Connect primary Google Calendar account</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Add due dates,  reminders, and notificacions to your tasks</li>
                    <button className="bg-white border-2 border-[#ffe595] py-0 px-8 text-black rounded-[10px] flex hover:bg-[#4f9cf9] hover:border-0">
                        Get Started
                    </button>
                </ul>
            </div>
            <div className="border-2 border-[#ffe595] rounded-[8px] p-8 xl:w-[30%] xl:ml-10 my-20 hover:bg-[#043873] hover:text-white transform transition-transform duration-500 hover:scale-110 hover:border-0 cursor-pointer ">
                <h1 className="text-2xl font-semibold " >Free</h1>
                <p className="text-3xl font-bold my-4 text-[#ffe595]">$0</p>
                <p>Capture ideas and find them quickly</p>
                <ul className="leading-[45px]">
                    <li className="flex "><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Sync unlimited devices</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]"  />10 GB monthly uploads</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />200 MB max. note size</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Customize Home dashboard and access extra widgets</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Connect primary Google Calendar account</li>
                    <li className="flex"><RiCheckboxCircleLine className="mt-4 mr-3 text-[#ffe595]" />Add due dates,  reminders, and notificacions to your tasks</li>
                    <button className="bg-white border-2 border-[#ffe595] py-0 px-8 text-black rounded-[10px] flex hover:bg-[#4f9cf9] hover:border-0">
                        Get Started
                    </button>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Plans