import "./StudioCard.css"


export default function StudioCard({nom, pays, ville, photo}){
    return (
        <div id="studio-card">
            <img src={photo} alt="photo-studio-danse"/>
            <h3>{nom}</h3>
            <p>{pays}</p>
            <p>{ville}</p>
        </div>
    )}