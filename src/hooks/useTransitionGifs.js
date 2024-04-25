import { useEffect, useState } from "react";

const useTransitionGifs = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionGifList, setTransitionGifList] = useState([]);
  const [currentTransitionGifIndex, setCurrentTransitionGifIndex] = useState(null);

  // Dynamically load GIFs from a directory
  useEffect(() => {
    async function loadGifs() {
      const gifModuleContext = import.meta.glob("../transitionGifs/*.gif");
      const paths = Object.keys(gifModuleContext);
      const modules = await Promise.all(
        paths.map(path => gifModuleContext[path]())
      );
      const gifs = modules.map(module => module.default);
      setTransitionGifList(gifs);
    }

    loadGifs();
  }, []);

  const selectRandomTransitionGifs = () => {
    const randomIndex = Math.floor(Math.random() * transitionGifList.length);
    setCurrentTransitionGifIndex(randomIndex);
  };

  const handleGifTransition = () => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
    }, 250);
  };
  console.log(transitionGifList);

  return {
    currentTransitionGif: transitionGifList[currentTransitionGifIndex],
    handleGifTransition,
    selectRandomTransitionGifs,
    showTransition
  };
};

export default useTransitionGifs;