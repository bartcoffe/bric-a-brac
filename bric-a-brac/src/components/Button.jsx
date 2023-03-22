import classNames from "classnames";
function Button({ children, selected, green, ...rest }) {
    const className = classNames(
        "text-zinc-200 bg-zinc-800 rounded-lg px-4 py-2 shadow-xl duration-500 hover:scale-105",
        {
            "bg-yellow-700": selected,
        }
    );
    return (
        <button {...rest} className={className}>
            {children}
        </button>
    );
}
export default Button;
