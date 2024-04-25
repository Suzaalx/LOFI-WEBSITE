import {useEffect , useState} from 'react';

const useSongs = () => {
    const [ currentSongIndex, setCurrentSongIndex ] = useState(null);
    const [ songList, setSongList ] = useState([]);

    useEffect(() => {
        async function loadSongs() {
          const songModuleContext = import.meta.glob("../songs/*.mp3");
          const paths = Object.keys(songModuleContext);
          const modules = await Promise.all(
            paths.map(path => songModuleContext[path]())
          );
          const songs = modules.map(module => module.default);
          setSongList(songs);

          
        }
    
        loadSongs();
      }, []);

      const selectRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * songList.length);
        setCurrentSongIndex(randomIndex);
      };

      
      return{
          currentSong: songList[currentSongIndex],
          selectRandomSong,
      };
      }

      export default useSongs;
