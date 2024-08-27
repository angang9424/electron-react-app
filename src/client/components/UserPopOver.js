import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

function UserPopOver({anchor, dropdown, popoverDropdown, logout, CloseButton}) {
	return (
		<Popover anchorEl={anchor} open={dropdown} onClose={popoverDropdown} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} slotProps={{ paper: { sx: { width: '240px' } } }}>
			<Box sx={{ p: '16px 20px ' }}>
				<Typography variant="subtitle1">Sofia Rivers</Typography>
				<Typography color="text.secondary" variant="body2">
					sofia.rivers@devias.io
				</Typography>
			</Box>
			<Divider />
			<MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1, color: '#667085' } }}>
				<Link to='/' onClick={popoverDropdown} style={{textDecoration: 'none'}}>
					<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
						<ListItemIcon><HouseIcon /></ListItemIcon>
						Home
					</MenuItem>
				</Link>
				<Link to='/profile' onClick={popoverDropdown} style={{textDecoration: 'none'}}>
					<MenuItem sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
						<ListItemIcon><UserIcon fontSize="var(--icon-fontSize-md)" /></ListItemIcon>
						Profile
					</MenuItem>
				</Link>
				<Link onClick={() => logout()} style={{textDecoration: 'none'}}>
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
	)
}

export default UserPopOver;