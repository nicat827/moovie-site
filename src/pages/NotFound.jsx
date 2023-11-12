import React from 'react';
import "../assets/styles/App.css"
import Layout from '../Layout';
const NotFound = () => {
    return (
        <Layout><div className='not-found'>
        <div className='err-div'>
            <h1 className='err err-code'>404</h1>
            <h3 className='err err-mess'>Not Found</h3>
        </div>
    </div></Layout>
        
    );
}

export default NotFound;
