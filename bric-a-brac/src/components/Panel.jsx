function Panel({ children, ...rest }) {
    const classnames = "p-4 m-4 text-center text-slate-800 bg-yellow-500 rounded-lg  ";
    return (
        <div {...rest} className={classnames}>
            {children}
        </div>
    );
}
export default Panel;
