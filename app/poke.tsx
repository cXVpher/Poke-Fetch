'use client';
import { useState, useEffect, use } from "react";

const getPoke = async (typeName: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    };
    return res.json();
};

export default function PokeList() {
    const [selectedType, setSelectedType] = useState('normal');
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar'];

    useEffect(() => {
        setLoading(true);
        getPoke(selectedType)
            .then((data) => {
                setPokemonList(data.pokemon);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [selectedType]);

    return (
        <div className="space-y-4">
            {/* Basic Buttons */}
            <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 border rounded capitalize ${
                            selectedType === type 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <hr className="my-4" />

            <h2 className="text-lg font-semibold capitalize">Type: {selectedType}</h2>

            {/* Basic List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-disc pl-5 space-y-1">
                    {pokemonList.map((index) => (
                        <li key={index.pokemon.name} className="capitalize">
                            {index.pokemon.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}