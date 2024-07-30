import React from 'react';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
	const URL = `${process.env.REACT_APP_API_URL}/users`;
	const initialValue = {
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(15).required("You must insert username"),
		password: Yup.string().min(4).max(20).required(),
	});

	let navigate = useNavigate();

	const onSubmit = (data) => {
		const utcDateTime = new Date().toISOString();
		const utcDateConvertToLocal = new Date(utcDateTime);
		const user = { username: data.username, password: data.password, created_modified: utcDateConvertToLocal }

		try {
			const postData = async() => {
				const result = await fetch(URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user)
				});

				if (!result.ok) {
					throw new Error(`HTTP error! status: ${result.status}`);
				} else {
					navigate('/');
				}
			}

			postData();
		} catch (error) {
            console.error('Error posting data:', error);
        }
		// axios.post("http://localhost:3001/auth", data).then((response) => {
		// 	console.log(response.data);
		// 	console.log("Done!");
		// 	navigate('/');
		// });
	};

	return (
		<div className='createPostPage'>
			<Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
				<Form className='formContainer'>
					<label>Username: </label>
					<ErrorMessage name='username' component='span'></ErrorMessage>
					<Field id='inputCreatePost' name='username' placeholder='Username' autoComplete='off'></Field>

					<label>Password: </label>
					<ErrorMessage name='password' component='span'></ErrorMessage>
					<Field type='password' id='inputCreatePost' name='password' placeholder='Password'></Field>

					<button type='submit'>Register</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Registration