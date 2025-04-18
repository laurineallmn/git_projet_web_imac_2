import './footer.css'
import { Link } from 'react-router-dom'

export default function Footer(){
    return (
        <div id="footer-container">
            <div id="footer-left-container">
            <Link to="/"><h3>WHERANCE</h3></Link>
            <p>© 2025 — Laurine Allemon</p>
            </div>
            <div id="footer-right-container">
                <p>Legal notices</p>
                <p>Privacy Policy</p>
            </div>   
        </div>
    );
}