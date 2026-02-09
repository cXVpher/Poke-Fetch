'use client';

type Props = {
    selectedType: string;
    onSelect: (type: string) => void;
};

export default function TypeSelector({ selectedType, onSelect }: Props) {
    const types = [
        'all', // Opsi baru untuk Global Search
        'normal', 'fire', 'water', 'grass', 'electric', 'ice', 
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
        'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'
    ];

    return (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {types.map((type) => (
                <button
                    key={type}
                    onClick={() => onSelect(type)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 border ${
                        selectedType === type 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}