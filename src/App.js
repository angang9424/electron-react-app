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
import Books from './client/pages/Books';
import PurchaseOrder from './client/pages/PurchaseOrder';
import PurchaseOrderDetails from '../src/client/components/purchaseOrder/PurchaseOrderDetails';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr';

function App() {
	const navigate = useNavigate();

	const [dropdown, setDropdown] = useState(false);
	const [subDropdown, setSubDropdown] = useState(false);
	const [anchor, setAnchor] = useState(null);
	
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
		navigate('/login');
	};

	const CloseButton = () => {
		const handleCloseApp = () => {
			// Call the exposed API from the preload script
			localStorage.removeItem("accessToken");
			window.api.closeApp();
		};

		handleCloseApp();
	};

	const popoverDropdown = (event) => {
		setDropdown(!dropdown);
		setAnchor(event.currentTarget);
	}

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<div className='navbar'>
					{authState.status ? (
						<>
							<ul className="nav-items">
								<li>
									<Link to='/books' className='dropdownBtn'>Books</Link>
								</li>
								<li>
									<Link to='/purchase_order' className='dropdownBtn'>Purchase Order</Link>
								</li>
								<li onClick={popoverDropdown}>
									<Link className='dropdownBtn'>{ authState.username }</Link>
									<Popover anchorEl={anchor} open={dropdown} style={{top: '50px'}}>
										<Box sx={{ p: '16px 20px ' }}>
											<Typography variant="subtitle1">Sofia Rivers</Typography>
											<Typography color="text.secondary" variant="body2">
												sofia.rivers@devias.io
											</Typography>
										</Box>
										<Divider />
										<MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1, color: '#667085' } }}>
											<Link to='/' onClick={() => setSubDropdown(false)} style={{textDecoration: 'none'}}>
												<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
													<ListItemIcon><HouseIcon /></ListItemIcon>
													Home
												</MenuItem>
											</Link>
											<Link to='/profile' onClick={() => setSubDropdown(false)} style={{textDecoration: 'none'}}>
												<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
													<ListItemIcon><UserIcon fontSize="var(--icon-fontSize-md)" /></ListItemIcon>
													Profile
												</MenuItem>
											</Link>
											<Link to='/login' onClick={logout} style={{textDecoration: 'none'}}>
												<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
													<ListItemIcon><SignOutIcon fontSize="var(--icon-fontSize-md)" /></ListItemIcon>
													Logout
												</MenuItem>
											</Link>
										</MenuList>
										<Divider />
										<MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1, color: '#667085' } }}>
											<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }} onClick={CloseButton}>
												Exit
											</MenuItem>
										</MenuList>
									</Popover>
								</li>
							</ul>
						</>
					) : (
						<>
							<Link onClick={CloseButton}>Close App</Link>
						</>
					)}
					
				</div>
				<Routes>
					<Route path='/login' exact element={<Login />}/>
					<Route path='/registration' exact element={<Registration />}/>
					<Route path='/' exact element={<Home />}/>
					<Route path='/profile' exact element={<Profile />}/>
					<Route path='/books' exact element={<Books />}/>
					<Route path='/purchase_order' exact element={<PurchaseOrder />}/>
					<Route path='/purchase_order_details' exact element={<PurchaseOrderDetails />}/>
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
