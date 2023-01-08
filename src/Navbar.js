import React, {useEffect, useState} from 'react'
import './Navbar.css'
function Navbar() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>100){
                handleShow(true)
            }
            else{
                handleShow(false)
            }
        })
        return ()=>{
            window.removeEventListener("scroll",[])
        }
    }, [])
  return (
    <nav className={`nav ${show && "nav_black"}`}>
     <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="NETFLIX " />

     <img className='avatar' src="https://www.nicepng.com/png/full/358-3585658_lego-knuckles-hud-vector-icon-by-soniconbox-knuckles.png" alt="Smile" />
    </nav>
  )
}

export default Navbar
