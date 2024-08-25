import './App.css'
import ContenedorImagen from './components/ContenedorImagen'
import Nav from './components/Nav'


 function App() {

  return (
   
      <div className="app">

        <div className="navCont">
          <Nav />
        </div>

          <div className="contenedorImagen">

            <ContenedorImagen />
            
          </div>

      </div>
   
  )

}

export default App
