import "./StudioCard.css"


export default function StudioCard({photo, name, address, city, country, singleClassPrice, danseStyles, mapGoogle}){
    return (
        <div id="studio-card">
            <img src={photo} alt="photo-studio-danse"/>
            <h3>{name}</h3>
            <p>{address}</p>
            <p>{city}</p>
            <p>{country}</p>
          <p>{singleClassPrice}</p>
          <p>{danseStyles.join(", ")}</p>
          <iframe src="https://maps.google.com/maps?q=LAX+Dance+Studio%2C+Paris&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
          </iframe>
           

        </div>
    )}