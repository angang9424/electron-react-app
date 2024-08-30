import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';

function MobileNav({onClose, open}) {
	const location = useLocation();
	const currentPathname = location.pathname;

	return (
		<Drawer
			PaperProps={{
				sx: {
					'--MobileNav-background': '#121621',
					'--MobileNav-color': '#ffffff',
					'--NavItem-color': '#b3b9c6',
					'--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
					'--NavItem-active-background': '#635bff',
					'--NavItem-active-color': '#ffffff',
					'--NavItem-disabled-color': '#667085',
					'--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
					'--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
					'--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
					bgcolor: 'var(--MobileNav-background)',
					color: 'var(--MobileNav-color)',
					display: { xs: 'flex', lg: 'none' },
					flexDirection: 'column',
					maxWidth: '100%',
					scrollbarWidth: 'none',
					width: 'var(--MobileNav-width)',
					zIndex: 'var(--MobileNav-zIndex)',
					'&::-webkit-scrollbar': { display: 'none' },
				},
			}}
			onClose={onClose}
			open={open}
		>
			<Stack spacing={2} sx={{ p: 3 }}>
				{/* <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
					<Logo color="light" height={32} width={122} />
				</Box> */}
				<Box
					sx={{
						alignItems: 'center',
						backgroundColor: 'var(--mui-palette-neutral-950)',
						border: '1px solid var(--mui-palette-neutral-700)',
						borderRadius: '12px',
						cursor: 'pointer',
						display: 'flex',
						p: '4px 12px',
					}}
				>
					{/* <Box sx={{ flex: '1 1 auto' }}>
						<Typography color="var(--mui-palette-neutral-400)" variant="body2">
							Workspace
						</Typography>
						<Typography color="inherit" variant="subtitle1">
							Devias
						</Typography>
					</Box> */}
					{/* <CaretUpDownIcon /> */}
				</Box>
			</Stack>
			<Divider sx={{ borderColor: '#434a60' }} />
			<Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
				{/* {renderNavItems({ pathname, items: navItems })} */}
				<Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
					<li>
						<Link to='/' className='dropdownBtn' style={{textDecoration: 'none'}}>
							<Box
								// {...(href
								// 	? {
								// 		component: external ? 'a' : RouterLink,
								// 		href,
								// 		target: external ? '_blank' : undefined,
								// 		rel: external ? 'noreferrer' : undefined,
								// 	}
								// 	: { role: 'button' })}
									sx={{
										alignItems: 'center',
										borderRadius: 1,
										color: 'var(--NavItem-color)',
										cursor: 'pointer',
										display: 'flex',
										flex: '0 0 auto',
										gap: 1,
										p: '6px 16px',
										position: 'relative',
										textDecoration: 'none',
										whiteSpace: 'nowrap',
										bgcolor: 'var(--NavItem-disabled-background)',
										color: 'var(--NavItem-disabled-color)',
										// cursor: 'not-allowed',
										// bgcolor: 'var(--NavItem-active-background)',
										// color: 'var(--NavItem-active-color)',
										...((currentPathname === '/') && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
									}}
							>
								<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
									{/* {Icon ? (
										<Icon
											fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
											fontSize="var(--icon-fontSize-md)"
											weight={active ? 'fill' : undefined}
										/>
									) : null} */}
								</Box>
								<Box sx={{ flex: '1 1 auto' }}>
									<Typography
										component="span"
										sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
									>
										Overview
									</Typography>
								</Box>
							</Box>
						</Link>
					</li>
					<li>
						<Link to='/books' className='dropdownBtn' style={{textDecoration: 'none'}} onClick={() => onClose=true}>
							<Box
								// {...(href
								// 	? {
								// 		component: external ? 'a' : RouterLink,
								// 		href,
								// 		target: external ? '_blank' : undefined,
								// 		rel: external ? 'noreferrer' : undefined,
								// 	}
								// 	: { role: 'button' })}
									sx={{
										alignItems: 'center',
										borderRadius: 1,
										color: 'var(--NavItem-color)',
										cursor: 'pointer',
										display: 'flex',
										flex: '0 0 auto',
										gap: 1,
										p: '6px 16px',
										position: 'relative',
										textDecoration: 'none',
										whiteSpace: 'nowrap',
										bgcolor: 'var(--NavItem-disabled-background)',
										color: 'var(--NavItem-disabled-color)',
										// cursor: 'not-allowed',
										// bgcolor: 'var(--NavItem-active-background)',
										// color: 'var(--NavItem-active-color)',
										...((currentPathname === '/books') && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
									}}
							>
								<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
									{/* {Icon ? (
										<Icon
											fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
											fontSize="var(--icon-fontSize-md)"
											weight={active ? 'fill' : undefined}
										/>
									) : null} */}
								</Box>
								<Box sx={{ flex: '1 1 auto' }}>
									<Typography
										component="span"
										sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
									>
										Books
									</Typography>
								</Box>
							</Box>
						</Link>
					</li>
					<li>
						<Link to='/purchase_order' className='dropdownBtn' style={{textDecoration: 'none'}}>
							<Box
								// {...(href
								// 	? {
								// 		component: external ? 'a' : RouterLink,
								// 		href,
								// 		target: external ? '_blank' : undefined,
								// 		rel: external ? 'noreferrer' : undefined,
								// 	}
								// 	: { role: 'button' })}
									sx={{
										alignItems: 'center',
										borderRadius: 1,
										color: 'var(--NavItem-color)',
										cursor: 'pointer',
										display: 'flex',
										flex: '0 0 auto',
										gap: 1,
										p: '6px 16px',
										position: 'relative',
										textDecoration: 'none',
										whiteSpace: 'nowrap',
										bgcolor: 'var(--NavItem-disabled-background)',
										color: 'var(--NavItem-disabled-color)',
										// cursor: 'not-allowed',
										// bgcolor: 'var(--NavItem-active-background)',
										// color: 'var(--NavItem-active-color)'
										...((currentPathname === '/purchase_order') && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
									}}
							>
								<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
									{/* {Icon ? (
										<Icon
											fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
											fontSize="var(--icon-fontSize-md)"
											weight={active ? 'fill' : undefined}
										/>
									) : null} */}
								</Box>
								<Box sx={{ flex: '1 1 auto' }}>
									<Typography
										component="span"
										sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
									>
										Purchase Order
									</Typography>
								</Box>
							</Box>
						</Link>
					</li>
					<li>
						<Link to='/sales_order' className='dropdownBtn' style={{textDecoration: 'none'}}>
							<Box
								// {...(href
								// 	? {
								// 		component: external ? 'a' : RouterLink,
								// 		href,
								// 		target: external ? '_blank' : undefined,
								// 		rel: external ? 'noreferrer' : undefined,
								// 	}
								// 	: { role: 'button' })}
									sx={{
										alignItems: 'center',
										borderRadius: 1,
										color: 'var(--NavItem-color)',
										cursor: 'pointer',
										display: 'flex',
										flex: '0 0 auto',
										gap: 1,
										p: '6px 16px',
										position: 'relative',
										textDecoration: 'none',
										whiteSpace: 'nowrap',
										bgcolor: 'var(--NavItem-disabled-background)',
										color: 'var(--NavItem-disabled-color)',
										// cursor: 'not-allowed',
										// bgcolor: 'var(--NavItem-active-background)',
										// color: 'var(--NavItem-active-color)'
										...((currentPathname === '/sales_order') && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
									}}
							>
								<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
									{/* {Icon ? (
										<Icon
											fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
											fontSize="var(--icon-fontSize-md)"
											weight={active ? 'fill' : undefined}
										/>
									) : null} */}
								</Box>
								<Box sx={{ flex: '1 1 auto' }}>
									<Typography
										component="span"
										sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
									>
										Sales Order
									</Typography>
								</Box>
							</Box>
						</Link>
					</li>
					<li>
						<Link to='/pos' className='dropdownBtn' style={{textDecoration: 'none'}}>
							<Box
								// {...(href
								// 	? {
								// 		component: external ? 'a' : RouterLink,
								// 		href,
								// 		target: external ? '_blank' : undefined,
								// 		rel: external ? 'noreferrer' : undefined,
								// 	}
								// 	: { role: 'button' })}
									sx={{
										alignItems: 'center',
										borderRadius: 1,
										color: 'var(--NavItem-color)',
										cursor: 'pointer',
										display: 'flex',
										flex: '0 0 auto',
										gap: 1,
										p: '6px 16px',
										position: 'relative',
										textDecoration: 'none',
										whiteSpace: 'nowrap',
										bgcolor: 'var(--NavItem-disabled-background)',
										color: 'var(--NavItem-disabled-color)',
										// cursor: 'not-allowed',
										// bgcolor: 'var(--NavItem-active-background)',
										// color: 'var(--NavItem-active-color)'
										...((currentPathname === '/pos') && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
									}}
							>
								<Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
									{/* {Icon ? (
										<Icon
											fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
											fontSize="var(--icon-fontSize-md)"
											weight={active ? 'fill' : undefined}
										/>
									) : null} */}
								</Box>
								<Box sx={{ flex: '1 1 auto' }}>
									<Typography
										component="span"
										sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
									>
										POS
									</Typography>
								</Box>
							</Box>
						</Link>
					</li>
				</Stack>
			</Box>
			<Divider sx={{ borderColor: '#434a60' }} />
			<Stack spacing={2} sx={{ p: '12px' }}>
				<div>
					<Typography color="var(--mui-palette-neutral-100)" variant="subtitle2">
						Need more features?
					</Typography>
					<Typography color="var(--mui-palette-neutral-400)" variant="body2">
						Check out our Pro solution template.
					</Typography>
				</div>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box
						component="img"
						alt="Pro version"
						src="/assets/devias-kit-pro.png"
						sx={{ height: 'auto', width: '160px' }}
					/>
				</Box>
				<Button
					component="a"
					endIcon={<ArrowSquareUpRightIcon fontSize="var(--icon-fontSize-md)" />}
					fullWidth
					href="https://material-kit-pro-react.devias.io/"
					sx={{ mt: 2 }}
					target="_blank"
					variant="contained"
				>
					Pro version
				</Button>
			</Stack>
		</Drawer>
	)
}

export default MobileNav;