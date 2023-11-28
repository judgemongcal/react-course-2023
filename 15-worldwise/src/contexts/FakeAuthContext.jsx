import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

function reducer(state, action) {
	switch (action) {
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	function login(email, password) {}

	function logout() {}
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("AuthContext was used outside the AuthProvider");
}
