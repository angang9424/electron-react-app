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
import SalesOrder from './client/pages/SalesOrder';
import SalesOrderDetails from '../src/client/components/salesOrder/SalesOrderDetails';
import POS from '../src/client/pages/POS';

import MainNav from './client/components/MainNav';
import SideNav from './client/components/SideNav';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function App() {
	const [authState, setAuthState] = useState({
		username: "",
		id: 0,
		status: false
	});

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
				<GlobalStyles
					styles={{
						body: {
							// '--MainNav-height': '56px',
							// '--MainNav-zIndex': 1000,
							'--SideNav-width': '280px',
							'--SideNav-zIndex': 1100,
							// '--MobileNav-width': '320px',
							// '--MobileNav-zIndex': 1100,
						},
					}}
				/>
				{authState.status ? (
					<>
						{/* <Box
							sx={{
							bgcolor: 'var(--mui-palette-background-default)',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative',
							minHeight: '100%',
							}}
						>
							<SideNav openNav={openNav} />
							<Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
								<div className='navbar'>
									<ul className="nav-items">
										<li style={{}}>
											<IconButton
												onClick={() => {
													setOpenNav(openNav);
												}}
												sx={{ display: { lg: 'none' }, bgcolor: 'white' }}
											>
												<ListIcon bgcolor='white' />
											</IconButton>
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
								</div>
								<Container maxWidth="xl" sx={{ py: '64px' }}>
									<Routes>
										<Route path='/' exact element={<Home />}/>
										<Route path='/registration' exact element={<Registration />}/>
										<Route path='/profile' exact element={<Profile />}/>
										<Route path='/books' exact element={<Books />}/>
										<Route path='/purchase_order' exact element={<PurchaseOrder />}/>
										<Route path='/purchase_order_details' exact element={<PurchaseOrderDetails />}/>
									</Routes>
								</Container>
							</Box>
						</Box> */}
						<SideNav />
						<Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
							<MainNav />
							<Container maxWidth="xl" sx={{ py: '64px' }}>
								<Routes>
									<Route path='/' exact element={<Home />}/>
									<Route path='/login' exact element={<Login />}/>
									<Route path='/registration' exact element={<Registration />}/>
									<Route path='/profile' exact element={<Profile />}/>
									<Route path='/books' exact element={<Books />}/>
									<Route path='/purchase_order' exact element={<PurchaseOrder />}/>
									<Route path='/purchase_order_details' exact element={<PurchaseOrderDetails />}/>
									<Route path='/sales_order' exact element={<SalesOrder />}/>
									<Route path='/sales_order_details' exact element={<SalesOrderDetails />}/>
									<Route path='/pos' exact element={<POS />}/>
								</Routes>
							</Container>
						</Box>
					</>
				) : (
					<>
						<div className='navbar'>
							<Link onClick={CloseButton}>Close App</Link>
						</div>
						<Routes>
							<Route path='/' exact element={<Home />}/>
							<Route path='/login' exact element={<Login />}/>
						</Routes>
					</>
				)}
			</AuthContext.Provider>
		</div>
	);
}

export default App;