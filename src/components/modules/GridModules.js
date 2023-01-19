// React
import React from 'react';
import PropTypes from 'prop-types'

function GridEqual(props) {
    const { module } = props;

    return (
        <div className='pageModule'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img style={{ width: "25%", height: "500px", marginRight: '5%', marginTop: 200, background: "#ccc" }} />
                <img style={{ width: "25%", height: "500px", marginRight: '5%', marginTop: 100, background: "#ccc" }} />
                <img style={{ width: "25%", height: "500px", marginRight: '5%', background: "#ccc" }} />
            </div>
            <div>{module.moduleType}</div>
        </div >
    );
}

GridEqual.propTypes = {
    module: PropTypes.object
}


function GridWithScale(props) {
    const { module } = props;

    console.log(module);

    return (
        <div className='pageModule'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img style={{ width: "25%", height: "500px", marginRight: '5%', background: "#ccc" }} />
                <img style={{ width: "25%", height: "500px", marginRight: '5%', marginTop: 100, background: "#ccc" }} />
                <img style={{ width: "25%", height: "500px", marginRight: '5%', marginTop: 200, background: "#ccc" }} />

            </div>
            <div>{module.moduleType}</div>
        </div >
    );
}

GridWithScale.propTypes = {
    module: PropTypes.object
}

export { GridEqual, GridWithScale }