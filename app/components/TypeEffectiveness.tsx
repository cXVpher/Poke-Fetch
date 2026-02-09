export default function TypeEffectiveness({ weaknesses, strengths }: { weaknesses: string[], strengths: string[] }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-red-500 pl-3">Combat Info</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Weakness Column */}
                <div>
                    <p className="text-sm font-bold text-gray-400 uppercase mb-2">Weak Against (2x DMG)</p>
                    <div className="flex flex-wrap gap-2">
                        {weaknesses.map(t => (
                            <span key={t} className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded capitalize border border-red-200">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Strength Column */}
                <div>
                    <p className="text-sm font-bold text-gray-400 uppercase mb-2">Strong Against (2x DMG)</p>
                    <div className="flex flex-wrap gap-2">
                        {strengths.length > 0 ? strengths.map(t => (
                            <span key={t} className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded capitalize border border-green-200">
                                {t}
                            </span>
                        )) : <span className="text-gray-400 text-xs italic">No specific offensive advantage</span>}
                    </div>
                </div>
            </div>
        </section>
    );
}