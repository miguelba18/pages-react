import Header from '../../components/nav/Header';
import Content from '../../components/contenido/Content';
import SecuDatos from '../../components/contenido/SecuDatos';
import Marcas from '../../components/contenido/Marcas';
import Footer from '../../components/Footer/Footer';
import Carrusel from '../../components/Carousel/Carrusel';

import Contacto from '../../components/Formulario/Contacto';



const Home = () => {
  return (
    <div>
        <Header/>
        <Content/>
        <SecuDatos/>
        
        <Carrusel/>
        <Contacto/> 
        <Marcas/>
        <Footer/>
        
        
    </div>
  )
}

export default Home