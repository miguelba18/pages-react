

const Marcas = () => {
  return (
    <div className="bg-white  flex flex-col gap-8 items-center justify-center">
        <h1 className="text-6xl font-bold mb-[5%] text-center">Our sponsors</h1>
        <div className="flex flex-col xl:flex-row items-center gap-8 mb-24 ">
            <img src="/public/img/Apple.png" className="w-14 xl:mr-32"/>
            <img src="/public/img/Microsoft.png" className="w-[250px] xl:mr-32"/>
            <img src="/public/img/Slack.png" className="w-[250px] xl:mr-32"/>
            <img src="/public/img/google.jpg" className="w-[250px]"/>
        </div>
    </div>
  )
}

export default Marcas