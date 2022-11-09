import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialAppState = {
	admindetails: {},
	generalInfo: {},
	currentAddress: {},
	registeredAddress: {},
	directorInfo: {},
	progress: 0,
	environment: "sandbox",
	authenticated: false,
	teamtoken: null,
};

export const appSlice = createSlice({
	name: "auth",
	initialState: initialAppState,
	reducers: {
		setPersonalDeets: (state, action) => {
			const deets = action.payload;
			const {
				generalInfo,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			} = state;
			const {
				company_name,
				first_name,
				last_name,
				currency,
				country,
				intl_phone_number,
				work_email,
				is_account_verified,
				live_authorization_token,
				test_authorization_token,
			} = deets;
			const safeDeets = {
				first_name,
				company_name,
				last_name,
				currency,
				country,
				intl_phone_number,
				work_email,
				is_account_verified,
				live_authorization_token,
				test_authorization_token,
			};
			return {
				admindetails: safeDeets,
				generalInfo,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			};
		},

		setGeneralInfo: (state, action) => {
			const deets = action.payload;
			const {
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			} = state;
			return {
				generalInfo: deets,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			};
		},
		setCurrentAddress: (state, action) => {
			const deets = action.payload;
			const {
				admindetails,
				generalInfo,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress: deets,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			};
		},
		setRegisteredAddress: (state, action) => {
			const deets = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				directorInfo,
				progress,
				authenticated,
				environment,
				teamToken,
			} = state;

			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress: deets,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken,
			};
		},
		setDirectorInfo: (state, action) => {
			const deets = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				registeredAddress,
				progress,
				environment,
				authenticated,
				teamToken,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo: deets,
				progress,
				environment,
				authenticated,
				teamToken,
			};
		},
		setProgress: (state, action) => {
			const step = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				registeredAddress,
				directorInfo,
				environment,
				authenticated,
				teamToken,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress: step,
				environment,
				authenticated,
				teamToken,
			};
		},
		setEnvironment: (state, action) => {
			const env = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				registeredAddress,
				directorInfo,
				progress,
				authenticated,
				teamToken,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment: env,
				authenticated,
				teamToken,
			};
		},
		setAuth: (state, action) => {
			const auth = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				teamToken,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated: auth,
				teamToken,
			};
		},
		setToken: (state, action) => {
			const token = action.payload;
			const {
				admindetails,
				currentAddress,
				generalInfo,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
			} = state;
			return {
				generalInfo,
				admindetails,
				currentAddress,
				registeredAddress,
				directorInfo,
				progress,
				environment,
				authenticated,
				teamToken: token,
			};
		},
		logout: (_state, _action) => {
			return {
				...initialAppState,
			};
		},
	},
});

// Action creators are generated for each case reducer function
export default appSlice.reducer;
export const {
	setPersonalDeets,
	setDirectorInfo,
	setCurrentAddress,
	setRegisteredAddress,
	setGeneralInfo,
	setProgress,
	setEnvironment,
	setAuth,
	logout,
	setToken,
} = appSlice.actions;
