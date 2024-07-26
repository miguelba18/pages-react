

const Galeria = () => {
    return (
        <div>
            <h1 id="Galeria" className="text-center text-6xl font-bold">Galeria</h1>
            <div className="grid grid-cols-3 gap-4 justify-center p-40 w-full">
                <div className="flex flex-col">
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 1" className="w-full shadow-xl transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 4" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 7" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                </div>
                <div className="flex flex-col">
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 2" className="w-full shadow-xl transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 5" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 8" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                </div>
                <div className="flex flex-col">
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 3" className="w-full shadow-xl transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 6" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                    <img src="/src/assets/imggaleria/image1.jpg" alt="Image 9" className="w-full shadow-xl mt-6 transform transition-transform duration-500 hover:scale-105 cursor-pointer rounded-[4px]" />
                </div>
            </div>
        </div>
    );
}

export default Galeria;
