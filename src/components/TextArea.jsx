function TextArea({ children, readOnly, value, ...rest }) {
    const classes =
        "rounded-lg w-full bg-neutral-300 text-neutral-800 shadow-lg py-4 my-4 px-2 focus:outline-none break-all";
    return !readOnly ? (
        <textarea value={value} {...rest} className={classes} />
    ) : (
        <div className={classes}>{value}</div>
        // <textarea {...rest} className={classes} />
    );
}

export default TextArea;
