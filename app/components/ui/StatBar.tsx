type Props = {
    label: string;
    value: number;
    max?: number;
};

export default function StatBar({ label, value, max = 150 }: Props) {
    // Logic warna dinamis (Hijau jika tinggi, Merah jika rendah)
    const getColor = (val: number) => {
        if (val >= 100) return 'bg-green-500';
        if (val >= 60) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="flex items-center text-sm mb-2">
            <span className="w-24 text-gray-500 font-bold text-xs uppercase tracking-wide">{label}</span>
            <span className="w-8 font-bold text-gray-800 text-right mr-3">{value}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${getColor(value)}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}