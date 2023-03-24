import classNames from "classnames";

function BoldP({ children, className, ...rest }) {
    const finalClassNames = classNames("text-lg font-bold tracking-wide", className);
    return (
        <p className={finalClassNames} {...rest}>
            {children}
        </p>
    );
}
export default BoldP;
