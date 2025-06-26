export function Input({placeholder,reference,type = "text"}: {
    placeholder: string,
    reference?: any,
    type?: string
}) {
    return (
        <input 
            ref={reference}
            type={type}
            placeholder={placeholder}
            className="m-2 border border-gray-600 text-gray-400 text-center rounded px-3 py-2 focus:outline-none focus:border-gray-400 text-2xl font-medium"
        />
    )
}
