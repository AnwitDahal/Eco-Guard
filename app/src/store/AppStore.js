import {create} from 'zustand'
import axios from 'axios'

const API_URL="http://localhost:5000/api/app";

axios.defaults.withCredentials=true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	aqiData:null,

	signup: async (email, password, name, phNumber, address) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/signup`, {email, password, name, phNumber, address });
			set({ user: response.data.user,isAuthenticated: true, isLoading: false  });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			localStorage.setItem('token', response.data.token);
			set({
				isAuthenticated: true,
				user: response.data.user,
				weather:response.data.weatherData,
				city:response.data.cityData,
				aqiData:response.data.aqiData,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},


	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	updateData:async ()=>{
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/update-data`);
			set({ user: response.data.user, isAuthenticated: true });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	fetchAqiData: async () => {
		set({ isLoading: true, error: null });
		try {
		  const endpoint = `${API_URL}/country-aqi`; // Fetch overall AQI data
		  const response = await axios.get(endpoint);
		  set({ aqiData: response.data, isLoading: false });
		} catch (error) {
		  set({
			error: error.response?.data?.message || "Error fetching AQI data",
			isLoading: false,
		  });
		  throw error; // Optionally, you can handle this error in the component
		}
	  },
	  fetchLeaderboardData: async () => {
		set({ isLoading: true, error: null });
		try {
		  const endpoint = `${API_URL}/leaderboard`;
		  const response = await axios.get(endpoint);
		  set({ leaderboardData: response.data.leaderboard, isLoading: false }); // Store leaderboard data
		} catch (error) {
		  set({
			error: error.response?.data?.message || "Error fetching leaderboard data",
			isLoading: false,
		  });
		  throw error;
		}
	},
	 
}))