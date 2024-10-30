import React, { useEffect, useState, useId } from 'react';
import axios from 'axios';

function Select({
    label,
    className,
    apiEndpoint,  // New prop to pass the API endpoint
    ...props
}, ref) {
    const id = useId();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Fetching options from the backend (MySQL)
        const fetchOptions = async () => {
            try {
                const response = await axios.get(apiEndpoint); // Fetch data from the provided API endpoint
                setOptions(response.data);  // Assuming response.data is an array of options
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        if (apiEndpoint) {
            fetchOptions();
        }
    }, [apiEndpoint]);

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option.id || option} value={option.value || option}>
                        {option.label || option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
