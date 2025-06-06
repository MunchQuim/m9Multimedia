import React, { useEffect } from "react";

export default function MultiUse({ multimedia, isVideo, multimediaRef, configMultimedia, setConfigMultimedia, setEventListenerTimeUpdate }) {
    useEffect(() => {
        const media = multimediaRef.current;

        if (!media) return;

        const handleLoadedMetadata = () => {
            if (media) {
                media.volume = 0.5;
            }
        };

        media.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            media.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [multimedia]);

    if (!multimedia) return null;

    return (
        <>
            {isVideo ? (
                <video
                    src={multimedia.multimedia}
                    ref={multimediaRef}
                    className="w-full rounded-lg"
                    autoPlay
                    onLoadedMetadata={() => {
                        setConfigMultimedia(prevConfig => ({
                            ...prevConfig,
                            duracion: multimediaRef.current.duration.toFixed(2),
                        }));
                        multimediaRef.current.volume = configMultimedia.volumen;
                        setEventListenerTimeUpdate();
                    }}
                />
            ) : (
                <section className="overflow-hidden lg:text-left text-center">
                    <img className="lg:w-64 lg:h-64 w-48 h-48 m-auto" src={multimedia.cover_big} alt="cover" />
                    <h1 className="text-white text-2xl lg:text-4xl ">{multimedia.title}</h1>
                    <p className="lg:text-base text-sm text-gray-400">{multimedia.artist}</p>
                    <audio
                        src={multimedia.multimedia}
                        ref={multimediaRef}
                        autoPlay
                        className="hidden"
                        onLoadedMetadata={() => {
                            setConfigMultimedia(prevConfig => ({
                                ...prevConfig,
                                duracion: multimediaRef.current.duration.toFixed(2),
                            }));
                            multimediaRef.current.volume = configMultimedia.volumen;
                            setEventListenerTimeUpdate();
                        }}
                    />
                </section>
            )}
        </>
    );
}
