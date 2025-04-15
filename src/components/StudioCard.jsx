import { useState } from "react";
import "./StudioCard.css"

export default function StudioCard({photo, name, address, city, country, priceCourse, danseStyles, instagram, website, googleMapLink}){
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div id="catalog-studio-card">
        <div id="studio-card">
            <img id="studio-photo" src={photo} alt="photo-studio-danse"/>
            <h3>{name}</h3>
            <p>{city}, {country}</p>
            <button onClick={toggleDetails}>
                {showDetails ? "Hide details" : "See details"}
            </button>
            {showDetails && (   //Si showDetails est true, alors on affiche ce qui est après &&
              <div id="hidden-details">
                <p>{danseStyles.join(", ")}</p>
                <p>{priceCourse}</p>
                <p>{instagram}</p>
                <p>{website}</p>
                <p>{address}</p>
                {/* <p>{googleMapLink}</p> */}
                <iframe
                // src={mapGoogle.replace("https://www.google.com/maps/place/", "https://maps.google.com/maps?q=") + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                width="100%"
                height="250"
                ></iframe>
                {/* <iframe src="https://maps.google.com/maps?q=LAX+Dance+Studio%2C+Paris&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                </iframe>  */}
              </div>
            )}
        </div>
        </div>
    )}




    // const DanceStudioCard = ({ studio }) => (
    //     <div className="border p-4 rounded-lg shadow-md">
    //       <h2 className="text-xl font-bold">{studio.name}</h2>
    //       <p className="text-gray-700">{studio.city}, {studio.country}</p>
    //       <p className="text-sm">Styles: {studio.danceStyles.join(", ")}</p>
    //       <p className="text-sm font-semibold">Prix: {studio.singleClassPrice}</p>
    //       <div className="flex space-x-2 mt-2">
    //         <a href={studio.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Site Web</a>
    //         <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">Instagram</a>
    //         <a href={studio.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">Google Maps</a>
    //       </div>
    //     </div>
    //   );
      
    //   const DanceStudiosList = () => (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    //       {danceStudios.map(studio => (
    //         <DanceStudioCard key={studio.id} studio={studio} />
    //       ))}
    //     </div>
    //   );

