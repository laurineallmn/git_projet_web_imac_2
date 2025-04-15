import StudioCard from './components/StudioCard'
import Header from './components/header.jsx'
import './App.css'
// import danceStudiosDataset from './studiodata.js'
import getStudioData from './services/api'
// import {useState} from "react";
import {useState, useEffect} from "react";


// getStudioData()

export default function App(){
  // const data = danceStudiosDataset
  ///////////test connxion a serveur mini////////////
  ///////////Demander achatgpt ///////////////
  //////revoir use state, use memo, use effect
  ////////////////////////////////:
  // const [studioData, setStudioData] = useState([]); //on utilise un use state
  // const [items, getItems]
  ///////////////////////////
  ////resoudre ces lignes pour mini serveur
  // useEffect(()=>{
  //   const fetchData() = async () => {
  //     const data = await getData();
  //     setStudioData(data);
  //   }
  //   fetchItems();
  // },[])
  //////////////////////////
  //////// const [studioData, setStudioData] = useState([])

  /////// useEffect(() => {
  ////////   const fetchData = async () => {
  ///////     const data = await getStudioData()
  //////     setStudioData(data.items) // Attention à bien accéder à la propriété "items"
  //////   }

  //////   fetchData()
  ////// }, [])

  const [studioData, setStudioData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudioData(); // appel à l'API
        setStudioData(data); // ou juste "data" selon la forme de la réponse
      } catch (error) {
        console.error("Erreur lors du chargement des studios :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <Header/>

      <div id="dance-studio-gallery">
        <h1>Danse</h1>
        {studioData.map((studio)=>(
        // <div id="studio-card">
          
          <StudioCard
          key={studio.id}
          photo={studio.logoUrl}
          name={studio.name} //nom="LAX Studio"  //pour un dictionnaire direct dans App.jsx : nom={data[0].name}
          city={studio.city}
          country={studio.country}   //ville="Paris"
          danseStyles={studio.danceStyles}
          priceCourse={studio.singleClassPrice}
          address={studio.address}
          instagram = {studio.instagram}
          website = {studio.website}
          mapGoogle = {studio.googleMapLink}
          />
        
        // </div> 
        ))}
      </div>
    </div>
  );
}


