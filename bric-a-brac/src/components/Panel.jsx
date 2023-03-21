import classNames from "classnames";
function Panel({ children, className, ...rest }) {
    const finalClassNames = classNames(
        "p-4 m-4 text-slate-800 bg-yellow-600 rounded-lg",
        className
    );
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}
export default Panel;
