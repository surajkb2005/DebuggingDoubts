//Frontend\src\components\ui\Button.jsx
const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            {...props}
            className={`
        px-5 py-2 rounded-lg font-semibold
        bg-blue-600 hover:bg-blue-700
        active:scale-95
        shadow-md hover:shadow-blue-500/30
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default Button;