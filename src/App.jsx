import StudioCard from './components/StudioCard'
import './App.css'
import danceStudiosDataset from './StudioData.js'

// export default function App() {
//   return <main>Hello World</main>
// }

export default function App(){
  // const data = danceStudiosDataset
  return (
    <div id="dance-studio-gallery">
      <p>Danse</p>
      <div id="studio-card">
        {danceStudiosDataset.map((studio)=>(
        <StudioCard
        photo={studio.logoUrl}
        name={studio.name} //nom="LAX Studio"  //pour un dictionnaire direct dans App.jsx : nom={data[0].name}
        adress={studio.address}
        city={studio.city}
        country={studio.country}   //ville="Paris"
        price_course={studio.singleClassPrice}
        danseStyles={studio.danceStyles}
        />
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
