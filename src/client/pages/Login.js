import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [books, setBooks] = useState([]);
	const {setAuthState} = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/users/checkUser`;

	const navigate = useNavigate();

	useEffect(() => {
		// if (localStorage.getItem("accessToken")) {
		// 	navigate('/home');
		// }
	}, []);

	const login = () => {
		const user = { username: username, password: password };

		try {
			const postData = async() => {
				const result = await fetch(URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user)
				});

				if (!result.ok) {
					throw new Error(`HTTP error! status: ${result.status}`);
				} else {
					console.log("Existing User")
				}
			}

			postData();
		} catch (error) {
            console.error('Error posting data:', error);
        }
	};

	const CloseButton = () => {
		const handleCloseApp = () => {
			// Call the exposed API from the preload script
			window.api.closeApp();
		};

		handleCloseApp();
	};

	return (
		<div className='loginContainer'>
			<label>Username:</label>
			<input type='text' className='' onChange={(event) => { setUsername(event.target.value) }} />

			<label>Password</label>
			<input type='password' onChange={(event) => { setPassword(event.target.value) }} />

			<button onClick={login}>Login</button>
			<button onClick={CloseButton}>
				Close App
			</button>

			{/* <div>
				{books ? (
					books.map((book, key) => {
						return <div key={key}>
							<label>{key}</label>
							<label> {book.name}</label>
							<label> {book.price}</label>
						</div>
					})
				) : (
					<p>Loading...</p>
				)}
			</div> */}
		</div>
	)
}

export default Login