const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`
        bg-gray-900 border border-gray-800
        rounded-xl p-6 shadow-lg
        hover:shadow-xl transition-all duration-300
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;