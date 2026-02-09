import PokemonHeader from "@/app/components/PokemonHeader";
import BaseStats from "@/app/components/BaseStats";
import EvolutionChain from "@/app/components/EvolutionChain";
import TypeEffectiveness from "@/app/components/TypeEffectiveness";

// --- FETCHING LOGIC ---

async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Pokemon not found");
  return res.json();
}

// FUNGSI BARU: Fetch Species menggunakan URL, bukan Nama
// Ini mencegah error jika nama pokemon beda dengan nama spesies
async function getSpecies(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Species not found");
    return res.json();
}

async function getEvolutionChain(url: string) {
  // Cek jika URL tidak ada (kadang pokemon mythic tidak punya evolusi)
  if (!url) return []; 
  
  const evoRes = await fetch(url);
  const evoData = await evoRes.json();

  const chain = [];
  let current = evoData.chain;

  while (current) {
    const id = current.species.url.split("/").filter(Boolean).pop();
    chain.push({
      name: current.species.name,
      id: id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });
    current = current.evolves_to[0];
  }
  return chain;
}

async function getTypeEffectiveness(types: any[]) {
  const typeUrls = types.map((t: any) => t.type.url);
  const typeResponses = await Promise.all(typeUrls.map((url) => fetch(url).then((res) => res.json())));
  
  const weaknesses = new Set<string>();
  const strengths = new Set<string>();

  typeResponses.forEach((typeData: any) => {
    typeData.damage_relations.double_damage_from.forEach((t: any) => weaknesses.add(t.name));
    typeData.damage_relations.double_damage_to.forEach((t: any) => strengths.add(t.name));
  });

  return {
    weaknesses: Array.from(weaknesses),
    strengths: Array.from(strengths),
  };
}

// --- PAGE UTAMA ---
export default async function PokemonDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  
  // 1. Fetch Pokemon DULUAN (Ini data paling penting)
  // Kita gunakan try-catch agar jika error, halaman tidak putih total
  let pokemon;
  try {
      pokemon = await getPokemon(name);
  } catch (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-300">404</h1>
                <p className="text-gray-500">Pokemon data not found.</p>
                <a href="/" className="text-blue-500 hover:underline mt-4 block">Back to Home</a>
            </div>
        </div>
      );
  }

  // 2. Ambil URL Species DARI data Pokemon
  // Logic: Jangan tebak nama spesies, ambil linknya langsung dari properti 'pokemon.species.url'
  const species = await getSpecies(pokemon.species.url);
  
  // 3. Fetch Data Tambahan (Evolution & Effectiveness) secara Paralel
  // Evolution chain diambil dari URL yang ada di dalam data 'species'
  const [evolutionChain, effectiveness] = await Promise.all([
      species.evolution_chain?.url ? getEvolutionChain(species.evolution_chain.url) : [],
      getTypeEffectiveness(pokemon.types)
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <PokemonHeader pokemon={pokemon} species={species} />

        <div className="pt-12 pb-8 px-8 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
                 <div className="p-3 bg-gray-50 rounded-xl border">
                    <p className="text-gray-400 text-xs uppercase font-bold">Height</p>
                    <p className="text-lg font-semibold">{pokemon.height / 10} m</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                    <p className="text-gray-400 text-xs uppercase font-bold">Weight</p>
                    <p className="text-lg font-semibold">{pokemon.weight / 10} kg</p>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Evolusi */}
            {evolutionChain.length > 0 && (
                <>
                    <EvolutionChain chain={evolutionChain} currentName={pokemon.name} />
                    <hr className="border-gray-100" />
                </>
            )}

            {/* Type Effectiveness */}
            <TypeEffectiveness 
                weaknesses={effectiveness.weaknesses} 
                strengths={effectiveness.strengths} 
            />

            <hr className="border-gray-100" />

            {/* Base Stats */}
            <BaseStats stats={pokemon.stats} />
        </div>
      </div>
    </div>
  );
}