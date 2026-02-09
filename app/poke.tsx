'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
// Import UI Kit kita
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Card from "./components/ui/Card";

// ... (Logic fetchPokemon dan getIdFromUrl tetap sama) ...
const fetchPokemon = async (type: string) => {
    if (type === 'all') {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await res.json();
        return data.results;
    } else {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        return data.pokemon.map((p: any) => p.pokemon);
    }
};

const getIdFromUrl = (url: string) => url.split('/').filter(Boolean).pop();


export default function PokeList() {
    const [selectedType, setSelectedType] = useState('all');
    const [allPokemon, setAllPokemon] = useState<any[]>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const types = ['all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'];

    useEffect(() => {
        setLoading(true);
        setSearchQuery('');
        fetchPokemon(selectedType)
            .then((data) => {
                setAllPokemon(data);
                setFilteredPokemon(data);
                setLoading(false);
            });
    }, [selectedType]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredPokemon(allPokemon);
        } else {
            setFilteredPokemon(allPokemon.filter(p => p.name.includes(searchQuery.toLowerCase())));
        }
    }, [searchQuery, allPokemon]);

    return (
        <div className="space-y-8">
            
            {/* Bagian Kontrol (Search & Filter) */}
            <div className="space-y-6">
                <Input 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search your favorite Pokémon..."
                />
                
                <div className="flex flex-wrap gap-2 justify-center">
                    {types.map((type) => (
                        <Button 
                            key={type} 
                            onClick={() => setSelectedType(type)}
                            isActive={selectedType === type}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Bagian Grid */}
            <div className="border-t pt-6">
                <p className="mb-4 text-gray-500 font-medium">Found {filteredPokemon.length} results</p>
                
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading Pokedex data...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredPokemon.map((entry) => {
                            const pId = getIdFromUrl(entry.url);
                            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pId}.png`;

                            return (
                                <Link href={`/pokemon/${entry.name}`} key={entry.name}>
                                    {/* Component Abstraction: CARD */}
                                    <Card>
                                        <span className="text-xs text-gray-400 font-mono self-start">#{pId}</span>
                                        <img 
                                            src={imgUrl} 
                                            alt={entry.name}
                                            className="w-24 h-24 object-contain my-2"
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pId}.png` }}
                                        />
                                        <h3 className="font-bold text-gray-700 capitalize text-center">{entry.name}</h3>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}