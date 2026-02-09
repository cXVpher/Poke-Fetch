import Link from "next/link";

export default function EvolutionChain({ chain, currentName }: { chain: any[], currentName: string }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">Evolution Chain</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
                {chain.map((evo, index) => (
                    <div key={evo.id} className="flex items-center">
                        <Link href={`/pokemon/${evo.name}`} className="group flex flex-col items-center">
                            <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center bg-gray-50 transition-all ${evo.name === currentName ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 group-hover:border-blue-300'}`}>
                                <img src={evo.image} alt={evo.name} className="w-16 h-16" />
                            </div>
                            <span className={`text-sm mt-2 font-medium capitalize ${evo.name === currentName ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                                {evo.name}
                            </span>
                        </Link>
                        {index < chain.length - 1 && (
                            <span className="mx-2 text-gray-300 text-xl font-bold">→</span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}