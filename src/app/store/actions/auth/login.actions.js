// import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
// import * as Actions from 'app/store/actions';
import * as ProfileActions from 'app/store/actions/profile';
import axios from 'axios';

export const SET_LOGIN_LOADING = '[AUTH] SET LOGIN LOADING';
export const LOGIN_ERROR = '[AUTH] LOGIN ERROR';
export const LOGIN_SUCCESS = '[AUTH] LOGIN SUCCESS';
export const RESET_LOGIN_ALERT = '[AUTH] RESET LOGIN ALERT';

const ERROR_TABLE = {
	USER_DOES_NOT_EXIST: {
		global: '使用者不存在'
	},
	WRONG_PASSWORD: { global: '帳號或密碼錯誤' },
	BLOCKED_USER: { global: '您嘗試登入次數過多，帳號已被凍結' },
	UNKNOWN_ERROR: { global: '出現未知錯誤' }
};

export function submitLogin({ email, password }) {
	return dispatch => {
		dispatch({ type: SET_LOGIN_LOADING });

		const user = {
			_id: '5ec10cae74ca97032cd4a055',
			memberId: 'PSheon',
			displayName: 'Paul Jiang',
			email: 'pauljiang61020@gmail.com',
			photoURL:
				'data:image/png;base64,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',
			role: 'admin',
			google: null,
			verified: false,
			verification: 'bcd118a0-302b-45b6-8e32-e760d76dca1a'
		};

		const access_token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlYzEwY2FlNzRjYTk3MDMyY2Q0YTA1NSJ9LCJleHAiOjE1OTg0MTA5NTQsImlhdCI6MTU5ODE1MTc1NH0.sLk9X24JKSUpkq-aJF-G_o7-J88WKBQpbXlzMEDDGoc';

		// localStorage.setItem('jwt_access_token', access_token);
		// axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

		// dispatch(ProfileActions.setUserData(user));

		// dispatch({
		// 	type: LOGIN_SUCCESS
		// });

		// FIXME return demo
		jwtService
			.signInWithEmailAndPassword(email, password)
			.then(userData => {
				/* @ANCHOR */
				dispatch(ProfileActions.setUserData(userData));
				// setTimeout(() => {
				// 	dispatch(ProfileActions.setUserData(userData));
				// }, 1500);
				dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch(error => {
				// FIXME
				console.log('error, ', error.errors);
				return dispatch({
					type: LOGIN_ERROR,
					payload: { errors: ERROR_TABLE[error.errors[0]?.msg] }
				});
			});
	};
}

export function resetLoginAlert() {
	return dispatch => {
		dispatch({ type: RESET_LOGIN_ALERT });
	};
}

// export function submitLoginWithFireBase({ username, password }) {
// 	if (!firebaseService.auth) {
// 		console.warn("Firebase Service didn't initialize, check your configuration");

// 		return () => false;
// 	}

// 	return dispatch =>
// 		firebaseService.auth
// 			.signInWithEmailAndPassword(username, password)
// 			.then(() => {
// 				return dispatch({
// 					type: LOGIN_SUCCESS
// 				});
// 			})
// 			.catch(error => {
// 				console.info('error');
// 				const usernameErrorCodes = [
// 					'auth/email-already-in-use',
// 					'auth/invalid-email',
// 					'auth/operation-not-allowed',
// 					'auth/user-not-found',
// 					'auth/user-disabled'
// 				];
// 				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

// 				const response = {
// 					username: usernameErrorCodes.includes(error.code) ? error.message : null,
// 					password: passwordErrorCodes.includes(error.code) ? error.message : null
// 				};

// 				if (error.code === 'auth/invalid-api-key') {
// 					dispatch(Actions.showMessage({ message: error.message }));
// 				}

// 				return dispatch({
// 					type: LOGIN_ERROR,
// 					payload: response
// 				});
// 			});
// }
