import './aboutUs.css'
import Header from './header.jsx'
import Footer from './footer.jsx'

export default function AboutUs(){
    return (
        <div>
            <Header/>
            <div id="about-us">
                <h3>ABOUT US</h3>
                <p>
                    Wherance is a platform designed for <span>dancers</span> who love to <span>travel</span>. Whether you're a beginner or a professional, Wherance helps you easily <span>discover dance studios</span> offering open classes wherever you are <span>in the world</span>. Our mission is to connect the <span>global dance </span> by making it simple to <span>find, compare, and access</span> studios by <span>style, location, and atmosphere</span>. All in one place.
                </p>
            </div>
            <Footer/>
        </div>
    );
}