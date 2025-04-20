import React from "react";
import { useEffect, useState } from "react";
import AlbumCard from "./albumCard";

export default function AlbumLists() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       fetch('../../../data/data.json')
           .then((response) => response.json())
           .then((data) => {
               setAlbums(data.albums);
               setLoading(false);
           })
           .catch((error) => console.error('Error fetching albums:', error));
    }, []);

    return (
        <div >
            <h2 className="text-2xl text-white font-bold mb-4">Tu biblioteca</h2>
            <input type="text" placeholder="Buscar..." className="p-2 placeholder-white text-white border border-gray-300 rounded mb-4 w-full" />                     
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="flex flex-col">
                    {albums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </div>
            )}
        </div>
    );
}