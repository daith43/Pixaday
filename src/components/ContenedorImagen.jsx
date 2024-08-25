import { useEffect, useState } from 'react';
import '../styles/ContenedorImagen.css'
import Badge from './Badge'

import Pagination from '@mui/material/Pagination';


 function ContenedorImagen(){
    const [tema, setTema] = useState('');
    const [categ, setCateg] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [result, setResult] = useState('');
    const [spinner, setSpinner] = useState('');
    const [numPag, setNumPag] = useState(0);
    const [page, setPage] = useState(1);
    const [vacio, setVacio] = useState(true);

    const [imgDefault, setImgDefault] = useState(false);




    const apiKey = "33608977-8e4d89378c01b69ed0a16e761";
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${tema}&per_page=36&page=${page}`;

    const urlDefault = `https://pixabay.com/api/?key=${apiKey}&q=nature&per_page=36&page=${page}`;

    const buscarImagenes = ()=>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {

            let paginas = Math.round(data.totalHits / 36);
            setNumPag(paginas);
            
            if(paginas > 0){
                setVacio(false)
            } else {
                setVacio(true)
            }

            if(tema !== ""){

                setSpinner(1) // Muestro el spinner
                setResult('') // Formateo el posible contenido anterior
                setImagenes([]) // Formateo el posible contenido anterior
                setImgDefault(false)

                setTimeout(()=>{
                    setSpinner(0) // Oculto el spinner
                    setImagenes(data.hits)
                    setResult(tema)
            }, 700)
            }

        })
        .catch((error) =>{
            console.error("Error al hacer la petición " , error);
        })
    }

    const cargarImagenesDefecto = ()=>{
        fetch(urlDefault)
        .then((response) => response.json())
        .then((data) => {

            let paginas = Math.round(data.totalHits / 36);
            setNumPag(paginas);
            if(paginas > 0){
                setVacio(false)
            } else{
                setVacio(true)
            }
            setImagenes(data.hits)
            setImgDefault(true)

        })
        .catch((error) =>{
            console.error("Error al hacer la petición " , error);
        })
    }

    useEffect(() => {
        cargarImagenesDefecto();
    }, []);


    useEffect(() => {
        if (categ) {
            buscarImagenes();
        }
        setCateg(false)
    }, [tema]); // Se ejecuta cada vez que 'categ' cambia

    useEffect(() => {
        if(imgDefault){
            cargarImagenesDefecto()
        } else {
            buscarImagenes()
        }// Se ejecuta cada vez que 'page' cambia
      }, [page]);

    const pulsarEnter = (e) =>{
        if(e.key === 'Enter'){
            setPage(1)
            buscarImagenes();
        }
    }

    const cambiarTema = (categoria) => {
        setCateg(true)
        setTema(categoria)
        setImgDefault(false)
        setPage(1)
    }

    const clickImagen = (imagen) => {
        window.open(imagen.webformatURL, '_blank');
      };


      const paginacion = (e, value) => {
        setPage(value);

        if(imgDefault){
            cargarImagenesDefecto()
        } else {
            buscarImagenes()
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 'smooth' para un desplazamiento suave, 'auto' para un desplazamiento instantáneo
        });

      };

      const avisoVacio = ()=>{

        console.log(vacio)


        if(vacio === false){
            return `Resultados de: "${result}"`;
            /*console.log(`Resultados de: "${result}"`)*/
        } else{
            return `No hemos encontrado resultados de: "${result}"`;
            /*console.log(`No hemos encontrado resultados de: "${result}"`)*/
        }

      }

    return(
        <div className="contImg">

            <div className="hero">
           
            <div className="h2">
                <h2>Descubre miles de imágenes gratuitas</h2>
            </div>

                 <div className="buscador">
                    <input 
                    type="text" 
                    name="tema" 
                    id="tema" 
                    value={categ ? "" : tema}
                    placeholder='Busca algo que te interese'
                    autoComplete='off'
                    onChange={(e) => {
                        setTema(e.target.value)
                    }}
                    onKeyDown={pulsarEnter}
                    />

                    <input 
                    type="submit" 
                    id='buscar' 
                    value="" 
                    onClick={buscarImagenes}
                    />

                </div>
            </div>


             {/* Badge */}

            <div className="badgeCont">
                  
            <div className="badge" onClick={()=> cambiarTema('Coches')}>
                <Badge categoria="Coches" /> 
            </div>

            <div className="badge" onClick={()=> cambiarTema('Naturaleza')}>
                <Badge categoria="Naturaleza" /> 
            </div>

            <div className="badge" onClick={()=> cambiarTema('Perros')}>
                <Badge categoria="Perros" />  
            </div>

            <div className="badge" onClick={()=> cambiarTema('Flores')}>
                <Badge categoria="Flores" /> 
            </div>  

            <div className="badge" onClick={()=> cambiarTema('Wallpaper')}>
                <Badge categoria="Wallpaper" /> 
            </div>    

            <div className="badge" onClick={()=> cambiarTema('Lobos')}>
                <Badge categoria="Lobos" />  
            </div> 

            <div className="badge" onClick={()=> cambiarTema('Comida')}>
                <Badge categoria="Comida" />  
            </div> 

            <div className="badge" onClick={()=> cambiarTema('4K')}>
                <Badge categoria="4K" />  
            </div>

            <div className="badge" onClick={()=> cambiarTema('Paisajes')}>
                <Badge categoria="Paisajes" /> 
            </div>  

            <div className="badge" onClick={()=> cambiarTema('Familia')}>
                <Badge categoria="Familia" /> 
            </div>    

            <div className="badge" onClick={()=> cambiarTema('Tecnología')}>
                <Badge categoria="Tecnología" />  
            </div> 

            <div className="badge" onClick={()=> cambiarTema('Gatos')}>
                <Badge categoria="Gatos" />  
            </div> 
      
            </div>    


            {/* Spinner */}

            { spinner === 1 && (
                <div className="spinnerCont">
                    <div class="loader"></div>
                </div>
            )
            }

            
            {/* Titulo del tema buscado */}

            { result !== '' && (
                <p className='parrafo-resultados'>
                {avisoVacio()}
            </p>
            )
            }

            <div className="resultados">
                {imagenes.map((imagen, index) => (
                    <div className='img' key={index} >
                        <div className="imageWrap" onClick={() => clickImagen(imagen)}>
                        <img src={imagen.webformatURL} />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="paginas">
                <Pagination count={numPag} page={page} onChange={paginacion} />
            </div>

        </div>
    )
}

export default ContenedorImagen