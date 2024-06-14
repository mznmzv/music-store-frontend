export const InputField = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='mt-2 py-1 px-2 text-black w-full rounded-lg border-2 outline-none placeholder:text-gray-500 focus:shadow-lg focus:shadow-blue-100 focus:border-blue-200 transition-all duration-300'
        />
    )
}
