import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../helpers/AuthContext';

import Traffic from '../components/overview/Traffic'

import Grid from '@mui/material/Unstable_Grid2';

function Home() {
	const [chartSeries, setChartSeries] = useState([]);
	const [trafficLabel, setTrafficLabel] = useState([]);

	const { authState, setAuthState } = useContext(AuthContext);

	const URL = `${process.env.REACT_APP_API_URL}/books`;

	const navigate = useNavigate();

	useEffect(() => {
		if (!authState.status) {
			localStorage.removeItem("accessToken");
			navigate('/login');
		} else {
			try {
				const getBooks = async() => {
					await axios.get(URL).then((response) => {
						if (response.data.error) {
							alert(response.data.error);
						} else {
							const books = response.data.data;
							let book_count = {};
							let total_count = 0;

							books.forEach(book => {
								const category = book.category;

								if (book_count[category]) {
									book_count[category]++;
								} else {
									book_count[category] = 1;
								}
								total_count++;
							});

							Object.entries(book_count).forEach(([key, value]) => {
								setChartSeries((prevChartSeries) => [...prevChartSeries, (value/total_count)*100]);
								setTrafficLabel((prevTrafficLabel) => [...prevTrafficLabel, key]);
							});
						}
					});
				}
	
				getBooks();
			} catch (error) {
				console.error('Error get data:', error);
			}

			return () => {
				setChartSeries([]);
				setTrafficLabel([]);
			}
		}
	}, []);

	return (
		<Grid container spacing={3}>
			<Grid lg={4} md={6} xs={12}>
				<Traffic chartSeries={chartSeries} labels={trafficLabel} sx={{ height: '100%' }} />
			</Grid>
		</Grid>
	)
}

export default Home;