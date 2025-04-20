import React from "react";
import { useEffect, useState, useContext, useRef } from "react";

import AlbumContext from "../../context/albumContext";
import MultimediaContext from "../../context/multimediaContext";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import AlbumLists from "./albums/albumLists";
import MultimediaList from "./multimedia/multimediaList";
import MultiUse from "./multiUse";

export default function Main() {
    let volumeIcons = ["./images/icons/volume-mute.png", "./images/icons/low-volume.png", "./images/icons/high-volume.png"];
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [currentMultimedia, setCurrentMultimedia] = useState(null);
    const [volumeIcon, setVolumeIcon] = useState(volumeIcons[1]);

    const [isVideo, setIsVideo] = useState(null);
    const multimediaRef = useRef(null);

    const [configMultimedia, setConfigMultimedia] = useState({
        "volumen": 0.5,
        "currentSecond": 0,
        "duracion": 0,
        "muted": false,
    });

    useEffect(() => {
        if (currentMultimedia && currentMultimedia.multimedia) {
            const fileUrl = currentMultimedia.multimedia;
            const extension = fileUrl.split('.').pop().toLowerCase();

            if (extension === 'mp4') {
                setIsVideo(true);
            } else if (extension === 'mp3') {
                setIsVideo(false);
            }
        }
    }, [currentMultimedia]);

    useEffect(() => {
        if (configMultimedia.muted) {
            setVolumeIcon(volumeIcons[0]);

        } else {
            configMultimedia.volumen > 0.5 ? setVolumeIcon(volumeIcons[2]) : setVolumeIcon(volumeIcons[1])
        }
    }, [configMultimedia])

    function handleMultimediaMomento(currentSecond) {

        setConfigMultimedia(prevConfig => ({
            ...prevConfig,
            currentSecond: currentSecond,
        }));
        multimediaRef.current.currentTime = currentSecond;
        multimediaRef.current.play();
    };
    function handleVolumen(currentVolume) {
        setConfigMultimedia(prevConfig => ({
            ...prevConfig,
            volumen: currentVolume,
        }));
        multimediaRef.current.volume = currentVolume;
    }
    function handleMuted() {
        setConfigMultimedia(prevConfig => {
            const nuevoMuted = !prevConfig.muted;
            if (multimediaRef.current) {
                multimediaRef.current.muted = nuevoMuted;
            }
            return {
                ...prevConfig,
                muted: nuevoMuted,
            };
        });
    }

    function setEventListenerTimeUpdate() {
        const media = multimediaRef.current;
        if (!media) return;

        const updateTime = () => {
            setConfigMultimedia(prev => ({
                ...prev,
                currentSecond: media.currentTime,
            }));
        };

        media.addEventListener("timeupdate", updateTime);

        return () => {
            media.removeEventListener("timeupdate", updateTime);
        };
    }
    function toBeImplemented() {
        alert('Esta funcion no ha sido implementada todavia');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="bg-black flex-grow min-h-screen flex p-4 gap-2 flex-col sticky bottom-0">
                <Header />
                <AlbumContext.Provider value={{ currentAlbum, setCurrentAlbum }}>
                    <MultimediaContext.Provider value={{ currentMultimedia, setCurrentMultimedia }}>
                        <article className="bg-black flex-grow flex p-4 gap-2 overflow-y-auto">
                            <aside className="bg-stone-800 p-4 rounded-lg w-[420px] ">
                                <AlbumLists />
                            </aside>
                            <section className="flex-grow bg-stone-800 p-4 rounded-lg shadow-lg text-white">
                                <MultimediaList />
                            </section>
                            <aside className="bg-stone-800 p-4 rounded-lg w-[350px] ">
                                <MultiUse multimedia={currentMultimedia} isVideo={isVideo} multimediaRef={multimediaRef} configMultimedia={configMultimedia} setConfigMultimedia={setConfigMultimedia} setEventListenerTimeUpdate={setEventListenerTimeUpdate} />
                            </aside>
                        </article>

                        {currentMultimedia ? (
                            <section className="w-full p-4 text-center text-white bg-black flex">

                                <div className="flex gap-4 flex-grow-2">
                                    <img className="rounded-lg" src={currentMultimedia.cover} alt="imagen del disco" />
                                    <div className="flex flex-col self-end text-start p-1">
                                        <h4>{currentMultimedia.title}</h4>
                                        <p>{currentMultimedia.artist}</p>
                                    </div>
                                </div>

                                <div className="flex-grow-16 justify-items-center">
                                    <div className="flex gap-2 items-center">
                                        <button onClick={toBeImplemented} className="w-4 h-4 scale-90 hover:scale-100 cursor-pointer transition"><span><img src="../images/icons/shuffle.png" alt="shuffle Icon" /></span></button>
                                        <button onClick={toBeImplemented} className="w-4 h-4 scale-90 hover:scale-100 cursor-pointer transition"><span><img src="../images/icons/previous.png" alt="backward Icon" /></span></button>
                                        <button onClick={() => {
                                            if (multimediaRef.current.paused) {
                                                multimediaRef.current.play();
                                            }
                                            else {
                                                multimediaRef.current.pause();
                                            }
                                        }} className="w-6 h-6 scale-90 hover:scale-100 cursor-pointer transition"><span><img src="../images/icons/play-button.png" alt="play Icon" /></span></button>
                                        <button onClick={toBeImplemented} className="w-4 h-4 scale-90 hover:scale-100 cursor-pointer transition"><span><img src="../images/icons/foward.png" alt="foward Icon" /></span></button>
                                        <button onClick={toBeImplemented} className="w-4 h-4 scale-90 hover:scale-100 cursor-pointer transition"><span><img src="../images/icons/loop.png" alt="loop Icon" /></span></button>
                                    </div>
                                    <div className="px-8 w-full flex items-center gap-4">
                                        <span>
                                            {Math.floor(configMultimedia.currentSecond / 60)}:{Math.floor(configMultimedia.currentSecond % 60).toString().padStart(2, '0')}
                                        </span>
                                        <input
                                            type="range"
                                            min="0"
                                            max={Math.floor(configMultimedia.duracion)}
                                            step={0.01}
                                            value={configMultimedia.currentSecond}
                                            onChange={(e) => handleMultimediaMomento(Number(e.target.value))}
                                            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <span>
                                            {Math.floor(configMultimedia.duracion / 60)}:{Math.floor(configMultimedia.duracion % 60).toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* <div className="hidden">
                                        {isVideo ? (
                                            <video src={currentMultimedia.multimedia}
                                                ref={multimediaRef}
                                                autoPlay
                                                className="w-0"
                                                onLoadedMetadata={() => {
                                                    setConfigMultimedia(prevConfig => ({
                                                        ...prevConfig,
                                                        duracion: multimediaRef.current.duration.toFixed(2),
                                                    }));
                                                    multimediaRef.current.volume = configMultimedia.volumen;
                                                    setEventListenerTimeUpdate();
                                                }} />

                                        ) : (
                                            <audio src={currentMultimedia.multimedia}
                                                ref={multimediaRef}
                                                autoPlay
                                                className="w-0"
                                                onLoadedMetadata={() => {
                                                    setConfigMultimedia(prevConfig => ({
                                                        ...prevConfig,
                                                        duracion: multimediaRef.current.duration.toFixed(2),
                                                    }));
                                                    multimediaRef.current.volume = configMultimedia.volumen;
                                                    setEventListenerTimeUpdate();
                                                }}
                                            />

                                        )}
                                    </div> */}
                                </div>
                                <div className="flex-grow-1 flex gap-2 items-center p-4">
                                    <img onClick={() => { handleMuted() }} className="w-4 h-4 scale-90 hover:scale-100 cursor-pointer" src={volumeIcon} alt="icono de volumen" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step={0.01}
                                        value={configMultimedia.volumen}
                                        onChange={(e) => handleVolumen(Number(e.target.value))}
                                        className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                                    />
                                </div>


                            </section>
                        ) : (null)}


                    </MultimediaContext.Provider>
                </AlbumContext.Provider>
            </main>
            <Footer />
        </div>
    );
}
