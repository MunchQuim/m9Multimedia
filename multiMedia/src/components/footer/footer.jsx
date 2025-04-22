import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white p-6 text-center text-sm space-y-2">
            <div>
                Icons made by{" "}
                <a href="https://www.flaticon.com/authors/uniconlabs" title="Uniconlabs" className="underline hover:text-gray-300">Uniconlabs</a>,{" "}
                <a href="https://www.flaticon.com/authors/wr-graphic-garage" title="WR Graphic Garage" className="underline hover:text-gray-300">WR Graphic Garage</a>,{" "}
                <a href="https://www.freepik.com" title="Freepik" className="underline hover:text-gray-300">Freepik</a>,{" "}
                <a href="https://www.flaticon.com/authors/gabriele-malaspina" title="Gabriele Malaspina" className="underline hover:text-gray-300">Gabriele Malaspina</a>,{" "}
                and <a href="https://www.flaticon.com/authors/twentyfour" title="twentyfour" className="underline hover:text-gray-300">twentyfour</a>{" "}
                from <a href="https://www.flaticon.com/" title="Flaticon" className="underline hover:text-gray-300">www.flaticon.com</a>
            </div>
            <div>
                Agradecimientos a{" "}
                <a href="https://samplelib.com/es/" className="underline hover:text-gray-300">samplelib.com</a>{" "}
                por proporcionar elementos multimedia fácilmente accesibles.
            </div>
            <div className="pt-2 text-xs text-gray-400">
                Este sitio y su contenido están licenciados bajo{" "}
                <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-300"
                >
                    CC BY 4.0 – Creative Commons Attribution 4.0 International
                </a>
                . Se permite su uso, modificación y redistribución, siempre que se otorgue crédito mediante un enlace a{" "}
                <a
                    href="https://github.com/MunchQuim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400"
                >
                    github.com/MunchQuim
                </a>.
            </div>
        </footer>
    );
}