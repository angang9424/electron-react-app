import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Login from './client/pages/Login';
import Registration from './client/pages/Registration';
import Home from './client/pages/Home';

import { AuthContext } from './client/helpers/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();

	const [authState, setAuthState] = useState({
		username: "",
		id: 0,
		status: false
	});

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState({
			username: "",
			id: 0,
			status: false
		});

		navigate('/');
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<div className='navbar'>
					<>
						<Link to='/'>Login</Link>
						<Link to='/registration'>Registration</Link>
						<button onClick={logout}>Logout</button>
					</>
				</div>
				<Routes>
					<Route path='/' exact element={<Login />}/>
					<Route path='/registration' exact element={<Registration />}/>
					<Route path='/home' exact element={<Home />}/>
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
