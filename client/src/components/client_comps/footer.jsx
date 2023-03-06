import React from 'react';

function Footer() {
    return (
        <footer className="text-center text-white" >
            <div className="p-4 rounded-top-1"
                style={{
                    backgroundColor
                        : "grey",
                    opacity: "55%"
                }}>
            </div>

            <div className="text-center p-3 rounded-bottom-1" style={{ backgroundColor: "grey", opacity:"95%" }}>
                © 2023 Copyright:
                <a className="text-white unstyled" target={'_blank'} href={`mailto:jaron.111@hotmail.com`}>Bne Akiwa Schweiz</a>
            </div>
        </footer>
    );
}

export default Footer;
