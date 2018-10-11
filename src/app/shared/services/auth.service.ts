export class AuthService {
	private isAuthentificated = !!window.localStorage.user;

	logIn() {
		this.isAuthentificated = true;
	}

	logOut() {
		this.isAuthentificated = false;
		window.localStorage.clear();
		console.log('Logged Out')
	}

	isLoggedIn():boolean {
		return this.isAuthentificated;
	}
}