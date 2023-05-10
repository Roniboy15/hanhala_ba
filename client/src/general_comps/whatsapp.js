import React from 'react';
import '../App.css';
import useScrollHeight from './useHeight';


const WhatsAppIcon = ({ phoneNumber }) => {
    
    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}`);
    };

    return (
        <div className="whatsapp-icon" onClick={handleClick}>
            <i class="fa-brands fa-whatsapp fa-xl fa-shake"></i>
        </div>
    );
};

export default WhatsAppIcon;
