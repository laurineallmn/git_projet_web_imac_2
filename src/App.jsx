import StudioCard from './components/StudioCard'
import Header from './components/header.jsx'
import './App.css'
// import danceStudiosDataset from './studiodata.js' //si j'utilise pas le mini serveur
import getStudioData from './services/api'

import {useState, useEffect, useMemo} from "react";

///AUTRE IDDES : BOUTON POUR ENELEVER TOUS LES FILTRES ACTIF
//// AUTRE IDDEES INDIQUER LE NOMBRE DE STUDIO PROPOSES SUITE AUX FILTRES APPLIQUES

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
  ///- slider de prix dynamique
  const [maxPrice, setMaxPrice] = useState(100);

  //ajustement du prix max affiché dans le slider en fonction des pays et de leur monnaie
  const priceMaxByCountry = {
    France: 30, //es ce qu'on peut ecrire France, Germany, Spain etc ?
    Germany:30,
    Italy: 30,
    Belgium: 30,
    Spain: 30,
    "Czech Republic": 30, 
    UK: 30,
    "South Korea": 15000,
    Japan: 3000,
    China: 200,
    USA: 50,
    Russia: 1000,
  };
  const currencySymbolsByCountry = {
    France: "€",
    Germany: "€",
    Italy: "€",
    Belgium: "€",
    Spain: "€",
    "Czech Republic": "€",
    UK: "£",
    "South Korea": "₩",
    Japan: "¥",
    China: "¥",
    USA: "$",
    Russia:"₽",
  };

  const [search, setSearch] = useState("");
  const [studiosSortBy, setStudiosSortBy] = useState("name");
  const [selectedStyles, setSelectedStyles] = useState([]); //tableau vide par défaut pour stocker les style de danse

  // donne tous les styles de danse proposés par tous les studios (sans doublon)
  const allDanceStyles = useMemo(() => {
    const stylesSet = new Set(); //evite doublon
    studioData.forEach(studio => {
      studio.danceStyles.forEach(style => stylesSet.add(style));
    });
    return Array.from(stylesSet).sort(); // tableau trier par ordre alphabetique
  }, [studioData]);

  ///////////données calculées///////:

  /// on filtre les studios par search et style
  const filteredBySearchAndStyles = useMemo(() => {
    return studioData.filter((studio) => {
      // barre de recherche
      const matchesSearch =
        studio.name.toLowerCase().includes(search.toLowerCase()) ||
        studio.country.toLowerCase().includes(search.toLowerCase()) ||
        studio.city.toLowerCase().includes(search.toLowerCase()) ||
        studio.danceStyles.some(style =>
          style.toLowerCase().replace(/[-_]/g, " ").includes(search.toLowerCase().replace(/[-_]/g, " "))  //si un mot est ecrit avec des tiret par l'utilisateur on le remplace par des tirets
        );
  
      // verification des styles de danse
      const matchesStyles =
        selectedStyles.length === 0 ||
        selectedStyles.every(style =>
          studio.danceStyles.includes(style)
        );    
        
      return matchesSearch && matchesStyles;
    });
  }, [studioData, search, selectedStyles]); //si une de ces valeurs changent ont les met a jour


  ///- on recupere le nom du pays unique (suite au filtre par searxh et style)=>si tous les studio affichés sont dans le meme pays alors on affiche le slider de prix
  const uniqueCountry = useMemo(() => {
    const countries = new Set(filteredBySearchAndStyles.map(studio => studio.country));
    return countries.size === 1 ? [...countries][0] : null;
  }, [filteredBySearchAndStyles]);

  /// on filtre les studio en ajoutant le prix
  const filteredStudiosData = useMemo(() => {
    let result = filteredBySearchAndStyles;
    
    /// on filtre par prix si tous les studios viennent d'un pays unique
    if (uniqueCountry) {
      result = result.filter(studio => {
        //convertion du nombre string dans mini serveur vers un vrai nombre float
        const priceString = studio.singleClassPrice;
        const priceValue = parseFloat(priceString.replace(/[^0-9.,]/g, '').replace(',', '.'));
        return priceValue <= maxPrice;
      });
    }

  //pour la liste deroulante de tri par name, country et city
  result = result.toSorted((a, b) => {
    if (studiosSortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (studiosSortBy === "country") {
      return a.country.localeCompare(b.country);
    } else if (studiosSortBy === "city") {
      return a.city.localeCompare(b.city);
    }
    return 0; // si rien ne correspond=> pas de tri
  });

    return result;
  }, [filteredBySearchAndStyles, uniqueCountry, maxPrice, studiosSortBy]);

  ///- on adapte dynamiquement la valeur max du slider
  const priceSliderMax = uniqueCountry ? priceMaxByCountry[uniqueCountry] || 100 : 100;
  ///- on recupere le symbole de la monnaie du pays
  const currencySymbol = uniqueCountry ? currencySymbolsByCountry[uniqueCountry] || "¤" : "";

  ///- useEffect pour mettre a jour maxPrice a chaque changement de priceSliderMax
  useEffect(() => {
    setMaxPrice(priceSliderMax);
  }, [priceSliderMax]);

  //pour les checbox des styles de danse
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
          <div id="search-input">
            <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder=" 🔍 Search a dance studio"/>
            {/* curseur de prix  */}
            {uniqueCountry && (
              <div>
                <label>Prix maximum :</label>
                <input id="slider-input"
                  type="range"
                  min="0"
                  max={priceSliderMax}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                />
                <span>{maxPrice} {currencySymbol}</span>
              </div>
            )}
            {/* si les studio ne sont pas du même pays  */}
            {!uniqueCountry && (
              <p style={{ fontStyle: 'italic', fontSize: "0.6em", color: "white", marginTop : "0"}}>
                Type a country name to select your price range.
              </p>
            )}
          </div>
          
          <div id="sort-by-options">
            <label htmlFor="dog-sort">Sort by :</label>
            <select id="dog-sort" value={studiosSortBy} onChange={(event) => setStudiosSortBy(event.target.value)}>
              {/* on appelle la fonction setStudioSortBy */}
              <option value="">Sort by...</option>
              <option value="name">Name</option>
              <option value="country">Country</option>
              <option value="city">City</option>
            </select>
          </div>
          <div id="checkbox-container">
            <p>Select dance styles you're interested in : </p>
            {/* boucle pour afficher tous les style de danse qui apparaissent dans les données du mini serveur  */}
            {allDanceStyles.map(style => (
            <label key={style}>
            <input type="checkbox" id="checkbox-clicked" value={style} onChange={handleStyleCheckbox} />
            {style}
            </label>
            ))}
          </div>
        </div>

      {/* ////////////////////////////////// */}

        <div id="dance-studio-gallery">
        {/* message d'erreur si aucun studio correspondant n'a été trouvé  */}
        {filteredStudiosData.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: "red", marginTop:"3vh"}}>Oh no, sorry, no studio was found.</p>
        ) : (filteredStudiosData.map((studio)=>(
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
          
          ))
        )}
        </div>
      </div>
    </div>
  );
}