function Panel({ children, ...rest }) {
    const classnames =
        "grow text-indigo-800 bg-yellow-300 rounded-lg border-4 border-indigo-400 flex gap-4 justify-center p-4";
    return (
        <div {...rest} className={classnames}>
            {children}
        </div>
    );
}
export default Panel;
