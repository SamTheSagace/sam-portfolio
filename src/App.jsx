
import { useEffect, useRef, useState } from 'react'
import './app.scss'
import MainCanvas from './components/mainCanvas'
import data from './assets/text.json'
import ReactModal from 'react-modal';

export default function App() {
  const canvasRef = useRef()
  const [index, setIndex] = useState(0)
  const linkRef = useRef()
  const description =useRef()

  function hide(){
    linkRef.current.classList.add("hidden")
    description.current.classList.add("hidden")
    setTimeout(()=>{
      linkRef.current.classList.remove("hidden")
      description.current.classList.remove("hidden")
    },1000)
  };


  function right(){
    hide()
    canvasRef.current?.slideRight()
    if(index === 4){
      setIndex(()=> 0)
    }
    else{setIndex((c)=> c+1)}
  };

  function left(){
    hide()
    canvasRef.current?.slideLeft()
    if(index === 0){
      setIndex(()=> 4)
    }
    else{setIndex((c)=> c-1)}
  };

  function switchMenu() {
    setMenuState((prev) => !prev);
    console.log("switch menu")
  }

  function useScreenOrientation() {
    const [orientation, setOrientation] = useState(window.screen.orientation.type)
    useEffect(() => {
      const handleOrientationChange= () => setOrientation(window.screen.orientation.type);
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => window.removeEventListener('orientationchange', handleOrientationChange);
    }, []);
  
    return orientation;
  }

  const [menuState, setMenuState]= useState(useScreenOrientation().startsWith("landscape") ?  true : false)
  
  const orientation = useScreenOrientation().startsWith("landscape") ?  true : false;

  useEffect(()=>{
    if(!menuState && !orientation){
      console.log("do nothing")
    }
    else{
      switchMenu()
      console.log("autoswitch")
    }
  },[orientation])
 

  
  return(
    <>
    {/* <MainCanvas ref={canvasRef}/> */}
      <div className='menu'>
        {!menuState &&<i className="fa-solid fa-bars" onClick={switchMenu}></i>}
        <ReactModal
          parentSelector={() => document.querySelector('.menu')}
          isOpen={menuState}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
            <div className='menu_buttons'>
              {data.menu.map((content)=>(
                <a href={content.link} key={content.id}>{content.title}</a>
              ))}
            </div>
            <i className="fa-solid fa-xmark" onClick={switchMenu}></i>
            
          </ReactModal>
        
      </div>
      <div id='header' className='header'>
        <div className='header_content'>
          <div className='header_block'>
            <div className='header_text'>
              <h1>{data.header.title}</h1>
              <h2>{data.header.name}</h2>
              <h3>{data.header.job}</h3>
              <div className='textDescription'>
                <p>{data.header.description}</p>
              </div>
            </div>
            <div className='picture'>
              <img src="./images/profil.jpg" alt="" />
            </div>
          </div>
          <i className="fa-solid fa-angles-down"></i>
        </div>
      </div>
      <div id='portfolio' className='portfolio'>
        <MainCanvas ref={canvasRef}/>
        <div className='portfolio_overlay'>
          <div className='description' ref={description}> 
              <h2>{data.projets[index].title}</h2>
              <p>{data.projets[index].text}</p>
              <img src={orientation ? "./line.svg" : "./line_mobile.svg"} alt="" />
          </div>
          <div className='buttons'>
            <div className='buttons_overlay'>
              <button onClick={() => left()}>
                <i className="fa-solid fa-angles-left"></i>
              </button>
              <div className='link'>
                <a href="https://samthesagace.github.io/Booki/" ref={linkRef}></a>
              </div>
              <button onClick={() => right() }>
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id='about_me' className='about_me'>
        <h1>{data.about_me.title}</h1>
        
        <div className='textBlock'>
          {data.about_me.text.map((text, index)=>(
            <div className={`block`} key={index}> 
              <p className={`text${index}`} >{text.text}</p>
              <img src={text.image} alt="" />
            </div>
            
          ))}
        </div>
      </div>
      <div id="contact_me" className='footer'>
        <h1>{data.contact_me.title}</h1>
        <h3>{data.contact_me.mail}</h3>
        <h3>{data.contact_me.tel}</h3>
        <h3><a href={data.contact_me.git}>{data.contact_me.git}</a></h3>
        <h3><a href={data.contact_me.bento}>{data.contact_me.bento}</a></h3>
      </div>
    </>
  )
}