import "./StudioCard.css"

export default function StudioCard({photo, name, address, city, country, singleClassPrice, danseStyles, mapGoogle}){
    const seeDetails = () => {
      // audio.currentTime = 0
      // audio.play()
    }
    return (
        <div id="studio-card">
            <img id="studio-photo" src={photo} alt="photo-studio-danse"/>
            <h3>{name}</h3>
            <p>{danseStyles.join(", ")}</p>
            <p>{singleClassPrice}</p>
            <p>{city}, {country}</p>
            <button onClick={seeDetails}>See details</button>
            <div id="hidden-details">
              <p>{address}</p>
              <iframe src="https://maps.google.com/maps?q=LAX+Dance+Studio%2C+Paris&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
              </iframe>
            </div>

        </div>
    )}