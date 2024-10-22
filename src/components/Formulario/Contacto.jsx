import { RiMailFill, RiWhatsappFill,RiPagesFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

const EmailLink = ({ email }) => {
  const handleEmailClick = () => {
    window.location.href = "mailto:miguel_bahamonro@fet.edu.co";
  };

  EmailLink.propTypes = {
    email: PropTypes.string.isRequired,
  };

  return (
    <p
      className="flex justify-center text-md mb-4 cursor-pointer transform transition-transform duration-500 hover:scale-110  hover:rounded-xl hover:bg-white hover:text-blue-600 "
      onClick={handleEmailClick}
    >
      <RiMailFill className="mt-1 mr-6" />
      {email}
    </p>
  );
};

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [texto, setTexto] = useState("");
  
  const maxLength = 255;

  const handleNumber = (event) => {
    const phoneNumber = event.target.value.replace(/\D/g, "");
    if (phoneNumber.length <= 10) {
      setCelular(phoneNumber);
    }
  };

  const handleChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setTexto(newText);
    }
    else{
      toast.error("El mensaje no puede tener más de 255 caracteres.", {autoClose: 1200});
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (celular.length !== 10) {
      toast.error("El numero de telefono debe tener 10 digitos", {autoClose: 1700});
      return;
    }

    const data = { nombre, email, celular, texto };

    try {
      const response = await fetch("http://localhost:8080/inquietud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la inquietud");
      }

      const result = await response.text();
      toast.success(result);
      setNombre("");
      setEmail("");
      setCelular("");
      setTexto("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al enviar la inquietud");
    }
  };

  return (
    <div className="xl:flex p-6  bg-gray-50">
      <div className="border-2 w-[90%] xl:w-[60%] xl:h-[60%] rounded-[8px] bg-white ml-[7%] p-10 xl:px-[100px] shadow-2xl ">
        <h1
          id="Form"
          className="text-xl xl:text-3xl font-bold xl:px-8 text-center mt-4"
        >
          Formulario
        </h1>
        <form onSubmit={handleSubmit} className="xl:p-8">
          <div className="md:flex  ">
            <div className="xl:mt-0 mt-4">
              <label className="text-lg">
                Nombre*
                <br />
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border-2 rounded-[4px] h-[30px]"
                required
              />
            </div>
            <div className="xl:px-20 mt-4 xl:my-0">
              <label className="text-lg">
                Correo*
                <br />
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 rounded-[4px] h-[30px]"
                placeholder="Ejemplo@gmail.com"
                required
              />
            </div>
          </div>
          <div className="xl:flex">
            <div className="my-8">
              <label className="text-lg">
                Celular*
                <br />
              </label>
              <input
                type="text"
                name="celular"
                value={celular}
                onChange={handleNumber}
                className="border-2 rounded-[4px] h-[30px]"
                required
              />
              <div>{celular.length}/10</div>
              
            </div>
          </div>
          <div className="mt-6">
            <label className="text-sm xl:text-lg">
              Compártenos tus Inquietudes y estaremos <br />
              ¡Encantados! de ayudarte
              <br />
            </label>
            <textarea
              value={texto}
              onChange={handleChange}
              className="border-2 rounded-[4px] w-[80%] mt-4 min-h-[150px] resize-none"
              required
            />
            <div className="text-gray-500 text-sm">
              {maxLength - texto.length} caracteres restantes
            </div>
          </div>
          <button
            type="submit"
            className="w-[80%] px-8 py-4 rounded-xl mt-8 bg-secundary text-white hover:bg-primary hover:text-white transform transition-transform duration-500 hover:scale-110"
          >
            Enviar
          </button>
        </form>
      </div>

      <div className="bg-secundary rounded-[8px] xl:w-[30%] text-white xl:-ml-[5%] shadow-2xl mt-8 xl:mt-0 p-10 xl:p-0">
        <h1 className="text-4xl font-bold py-5 xl:py-20 text-center">
          Contacto
        </h1>
        <div className="xl:px-20">
          <h3 className="text-2xl text-center font-semibold mb-2">
            Envíanos un correo aquí
          </h3>
          <EmailLink email="simsas@gmail.com" />

          <h3 className="text-2xl text-center font-semibold mt-20">
            Escríbenos
          </h3>
          <a href="https://wa.link/n3ef7p" target="BLANK">
            <p className="flex justify-center text-md mb-4 transform transition-transform duration-500 hover:scale-110 hover:rounded-xl hover:bg-white hover:text-blue-600">
              <RiWhatsappFill className="mt-1 mr-6" />
              +57 3115374029
            </p>
          </a>

          <h3 className="text-2xl text-center font-semibold mt-20">
            Visita nuestra pagina e informate
          </h3>
          <a href="https://www.dian.gov.co/" target="BLANK">
            <p className="flex justify-center text-md mb-4 transform transition-transform duration-500 hover:scale-110 hover:rounded-xl hover:bg-white hover:text-blue-600">
              <RiPagesFill className="mt-1 mr-6" />
              Dian
            </p>
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default Contacto;
