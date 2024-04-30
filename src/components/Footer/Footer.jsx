import {
  RiArrowRightLine,
  RiAppsFill,
  RiArrowDownSLine,
  RiEarthFill,
  RiCopyrightLine,
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className=" text-center">
        <h1 id="Footer" className="text-6xl font-bold pt-32 leading-[72px]">
          Try SIM SAS
          <br /> today
        </h1>
        <p className="text-xl p-7">
          Get started for free. <br /> Add your whole teams as your needs grow.
        </p>
        <div className="flex justify-center pb-7">
          <button className="bg-[#4f9cf9] py-3 px-6 text-white rounded-[10px] flex transform transition-transform duration-500 hover:scale-110">
            Try Taskey free
            <RiArrowRightLine className="ml-2 mt-1.5" />
          </button>
        </div>
        <p className="text-xl pb-6">On a big team? Contact sales</p>
        <div className="flex justify-center">
          <img src="/src/assets/img/appleblanco.png" className="h-16 m-2" />
          <img src="/src/assets/img/winblanco.png" className="h-16 m-2" />
          <img src="/src/assets/img/androidblanco.png" className="h-16 m-2" />
        </div>
      </div>

      <div className="pt-32 md:flex  items-center">
        <div className="xl:w-1/6  ml-[11%] mb-8">
          <a href="" className="text-2xl font-bold relative pl-6  ">
            <RiAppsFill className="absolute -left-2 m-1 " />
            SIM SAS
          </a>
          <p className="pt-4">
            SIM SAS was created for
            <br /> the new ways we live and
            <br /> work. We make a better
            <br /> workspace around the world
          </p>
        </div>
        <div className="p-8 xl:p-16 -mt-[2%]">
          <h1 className="text-lg font-bold ">Product</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Overview
          </p>
          <p className="pt-2 text-[15px hover:text-yellow-300 cursor-pointer">
            Pricing
          </p>
          <p className="pt-2 text-[15px hover:text-yellow-300 cursor-pointer">
            Customer stories
          </p>
        </div>
        <div className="p-8 xl:p-16 -mt-[2%]">
          <h1 className="text-lg font-bold">Resources</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Blog
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Guides y tutorials
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Help center
          </p>
        </div>
        <div className="p-8 -mt-[4%]">
          <h1 className="text-lg font-bold">Company</h1>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            About us
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Careers
          </p>
          <p className="pt-2 text-[15px] hover:text-yellow-300 cursor-pointer">
            Media kit
          </p>
        </div>
        <div className="p-10 -mt-[1%]">
          <h1 className="text-xl font-bold pb-4">Try It Today</h1>
          <p className="text-[13px] mb-4">
            Get started for free. Add your
            <br /> whole teams as your needs grow.
          </p>
          <button className="bg-[#4f9cf9] py-3 px-5  xl:py-3 md:px-5  text-white rounded-[7px] flex transform transition-transform duration-500 hover:scale-110">
            Star today
            <RiArrowRightLine className="ml-2 mt-1.5 xl:ml-2 xl:mt-1.5" />
          </button>
        </div>
      </div>

      <div className=" border-t-[1px] border-gray-600 my-2 "></div>

      <div className="xl:flex justify-center text-center">
        <div className="border-w-2 my-2"></div>
        <div className="inline-block">
          <div className="ml-2 p-10 xl:ml-32 xl:p-10 flex relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
            <RiEarthFill className="mt-1 mr-1" />
            <span>English</span>
            <RiArrowDownSLine className="mt-[6px] ml-1" />
          </div>
        </div>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Terms y privacy
        </p>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Security
        </p>
        <p className="ml-2 p-10 inline-block relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 cursor-pointer hover:text-yellow-300 ">
          Status
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <p className="flex">
          <RiCopyrightLine className="mt-1 mr-1" />
          2024 SIM SAS LLC.
        </p>
        <div className="flex mt-1">
          <p className="px-4 ">
            <RiFacebookCircleFill />
          </p>
          <p className="px-4">
            <RiLinkedinBoxFill />
          </p>
          <p className="px-4">
            <RiTwitterXFill />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
