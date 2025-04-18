import './contact.css'
import Header from './header.jsx'
import Footer from './footer.jsx'

export default function Contact(){
    return (
        <div>
            <Header/>
            <div id="contact">
                <h2>CONTACT</h2>
                <h5>SOCIAL MEDIA</h5>
                <p>INSTAGRAM : <b>wherance</b></p>
                <p>TIKTOK : <b>wherance_offical</b> </p>
                <p>X : <b>wherance_off</b></p>
                <h5>EMAIL</h5>
                <p>contact@wherance.com </p>
                <h5>ADDRESS</h5>
                <p>N Crescent Heights Blvd, Los Angeles, CA 90046, United States </p>
            </div>
            <Footer/>
        </div>
    );
}