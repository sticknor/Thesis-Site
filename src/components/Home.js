// React
import React from 'react';
import PropTypes from 'prop-types';

function Home(props) {
    const { splashImages } = props;
    return (
        <div
            id="splashContainer"
            style={splashImages[0] ? { 'backgroundImage': `url(${splashImages[0].url})` } : {}}
        >
        </div >
    );
}

Home.propTypes = {
    splashImages: PropTypes.array
}

export default Home;