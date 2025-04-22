import React from "react";
import { useEffect, useState, useContext } from "react";

import AlbumContext from "../../../context/albumContext";
import MultimediaContext from "../../../context/multimediaContext";

export default function MultimediaList() {

    const { currentAlbum } = useContext(AlbumContext);

    const [multimediaList, setMultimediaList] = useState(null);



    useEffect(() => {
        currentAlbum ? setMultimediaList(currentAlbum.content) : null;
    }, [currentAlbum])

    useEffect(() => {
        multimediaList ? console.log(multimediaList) : null;
    }, [multimediaList])


    return (
        <>
            {multimediaList ? (<>
                <AlbumInfo currentAlbum={currentAlbum} />
                <AlbumContents multimediaList={multimediaList} />
                
            </>

            ) : (
                <div>No has escogido</div>
            )}
            
        </>
    )
}

function AlbumInfo({ currentAlbum }) {
    const multimediaList = currentAlbum.content;
    const [indexes, setIndexes] = useState([]);
    useEffect(() => {
        const newIndexes = [];
        for (let index = 0; index < 4; index++) {
            let dif = 0;
            if (index >= multimediaList.length) {
                dif = index % multimediaList.length;
            } else {
                dif = index;
            }
            newIndexes.push(dif);
        }
        setIndexes(newIndexes);
    }, [])

    useEffect(() => {
        indexes.length > 0 ? console.log(indexes) : null;
    }, [indexes])

    return (
        <section className="flex text-white gap-4 p-4">
            <div className="grid grid-cols-2 grid-rows-2 rounded w-32 h-32 md:w-48 md:h-48 aspect-square">
                {indexes.map((i, idx) => (
                    <img
                        key={idx}
                        src={multimediaList[i].cover}
                        alt={`imagen de multimedia ${multimediaList[i].title}`}
                        className="md:w-24 md:h-24 w-16 h-16 object-cover"
                    />
                ))}
            </div>
            <article className="self-end">
                <h1 className="text-5xl lg:text-6xl text-white font-bold mb-4">{currentAlbum.title}</h1>
                <h3 className="text-lg text-white font-bold mb-4">{currentAlbum.artist}</h3>
                <p>{currentAlbum.content.length} archivos multimedia</p>
            </article>
        </section>
    )
}
function AlbumContents({ multimediaList }) {
    const { setCurrentMultimedia } = useContext(MultimediaContext);

    return (
        <table className="w-full text-start text-stone-300 text-base mx-4">
            <thead>
                <tr className="text-left">
                    <th >#</th>
                    <th >Título</th>
                    <th >Álbum</th>
                    <th className="hidden lg:table-cell" >Fecha de creación</th>
                    <th className="hidden md:table-cell">Duración</th>
                </tr>
            </thead>
            <tbody>
                {multimediaList.map((media, idx) => (
                    <tr onClick={() => {
                        setCurrentMultimedia(media)
                    }} className="hover:bg-stone-600 cursor-pointer" key={idx}>
                        <td className="py-2">{idx + 1}</td>
                        <td className="py-2">{<div className="flex gap-2">
                            <img className="rounded-lg" src={media.cover} alt="imagen del disco" />
                            <div className="flex flex-col self-end">
                                <p>{media.title}</p>
                                <p>{media.artist}</p>
                            </div>
                        </div>}</td>
                        <td className="py-2">{media.album_name}</td>
                        <td className="py-2 hidden lg:table-cell">{
                            new Date(media.created_at).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })
                        }</td>
                        <td className="py-2 hidden md:table-cell">{media.duration} s</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
