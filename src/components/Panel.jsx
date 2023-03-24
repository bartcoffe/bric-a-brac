import classNames from "classnames";
function Panel({ children, className, ...rest }) {
    const finalClassNames = classNames(
        "p-4 m-2 text-neutral-800 bg-neutral-100 rounded-lg shadow-lg",
        className
    );
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}
export default Panel;
