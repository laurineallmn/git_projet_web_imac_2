
import './header.css'
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <div id="nav-barre">
            <Link to="/"><h1>WHERANCE</h1></Link>
            {/* <Link to="/"><h3>HOME</h3></Link> */}
            <Link to="/aboutus"><h3>ABOUT US</h3></Link>
            <Link to="/contact"><h3>CONTACT</h3></Link>   
        </div>
    );
}