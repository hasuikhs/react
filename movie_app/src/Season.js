import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Season.css';

class Season extends Component {

    static propTypes = {
        title:PropTypes.string.isRequired,  // 꼭 필요한 인자인 경우 isRequired
        img: PropTypes.string.isRequired
    }

    render() { 
        return (
            <div>
                <SeasonImage img={this.props.img} />
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

class SeasonImage extends Component {

    static propTypes = {
        img: PropTypes.string.isRequired
    }

    render() {
        return (
            <img width="400" src={this.props.img} alt="season image" />
        )
    }
}

export default Season;