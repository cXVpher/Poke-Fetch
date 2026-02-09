export default function Badge({ type }: { type: string }) {
    // Mapping warna dipindah ke sini agar file lain bersih
    const colors: Record<string, string> = {
        fire: 'bg-orange-500 text-white',
        water: 'bg-blue-500 text-white',
        grass: 'bg-green-500 text-white',
        electric: 'bg-yellow-400 text-black',
        psychic: 'bg-pink-500 text-white',
        ice: 'bg-cyan-400 text-black',
        dragon: 'bg-indigo-600 text-white',
        dark: 'bg-gray-800 text-white',
        fairy: 'bg-pink-300 text-black',
        normal: 'bg-gray-400 text-white',
        fighting: 'bg-red-700 text-white',
        flying: 'bg-indigo-400 text-white',
        poison: 'bg-purple-500 text-white',
        ground: 'bg-yellow-600 text-white',
        rock: 'bg-yellow-800 text-white',
        bug: 'bg-lime-600 text-white',
        ghost: 'bg-purple-800 text-white',
        steel: 'bg-gray-500 text-white',
        all: 'bg-gray-900 text-white' // Default untuk filter 'All'
    };

    const colorClass = colors[type] || 'bg-gray-200 text-gray-800';

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize shadow-sm ${colorClass}`}>
            {type}
        </span>
    );
}