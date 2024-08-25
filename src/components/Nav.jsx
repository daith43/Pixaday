import '../styles/Nav.css'
import { useState } from 'react';

export default function Nav(){
    const [scrollBar, setScrollBar] = useState(false);

    const changeBG = () => {
        if(window.scrollY > 50){
            setScrollBar(true)
        } else{
            setScrollBar(false)
        }
    }

    const scrollTop = () =>{
        // Desplaza la página hacia la parte superior
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 'smooth' para un desplazamiento suave, 'auto' para un desplazamiento instantáneo
        });
      }

    window.addEventListener('scroll', changeBG)

    return(
            <nav className={scrollBar ? 'nav scrolled' : 'nav'} >
                <div className="navLogo">
                    <span onClick={scrollTop} className={scrollBar ? 'scrollLogo' : 'logo'}  >
                    pixaday
                    </span>
                </div>
            </nav>
    )
}