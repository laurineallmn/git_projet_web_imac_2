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
                    <p>Instagram:<a href={instagram} target="_blank" rel="noopener noreferrer">{instagram}</a></p>
                    <p>Website:<a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
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



