import React, { useState } from 'react'
import { auth } from '../../config/Config'
import './Login.css'

export const Login = ({ onClose, showSignupForm }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			await auth.signInWithEmailAndPassword(email, password).then(() => {
				onClose()
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='modalBackdrop'>
			<div className='loginForm'>
				<div className='closeButtonContainer'>
					<button className='loginFormButton' onClick={onClose}>
						close
					</button>
				</div>
				<h1>login</h1>
				<form className='form' autoComplete='off' onSubmit={handleLogin}>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}></input>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}></input>
					<div className='loginButtonContainer'>
						<button className='loginFormButton' type='submit'>
							LOGIN
						</button>
					</div>
				</form>
				<p>
					Dont have an account yet? <button onClick={showSignupForm}>SignUp</button>
				</p>
			</div>
		</div>
	)
}
