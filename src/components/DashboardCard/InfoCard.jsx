import React from 'react';
import bubble from '../../props/Icons/bubbles.svg';

function InfoCard({cardTitle, cardValue, cardClass}) {
    return (
        <div className={`card ${cardClass} card-img-holder `}>
            <div className="card-body">
                <img src={bubble} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">{cardTitle} <i className="mdi mdi-chart-ane mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{cardValue}</h2>
                {/* <h6 className="card-text">Increased by 60%</h6> */}
            </div>
        </div>
    );
}

export default InfoCard;