import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [books, setBooks] = useState([]);
	const {setAuthState} = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/users/userLogin`;

	const navigate = useNavigate();

	useEffect(() => {
		// try {
		// 	const fetchData = async() => {
		// 		const result = await fetch(URL);
		// 		if (!result.ok) {
		// 			throw new Error(`HTTP error! status: ${result.status}`);
		// 		}
		// 		result.json().then(json => {
		// 			setBooks(json.data);
		// 		})
		// 	}

		// 	fetchData();
		// } catch (error) {
        //     console.error('Error fetching data:', error);
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
					result.json().then(json => {
						console.log("Existing User")
						localStorage.setItem("accessToken", json.data[0].token);
					})
				}
			}

			postData();
		} catch (error) {
            console.error('Error posting data:', error);
        }
	};

	return (
		<div className='homeContainer'>
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