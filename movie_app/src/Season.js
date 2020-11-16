import React from 'react';
import PropTypes from 'prop-types';
import './Season.css';

function Season({ title, img }) {
    return (
        <div>
            <SeasonImage img={img} />
            <h1>{title}</h1>
        </div>
    )
}

function SeasonImage({ img }) {
    return (
        <img width="400" src={img} alt="season image" />
    )
}

Season.prototype = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}

SeasonImage.prototype = {
    img: PropTypes.string.isRequired
}

export default Season;