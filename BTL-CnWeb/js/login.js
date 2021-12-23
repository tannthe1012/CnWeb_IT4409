
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpName = document.getElementById('signup-name')
const signUpEmail = document.getElementById('signup-email')
const signUpPassword = document.getElementById('signup-password')
const signup = document.getElementById('submit-signup')
const signin = document.getElementById('submit-signin')
const signInEmail = document.getElementById('signin-email')
const signInPassword = document.getElementById('signin-password')
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
function validateSignUp() {
	if (signUpName.value == null || signUpName.value == "") {
		return false;
	}
	if (signUpEmail.value == null || signUpEmail.value == "") {
		return false;
	}
	if (signUpPassword.value == null || signUpPassword.value == "") {
		return false;
	}
	return true;
}
function validateSignIn() {
	if (signInEmail.value == null || signInEmail.value == "") {
		return false;
	}
	if (signInPassword.value == null || signInPassword.value == "") {
		return false;
	}
	return true
}

/**
 * Sign up
 */

signup.addEventListener('click', () => {
	let validate = validateSignUp();
	if (validate == false) {
		Toast.toast("Hãy nhập đủ các trường yêu cầu", "error");

	} else {
		console.log("day la user name : " + signUpName.value)
		console.log("day la email : " + signUpEmail.value)
		console.log("day la password : " + signUpPassword.value)
		var user = {
			Username: signUpEmail.value,
			Password: signUpPassword.value,
			Name: signUpName.value,
		};
		try {
			axios({
				method: 'POST',
				url: 'https://localhost:44382/api/User',
				data: user
			}).then(function (response) {
				//handle success
				console.log(response);
				if (response.data.isValid == true && response.status == 200) {
					/// đưa ra toast thành công sign up
					Toast.toast("Bạn đã đăng kí thành công", "success");
				} else {
					alert(response.data.message);
				}
			}).catch(function (response) {
				//handle error
				Toast.toast("Đã có lỗi vui lòng đăng kí lại", "error");

				console.log(response);
			});
		} catch (error) {
			console.log(error.message);
		}
		
	}
})

/**
 * Login
 */

signin.addEventListener('click', (event) => {
	event.preventDefault();
	let validate = validateSignIn();
	if (validate == false) {
		Toast.toast("Hãy nhập đủ 2 trường", "error");
	} else {
		console.log("hashasahahah");
		var user = {
			Username: signInEmail.value,
			Password: signInPassword.value,
		};
		axios({
			method: 'POST',
			url: 'https://localhost:44382/api/User/login',
			data: user
		}).then(function (response) {
			//handle success
			console.log(response)
			if (response.data.isValid == true && response.status == 200) {
				window.sessionStorage.setItem('userId',response.data.message);
				window.sessionStorage.setItem('profileId',response.data.message);
				window.sessionStorage.setItem('username', signInEmail.value);
				window.sessionStorage.setItem('tags',JSON.stringify(response.data.tags))
				window.location = `http://127.0.0.1:5500/html/home.html`
			} else {
				alert(response.data.message);
			}
		}).catch(function (response) {
			//handle error
			Toast.toast("Đã có lỗi xảy ra vui long đăng nhập lại", "error");
			console.log(response);
		});
			
	}
	console.log("hjaha");
})