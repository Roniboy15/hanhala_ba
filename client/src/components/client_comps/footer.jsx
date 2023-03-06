import React from 'react';

function Footer() {
    return (
        <footer style={{backgroundColor:"#f7f7f7", height:"15vh", display:"flex", alignItems:"center", justifyContent:"center"}} className="text-center text-dark" >
            <div className="text-center p-3 justify-content-center">
                © 2023 Copyright:
                <a className="text-dark unstyled" target={'_blank'} href={`mailto:jaron.111@hotmail.com`}> Bne Akiwa Schweiz</a>
            </div>
        </footer>
    );
}

export default Footer;
