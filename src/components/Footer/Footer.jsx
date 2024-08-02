import { RiCopyrightLine } from "react-icons/ri";
import { useState } from "react";

const Footer = () => {
  const [politicas, setPoliticas] = useState(false);

  const handleOpenPoliticas = () => {
    setPoliticas(true);
  };

  const handleClosePoliticas = () => {
    setPoliticas(false);
  };

  return (
    <div className="bg-cover bg-[#0146cf]/90 text-white relative">
      <div className="text-center">
        <h1 id="Footer" className="text-6xl font-bold pt-32 leading-[72px]">
          Conoce a SIM SAS hoy
        </h1>
        <p className="text-xl p-5">
          Conoce nuestras políticas. <br /> Da click en nuestro botón para que
          puedas leerlas.
        </p>
        <div className="flex justify-center items-center mb-2">
          <button
            onClick={handleOpenPoliticas}
            className="overflow-hidden w-32 p-2 h-12 bg-white text-black/60 border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
          >
            Empieza!
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 text-white duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Explora!
            </span>
          </button>
        </div>

        {politicas && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
            <div className="relative w-4/5 md:w-1/2 max-h-[80vh] overflow-y-auto p-5 bg-white rounded-md shadow-md">
              <h2 className="text-2xl font-bold">Políticas de privacidad</h2>
              <div className="flex flex-col items-start mt-4">
                <div className="text-black">
                  <span className="text-semibold text-3xl">
                    Políticas de Privacidad
                  </span>
                  <br />
                  <span className="text-xl text-semibold">1. Introducción</span>
                  <br /> Esta Política de Privacidad describe cómo [Nombre de la
                  Ciudad o de la Entidad] recopila, utiliza y protege la
                  información personal de los usuarios en [nombre del sitio web]
                  (en adelante, el Sitio). Al utilizar este Sitio, usted acepta
                  las prácticas descritas en esta política. <br />
                  2. Información que Recopilamos Información Personal:
                  Recopilamos información personal que usted proporciona al
                  registrarse, llenar formularios o comunicarse con nosotros.
                  Esto puede incluir nombre, dirección, correo electrónico y
                  detalles fiscales. Información de Uso: Recopilamos información
                  sobre su uso del Sitio, como su dirección IP, navegador,
                  páginas visitadas y tiempo de permanencia en el Sitio. <br />
                  3. Cómo Usamos la Información Para Proporcionar Servicios:
                  Utilizamos su información para procesar solicitudes, responder
                  a consultas y brindarle servicios relacionados con los
                  impuestos municipales. Para Mejorar el Sitio: Usamos datos de
                  uso para mejorar nuestro Sitio y adaptar el contenido a sus
                  necesidades. Para Comunicarnos: Podemos usar su información
                  para enviarle actualizaciones sobre cambios en el Sitio,
                  notificaciones importantes y otros mensajes relacionados con
                  nuestros servicios. <br />
                  4. Protección de la Información Implementamos medidas de
                  seguridad adecuadas para proteger su información personal
                  contra acceso no autorizado, alteración o divulgación. Sin
                  embargo, ninguna medida de seguridad es infalible y no podemos
                  garantizar la seguridad absoluta. <br />
                  5. Compartición de la Información Con Proveedores de
                  Servicios: Podemos compartir su información con proveedores de
                  servicios que nos ayudan a operar el Sitio y ofrecer nuestros
                  servicios, siempre que estén obligados a mantener la
                  confidencialidad de la información. Por Requerimiento Legal:
                  Podemos divulgar su información si así lo exige la ley o para
                  proteger nuestros derechos y los derechos de otros. <br />
                  6. Derechos del Usuario Usted tiene derecho a acceder,
                  corregir o eliminar su información personal. Puede ejercer
                  estos derechos contactándonos a través de [dirección de
                  contacto]. <br />
                  7. Cambios en la Política Podemos actualizar esta Política de
                  Privacidad de vez en cuando. Publicaremos cualquier cambio en
                  esta página y le notificaremos si los cambios son
                  significativos. <br />
                  8. Contacto
                  <br /> Para cualquier pregunta o inquietud sobre esta
                  <br />
                  Política de Privacidad contáctenos en [dirección de contacto].
                  <br /> <span className="text-semibold text-3xl">
                    Términos y Condiciones
                  </span> 
                  <br /> 1. Aceptación de los Términos Al utilizar [nombre del
                  sitio web], usted acepta estos Términos y Condiciones. Si no
                  está de acuerdo con estos términos, no debe utilizar el Sitio.{" "}
                  <br />
                  2. Uso del Sitio Acceso y Uso: Usted se compromete a utilizar
                  el Sitio solo para fines legales y de acuerdo con las leyes y
                  regulaciones aplicables. Responsabilidad: Es responsable de
                  cualquier actividad realizada bajo su cuenta y debe mantener
                  la confidencialidad de sus credenciales de acceso. <br />
                  3. Contenido del Sitio Propiedad Intelectual: Todo el
                  contenido del Sitio, incluyendo textos, gráficos, logos y
                  software, está protegido por derechos de propiedad intelectual
                  y no puede ser reproducido sin nuestro consentimiento expreso.
                  Enlaces a Sitios Externos: El Sitio puede contener enlaces a
                  sitios externos. No somos responsables del contenido ni de las
                  prácticas de privacidad de estos sitios. <br />
                  4. Limitación de Responsabilidad Disponibilidad del Sitio: No
                  garantizamos que el Sitio esté disponible en todo momento o
                  libre de errores. Responsabilidad: No seremos responsables por
                  daños directos, indirectos, incidentales o consecuenciales que
                  resulten del uso del Sitio o de la imposibilidad de acceder a
                  él. <br />
                  5. Modificaciones de los Términos Podemos modificar estos
                  Términos y Condiciones en cualquier momento. Los cambios serán
                  efectivos al publicarse en el Sitio. Su uso continuado del
                  Sitio después de cualquier cambio constituye su aceptación de
                  los nuevos términos. <br />
                  6. Ley Aplicable Estos Términos y Condiciones se rigen por las
                  leyes de [jurisdicción] y cualquier disputa será resuelta en
                  los tribunales competentes de [jurisdicción]. <br />
                  7. Contacto Para cualquier pregunta sobre estos Términos y
                  Condiciones, contáctenos en [dirección de contacto].
                </div>
                <button
                  onClick={handleClosePoliticas}
                  className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xl pb-6">Contáctanos</p>
        <div className="flex justify-center">
          <img
            src="/src/assets/img/appleblanco.png"
            className="h-16 m-2"
            alt="Apple"
          />
          <img
            src="/src/assets/img/winblanco.png"
            className="h-16 m-2"
            alt="Windows"
          />
          <img
            src="/src/assets/img/androidblanco.png"
            className="h-16 m-2"
            alt="Android"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-10">
        <p className="flex">
          <RiCopyrightLine className="mt-1 mr-1" />
          2024 SIM SAS LLC.
        </p>
      </div>
    </div>
  );
};

export default Footer;
