import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import AboutAccordion from '../components/AboutAccordion';
 
function About () {

    return <div >
        <NavBar/>
        <div className='max-w-screen-lg mx-auto border-2  border-indigo-200 bg-indigo-100 rounded-lg p-10 mt-12'>
        <AboutAccordion/>
        </div>
            <Footer/>
        </div>
        
}
export default About;