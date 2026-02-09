import Link from "next/link";

// Kita terima data lewat "props"
export default function PokemonHeader({ pokemon, species }: { pokemon: any, species: any }) {
    
    // Logic mencari deskripsi bahasa inggris
    const flavorText = species.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text.replace(/[\f\n\r]/g, ' ');

    const typeColors: Record<string, string> = {
        fire: 'bg-orange-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
        psychic: 'bg-pink-500', ice: 'bg-cyan-400', dragon: 'bg-indigo-600', dark: 'bg-gray-800',
        fairy: 'bg-pink-300', normal: 'bg-gray-400', fighting: 'bg-red-700', flying: 'bg-indigo-400',
        poison: 'bg-purple-500', ground: 'bg-yellow-600', rock: 'bg-yellow-800', bug: 'bg-lime-600',
        ghost: 'bg-purple-800', steel: 'bg-gray-500',
    };
    const bgColor = typeColors[pokemon.types[0].type.name] || 'bg-gray-500';

    return (
        <div className={`relative p-6 ${bgColor} rounded-t-3xl`}>
            <Link href="/" className="absolute top-6 left-6 text-white bg-black/20 px-3 py-1 rounded-full text-sm hover:bg-black/40">
                &larr; Back
            </Link>
            
            <div className="flex flex-col items-center mt-4 text-white">
                <h1 className="text-4xl font-black capitalize drop-shadow-md">{pokemon.name}</h1>
                
                {/* Tipe */}
                <div className="flex gap-2 mt-3">
                    {pokemon.types.map((t: any) => (
                        <span key={t.type.name} className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold capitalize border border-white/30">
                            {t.type.name}
                        </span>
                    ))}
                </div>

                {/* Gambar */}
                <img 
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                    className="w-56 h-56 -mb-12 mt-4 z-10 drop-shadow-2xl hover:scale-105 transition-transform"
                />
            </div>

            {/* Deskripsi Baru (Flavor Text) */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mt-4 border border-white/20">
                <p className="text-white text-center italic text-sm">
                    "{flavorText || 'No description available.'}"
                </p>
            </div>
        </div>
    );
}