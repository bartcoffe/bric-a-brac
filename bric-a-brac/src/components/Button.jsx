function Button({ children, ...rest }) {
    return (
        <button
            {...rest}
            className='text-zinc-200 bg-zinc-800 rounded-lg px-4 py-2 shadow-xl hover:bg-zinc-700'
        >
            {children}
        </button>
    );
}
export default Button;