import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function AdminLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement logic to send form data to the server for admin login

        try {
            // Example: Sending form data to the server for authentication
            const response = await fetch('/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem("access_token", userData.access_token);
                // Assuming the server returns user data including roles

                // Check user roles to determine redirection
                const role = userData.role;
                console.log("this is the role", role);

                // Check user role and redirect accordingly
                navigate('/admin')
            } else {
                // Handle errors, perhaps show an error message
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
