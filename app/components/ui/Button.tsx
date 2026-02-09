type Props = {
    children: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
};

export default function Button({ children, onClick, isActive = false }: Props) {
    // Logic CSS dipisah di sini
    const baseStyle = "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 border";
    const activeStyle = "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105";
    const inactiveStyle = "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300";

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
            {children}
        </button>
    );
}