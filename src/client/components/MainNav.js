import React, { useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

import UserPopover from './UserPopOver';
import MobileNav from './MobileNav';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
 //
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

function MainNav() {
	const navigate = useNavigate();

	const [dropdown, setDropdown] = useState(false);
	const [openNav, setOpenNav] = useState(false);
	const [anchor, setAnchor] = useState(null);
	
	const { authState, setAuthState } = useContext(AuthContext);

	const popoverDropdown = (event) => {
		setDropdown(!dropdown);
		setAnchor(event.currentTarget);
	}

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState({
			username: "",
			id: 0,
			status: false
		});
		setDropdown(false);
		navigate('/login');
		console.log(authState)
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
		<div>
			<Box
				component="header"
				sx={{
				borderBottom: '1px solid var(--mui-palette-divider)',
				backgroundColor: 'var(--mui-palette-background-paper)',
				position: 'sticky',
				top: 0,
				zIndex: 'var(--mui-zIndex-appBar)',
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
				>
					<Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
						<IconButton
							onClick={() => {
								setOpenNav(true);
							}}
							sx={{ display: { lg: 'none' } }}
						>
							<ListIcon />
						</IconButton>
						<Tooltip title="Search">
							<IconButton>
								<MagnifyingGlassIcon />
							</IconButton>
						</Tooltip>
					</Stack>
					<Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
						<Tooltip title="Contacts">
							<IconButton>
								<UsersIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Notifications">
						<Badge badgeContent={4} color="success" variant="dot">
							<IconButton>
								<BellIcon />
							</IconButton>
						</Badge>
						</Tooltip>
						<Avatar
							onClick={popoverDropdown}
							// ref={userPopover.anchorRef}
							src="/assets/avatar.png"
							sx={{ cursor: 'pointer' }}
						/>
					</Stack>
				</Stack>
			</Box>
			<UserPopover
				anchor={anchor}
				dropdown={dropdown}
				popoverDropdown={popoverDropdown}
				logout={logout}
				CloseButton={CloseButton}
			/>
			<MobileNav
				onClose={() => {
					setOpenNav(false);
				}}
				open={openNav}
			/>
		</div>
	)
}

export default MainNav;