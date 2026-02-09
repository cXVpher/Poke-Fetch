'use client';
import Link from "next/link";

type Pokemon = {
    name: string;
    url: string;
};

type Props = {
    pokemons: Pokemon[];
    loading: boolean;
};

const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

export default function PokemonGrid({ pokemons, loading }: Props) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (pokemons.length === 0) {
        return <div className="text-center text-gray-500 mt-10">No Pokémon found.</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemons.map((p) => {
                const pId = getIdFromUrl(p.url);
                const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pId}.png`;

                return (
                    <Link href={`/pokemon/${p.name}`} key={p.name} className="group block">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-400 cursor-pointer relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors"></div>
                            <span className="text-xs text-gray-400 font-mono self-start z-10">#{pId}</span>
                            <img 
                                src={imgUrl} 
                                alt={p.name}
                                className="w-24 h-24 object-contain z-10 drop-shadow-sm group-hover:scale-110 transition-transform"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pId}.png`;
                                }}
                            />
                            <h3 className="mt-2 font-bold text-gray-700 capitalize group-hover:text-blue-600 transition-colors z-10 text-center text-sm">
                                {p.name.replace(/-/g, ' ')}
                            </h3>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}