import React, {useEffect} from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/Failed.json';
import '../css/Cancel.css';

const Cancel = () => {
    useEffect(() => {
        document.body.classList.add('white-background');
        return () => {
            document.body.classList.remove('white-background');
        };
    }, []);

    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="cancel-container">
            <Lottie options={defaultOptions} height={410} width={410} />
            <h2>Please try again...</h2>
        </div>
    );
};

export default Cancel;
