import React from "react";
import { useEffect, useState, useContext } from "react";

import AlbumContext from "../../../context/albumContext";

export default function AlbumCard({ album }) {

    const { setCurrentAlbum } = useContext(AlbumContext);

    const handleClick = () => {
        setCurrentAlbum(album);
    };

    return (
        <div className="text-white p-4 rounded-lg flex gap-4 items-center hover:bg-stone-700 cursor-pointer select-none"
            onClick={handleClick}>
            <img src={album.cover} alt={album.title} className="w-16 h-16 rounded-lg self-center" />
            <section>
                <h3 className="text-white text-lg font-bold">{album.title}</h3>
                <p className="text-gray-400">{album.artist}</p>
            </section>
        </div>
    );
}