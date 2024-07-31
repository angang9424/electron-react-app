import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthContext } from './client/helpers/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from './client/pages/Login';
import Registration from './client/pages/Registration';
import Home from './client/pages/Home';
import Profile from './client/pages/UserProfile';

function App() {
	const navigate = useNavigate();

	const [dropdown, setDropdown] = useState(false);
	const [subDropdown, setSubDropdown] = useState(false);

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
		setSubDropdown(false);
		navigate('/');
	};

	const CloseButton = () => {
		const handleCloseApp = () => {
			// Call the exposed API from the preload script
			localStorage.removeItem("accessToken");
			window.api.closeApp();
		};

		handleCloseApp();
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<div className='navbar'>
					{!localStorage.getItem("accessToken") ? (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/registration'>Registration</Link>
						</>
					) : (
						<>
							<ul className="nav-items">
								<li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
									<Link>{ authState.username }</Link>
									{dropdown && (
										<>
											<ul
												className={subDropdown ? "services-submenu clicked" : "services-submenu"}
											>
												<li><Link to='/' onClick={() => setSubDropdown(false)}>Home</Link></li>
												<li><Link to='/profile' onClick={() => setSubDropdown(false)}>Profile</Link></li>
												<li><Link to='/login' onClick={logout}>Logout</Link></li>
											</ul>
										</>
									)}
								</li>
							</ul>
						</>
					)}
					<Link onClick={CloseButton}>Close App</Link>
				</div>
				<Routes>
					<Route path='/login' exact element={<Login />}/>
					<Route path='/registration' exact element={<Registration />}/>
					<Route path='/' exact element={<Home />}/>
					<Route path='/profile' exact element={<Profile />}/>
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
