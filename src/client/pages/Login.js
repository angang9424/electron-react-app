import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [books, setBooks] = useState([]);
	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/users/userLogin`;

	const navigate = useNavigate();

	useEffect(() => {
		if (authState.status) {
			navigate('/');
		} else {
			localStorage.removeItem("accessToken");
		}

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
		axios.post(URL, user).then((response) => {
			if (response.data.error) {
				// alert(response.data.error);
			} else {
				const data = response.data.data;
				localStorage.setItem("accessToken", data.token);
				setAuthState({
					username: data.username,
					id: data.id,
					status: true
				});
				navigate(`/`);
			}
		});
		// const user = { username: username, password: password };

		// try {
		// 	const postData = async() => {
		// 		const result = await fetch(URL, {
		// 			method: 'POST',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 			},
		// 			body: JSON.stringify(user)
		// 		});

		// 		if (!result.ok) {
		// 			throw new Error(`HTTP error! status: ${result.status}`);
		// 		} else {
		// 			result.json().then(json => {
		// 				console.log("Existing User", json)
		// 				localStorage.setItem("accessToken", json.data.token);
		// 				setAuthState({
		// 					username: json.data.username,
		// 					id: json.data.id,
		// 					status: true
		// 				});
		// 				// navigate('/home');
		// 			})
		// 		}
		// 	}

		// 	postData();
		// } catch (error) {
        //     console.error('Error posting data:', error);
        // }
	};

	return (
		<div className='loginContainer'>
			<div className="login">
				<h2>3XAJ</h2>
				<input type='text' className='' placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />
				<input type='password' placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />

				<button className='loginBtn' onClick={login}>Login</button>

				<div className="links">
					<Link>Forget Password</Link>
					<Link to='/registration'>Signup</Link>
				</div>
			</div>
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