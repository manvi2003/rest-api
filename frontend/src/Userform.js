import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setData(e.target.value.split(','));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://rest-api-f3m5.onrender.com/api/userdata', { data });
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred');
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>Data Input Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="data">Enter data (comma-separated): </label>
                    <input
                        type="text"
                        id="data"
                        onChange={handleInputChange}
                        placeholder="e.g., M,1,334,4,B,2,a"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div style={{ color: 'red' }}>
                    <h2>Error:</h2>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default UserForm;
