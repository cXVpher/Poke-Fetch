export default function BaseStats({ stats }: { stats: any[] }) {
    return (
        <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">Base Stats</h3>
            <div className="space-y-3">
                {stats.map((s: any) => (
                    <div key={s.stat.name} className="flex items-center text-sm">
                        <span className="w-32 text-gray-500 uppercase font-bold text-xs">{s.stat.name.replace('-', ' ')}</span>
                        <span className="w-8 font-bold text-gray-700 text-right mr-3">{s.base_stat}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${s.base_stat > 100 ? 'bg-green-500' : s.base_stat > 60 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                                style={{ width: `${Math.min(s.base_stat, 150) / 1.5}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}