import classNames from "classnames";
function Button({ children, selected, green, ...rest }) {
    const className = classNames(
        "text-neutral-800 bg-neutral-200 rounded-lg px-4 py-2 shadow-lg duration-500 hover:scale-105",
        {
            "bg-neutral-400": selected,
        }
    );
    return (
        <button {...rest} className={className}>
            {children}
        </button>
    );
}
export default Button;
