import React from 'react';
import FaqAccordion from '../../components/Accordion/Accordion';
import FootBar from '../../components/FootBar/FootBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './faq.scss';


function Faq() {
    return (
        <div className='FAQ'>
            <Header/>
            <div className='FAQ__inner'>
                <h2 className='FAQ__inner__heading'>
                    FAQs
                </h2>
                <FaqAccordion/>
            </div>

            <FootBar/>
            <Footer/>
        </div>
    );
}

export default Faq;