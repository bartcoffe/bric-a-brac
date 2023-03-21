function Button({ children, ...rest }) {
    return (
        <button
            {...rest}
            className='text-indigo-200 bg-red-400 rounded-lg p-1 border-2 border-indigo-200'
        >
            {children}
        </button>
    );
}
export default Button;
