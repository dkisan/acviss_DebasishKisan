import React, { useRef } from 'react';
import styles from './signupstyle.module.css'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);



    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                // confirmPassword: confirmPasswordRef.current.value,
            };

            if (!Object.values(userData).every(Boolean)) {
                alert("Please fill all fields.");
                return;
            }

            if (userData.password !== confirmPasswordRef.current.value) {
                alert("Passwords do not match");
                passwordRef.current.focus()
                return;
            }
            await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            alert('User Created Successfully')
            navigate('/login')

        } catch (err) {
            alert(err.message)
            // setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupform}>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <label htmlFor='nameid'>Name:</label>
                    <input
                        id='nameid'
                        type="text"
                        ref={nameRef}
                    />
                    <br />
                    <label htmlFor='emailid'>Email:</label>
                    <input
                        id='emailid'
                        type="email"
                        ref={emailRef}
                    />
                    <br />
                    <label htmlFor='passwordid'>Password:</label>
                    <input
                        id='passwordid'
                        type="password"
                        ref={passwordRef}
                    />
                    <br />
                    <label htmlFor='confirmid'>Confirm Password:</label>
                    <input
                        id='confirmid'
                        type="password"
                        ref={confirmPasswordRef}
                    />
                    <br />
                    <button type="submit">Signup</button>
                </form>
                <p style={{ marginTop: '10px', textAlign: 'right' }}>Already Have an Account
                    <Link to={'/login'}>Login</Link>
                </p>
                {/* {error && <div className={styles.errormessage}>{error}</div>} */}
            </div>
        </div>
    );
};


export default Signup;