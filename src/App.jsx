import Header from './components/nav y pie/Header';
import Content from './components/contenido/Content';
import SecuDatos from './components/contenido/SecuDatos';
import Marcas from './components/contenido/Marcas';
import Footer from './components/nav y pie/Footer';
import Plans from './components/contenido/Plans';
import Carrusel from './components/Carousel/Carrusel';
import Galeria from './components/contenido/Galeria';

function App() {
  
  return (
    <div>
      <Header/>
      <Content/>
      <SecuDatos/>
      <Marcas/>
      <Plans/>
      <Carrusel/>
      <Galeria/>
      <Footer/>
    </div>
  )
}

export default App
