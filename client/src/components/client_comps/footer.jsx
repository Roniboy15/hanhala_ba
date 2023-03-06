import React from 'react';

function Footer() {
    return (
        <footer className="text-center text-white" >
            <div className="p-4"
                style={{
                    backgroundColor
                        : "orange",
                    opacity: "100%"
                }}>
            </div>

            <div className="text-center p-3 bg-warning bg-opacity-75">
                © 2023 Copyright:
                <a className="text-white unstyled" target={'_blank'} href={`mailto:jaron.111@hotmail.com`}> Bne Akiwa Schweiz</a>
            </div>
        </footer>
    );
}

export default Footer;
