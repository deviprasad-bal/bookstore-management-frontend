import React, {useEffect} from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/success.json';
import '../css/Confirmation.css';

const Confirmation = () => {
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
        <div className="confirmation-container">
            <Lottie options={defaultOptions} height={410} width={410} />
            <h2>Your Payment was accepted</h2>
        </div>
    );
};

export default Confirmation;
