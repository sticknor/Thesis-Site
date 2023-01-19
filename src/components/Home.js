// React
import React from 'react';

function Home({ splashImages }) {
    return (
        <div
            id="splashContainer"
            style={splashImages[0] ? { 'backgroundImage': `url(${splashImages[0].url})` } : {}}
        >
        </div >
    );
}

export default Home;