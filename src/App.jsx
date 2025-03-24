import StudioCard from './components/StudioCard.jsx'
import Header from './components/header.jsx'
import './App.css'
import danceStudiosDataset from './studiodata.js'
import getItems from './services/api.js'
import {useState} from "react";

// export default function App() {
//   return <main>Hello World</main>
// }
getItems()

export default function App(){
  // const data = danceStudiosDataset
  return (
    <div>
    <Header/>

      <div id="dance-studio-gallery">
        <h1>Danse</h1>
        {danceStudiosDataset.map((studio)=>(
        // <div id="studio-card">
          
          <StudioCard
          key={studio.id}
          photo={studio.logoUrl}
          name={studio.name} //nom="LAX Studio"  //pour un dictionnaire direct dans App.jsx : nom={data[0].name}
          city={studio.city}
          country={studio.country}   //ville="Paris"
          danseStyles={studio.danceStyles}
          priceCourse={studio.singleClassPrice}
          // website=
          address={studio.address}
          
          
          // mapGoogle = {studio.mapGoogle}
          />
        
        // </div> 
        ))}
      </div>
    </div>
  );
}



// export default function App(){
//   return (
//       <div id="dance-card">
//         <img 
//         src = "../../../LOGO/name.png"
//        alt =danse/>
//         <div id="description-dance-studio">
//           <h3>LAX Studio</h3>
//           <p className="name-dance-studio">Lax Dance Studio</p>
//           <p className="place-dance-studio">Paris</p>

//         </div>
//         />
//       </div>
//   );
// }
