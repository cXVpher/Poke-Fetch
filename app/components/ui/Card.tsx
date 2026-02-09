type Props = {
    children: React.ReactNode;
    className?: string; // Opsional jika ingin nambah class tambahan
};

export default function Card({ children, className = "" }: Props) {
    return (
        <div className={`bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 cursor-pointer relative overflow-hidden group ${className}`}>
             {/* Dekorasi Background Bola samar */}
             <div className="absolute -right-5 -top-5 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors pointer-events-none"></div>
             
             {/* Konten Card */}
             <div className="relative z-10 w-full flex flex-col items-center">
                {children}
             </div>
        </div>
    );
}