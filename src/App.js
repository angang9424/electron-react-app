import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Login from './client/pages/Login';
import Registration from './client/pages/Registration';

import { AuthContext } from './client/helpers/AuthContext';
import { useState, useEffect } from 'react';

function App() {
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
	};

  return (
	<div className="App">
		<AuthContext.Provider value={{ authState, setAuthState }}>
			<Router>
				<div className='navbar'>
					<>
						<Link to='/'>Login</Link>
						<Link to='/registration'>Registration</Link>
					</>
				</div>
				<Routes>
					<Route path='/' exact element={<Login />}/>
					<Route path='/registration' exact element={<Registration />}/>
				</Routes>
			</Router>
		</AuthContext.Provider>
	</div>
  );
}

export default App;
