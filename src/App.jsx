import StudioCard from './components/StudioCard'
import Header from './components/header.jsx'
import './App.css'
// import danceStudiosDataset from './studiodata.js' //si j'utilise pas le mini serveur
import getStudioData from './services/api'

import {useState, useEffect, useMemo} from "react";


export default function App(){

  ///////lien mini-serveur //////
  const [studioData, setStudioData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudioData(); // appel à l'API
        setStudioData(data); // ou sinon on appelle juste data selon la forme de la réponse
      } catch (error) {
        console.error("Erreur lors du chargement des studios :", error);
      }
    };

    fetchData();
  }, []);
  /////////////////////////
  const [search, setSearch] = useState("");
  const [studiosSortBy, setStudiosSortBy] = useState("name");
  const [selectedStyles, setSelectedStyles] = useState([]);

  ///////////données calculées///////:

  const filteredStudiosData = useMemo(() => {
    let result = studioData.filter((studio) => {
      // barre de recherche
      const matchesSearch =
        studio.name.toLowerCase().includes(search.toLowerCase()) ||
        studio.country.toLowerCase().includes(search.toLowerCase()) ||
        studio.city.toLowerCase().includes(search.toLowerCase()) ||
        studio.danceStyles.some(style =>
          // style.toLowerCase().includes(search.toLowerCase())
          style.toLowerCase().replace(/[-_]/g, " ").includes(search.toLowerCase().replace(/[-_]/g, " ")) //si un mot est ecrit avec des tiret par l'utilisateur on le remplace par des tirets
        );
  
      const matchesStyles =
        selectedStyles.length === 0 ||
        selectedStyles.every(style =>
          studio.danceStyles.includes(style)
        );
  
      return matchesSearch && matchesStyles;
    });
  
    result = result.toSorted((a, b) => {
      if (studiosSortBy === "name") {
        // sort dans ordre alpabetique
        return a.name.localeCompare(b.name);
      } else if (studiosSortBy === "country") {
        return a.country.localeCompare(b.country);
      } else if (studiosSortBy === "city") {
        return a.city.localeCompare(b.city);
      } else if (studiosSortBy === "price") {
        return (a.singleClassPrice || 0) - (b.singleClassPrice || 0);
      }
      return 0; // si rien ne correspond=> pas de tri
    });
  
    return result;
  }, [studioData, search, studiosSortBy, selectedStyles]);
  

  function handleStyleCheckbox(event) {
    const value = event.target.value;
    setSelectedStyles(prev =>
      event.target.checked
        ? [...prev, value]
        : prev.filter(style => style !== value)
    );
  }
  ///////////////////////////

  return (
    <div>
    <Header/>

      <div>
        <h1>WHERANCE</h1>
      {/* ////////// form recherche tri ///////////// */}
        <div id="gallery-options">
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a dance studio"/>
          <label htmlFor="dog-sort">Sort by : </label>
          <select id="dog-sort" value={studiosSortBy} onChange={(event) => setStudiosSortBy(event.target.value)}>
            {/* on appelle la fonction setStudioSortBy */}
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="country">Country</option>
            <option value="city">City</option>
            <option value="danceStyle">Dance Style</option>
            <option value="price">Price</option>
          </select>
          <div>
          <label><input type="checkbox" value="African Dance" onChange={handleStyleCheckbox}/> African Dance</label>
            <label><input type="checkbox" value="Contemporary" onChange={handleStyleCheckbox}/> Contemporary</label>
            <label><input type="checkbox" value="Dancehall" onChange={handleStyleCheckbox}/> Dancehall</label>
            <label><input type="checkbox" value="Jazz Funk" onChange={handleStyleCheckbox}/> Jazz Funk</label>
            <label><input type="checkbox" value="Jazz" onChange={handleStyleCheckbox}/> Jazz</label>
            <label><input type="checkbox" value="Heels" onChange={handleStyleCheckbox}/> Heels</label>
            <label><input type="checkbox" value="Street Jazz" onChange={handleStyleCheckbox}/> Street Jazz</label>
            <label><input type="checkbox" value="Modern Jazz" onChange={handleStyleCheckbox}/> Modern Jazz</label>
            <label><input type="checkbox" value="Hip-hop" onChange={handleStyleCheckbox}/> Hip-hop</label>
            <label><input type="checkbox" value="Breakdance" onChange={handleStyleCheckbox}/>Breakdance</label>
            <label><input type="checkbox" value="Tap Dance" onChange={handleStyleCheckbox}/>Tap Dance</label>
            <label><input type="checkbox" value="Floorwork" onChange={handleStyleCheckbox}/>Floorwork</label>
          </div>
        </div>

      {/* ////////////////////////////////// */}

        <div id="dance-studio-gallery">
          {filteredStudiosData.map((studio)=>(
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
    </div>
  );
}


