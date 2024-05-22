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
        
        try {
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
                
                // Check if the user is an admin
                if (userData.role === 'admin') {
                    // Update the isAdmin state to true
                    setIsAdmin(true);
                    // Redirect to admin dashboard
                    navigate('/admin');
                } else {
                    // Handle non-admin user
                    console.error('User is not an admin');
                }
            } else {
                // Handle login failure
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
