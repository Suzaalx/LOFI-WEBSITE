
import './App.css'
import useGifs from './hooks/useGifs'
import useTransitionGifs from './hooks/useTransitionGifs'
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import useSongs from './hooks/useSongs';
import Music from './Music';
import { useState } from 'react';


function App() {
  const { currentGif, selectRandomGif, currentIndex } = useGifs()
  const {currentTransitionGif, showTransition, handleGifTransition, selectRandomTransitionGifs} = useTransitionGifs()
  const {currentSong, selectRandomSong} = useSongs()
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(currentGif);
  console.log(currentTransitionGif);

  const handleMusic = () => {
    if(!currentSong){
      selectRandomSong();
    }
    else{
      setIsPlaying(!isPlaying);
    }
  }
  
  return (
    <>
    <div className=' filter brightness-50 h-[100vh] w-full flex flex-col justify-end items-center'>

      <img
          className={`transition-gif ${showTransition ? " opacity-100" : ""} w-full h-full absolute object-cover opacity-0 z-50 top-0 left-0 pointer-events-none` }
          src={currentTransitionGif}
        />
      
      {currentIndex !== null && <img src={currentGif} alt="Random Gif" className=' w-full h-full absolute object-cover -z-10 top-0 left-0 '/>}
      <div className="crt-lines absolute bg-[url('./assets/lines.jpeg')] bg-[length:7px_auto] top-0 left-0 bottom-0 right-0 z-10 mix-blend-overlay pointer-events-none opacity-[0.4] animate-lines"></div>
      <div className="vignette absolute bg-[url('./assets/vignette.png')] bg-[length:100%_100%] top-0 left-0 bottom-0 right-0 z-[11] mix-blend-overlay pointer-events-none opacity-[0.6]"></div>
      <div className="dark absolute bg-[rgba(0,0,0,0.3)] w-full h-full top-0 left-0 pointer-events-none z-[1]"></div>
      <div className=' flex justify-between items-center gap-4 mb-10'>
      <button className=' z-20  text-2xl text-white' onClick={()=>{
        handleGifTransition();
        selectRandomTransitionGifs();
        selectRandomGif();
        selectRandomSong();

      }
         }><GrCaretPrevious />
        </button>

      {isPlaying ? <button className=' z-20  text-2xl text-white' onClick={()=>{
        setIsPlaying(false);
      }
         }>Pause</button> : <button className=' z-20  text-2xl text-white' onClick={()=>{

        handleMusic();
      }
         }>Play</button>}


      <button className=' z-20  text-2xl text-white' onClick={()=>{
        handleGifTransition();
        selectRandomTransitionGifs();
        selectRandomGif();
        selectRandomSong();

      }
         }><GrCaretNext /></button>
      </div>

      
    </div>
    <Music isPlaying={isPlaying} currentSong={currentSong} selectRandomSongs={selectRandomSong} volume={50} />

    </>
  )
}


export default App;
