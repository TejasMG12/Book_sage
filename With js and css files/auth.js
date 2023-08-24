import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
    getRedirectResult,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";





// initialising and importing all the firebase dependencies
const firebaseConfig = {
    //    Enter your own api keys
};

// initialising the "app" object to firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const sign_in_form = document.querySelector(".sign-in-form")
const sign_up_form = document.querySelector(".sign-up-form")
const container_div1 = document.getElementById("pop-up-div1")
const container_div2 = document.getElementById("pop-up-div2")

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in = document.querySelector("#sign-in");
const sign_up = document.querySelector("#sign-up");
const sign_in_email = document.querySelector("#sign-in-email");
const sign_in_psw = document.querySelector("#sign-in-password");
const accounttext1 = document.querySelector("#text1");
const accounttext2 = document.querySelector("#text2");
const sign_up_email = document.querySelector("#sign-up-email");
const sign_up_psw = document.querySelector("#sign-up-pass");

const signinGoogle1 = document.getElementById("google1");
const signinTwiter1 = document.getElementById("twt1");
const signinGoogle2 = document.getElementById("google2");
const signinTwiter2 = document.getElementById("twt2");
const signinlinkedin1 = document.getElementById("linkedin1");
const signinLinkedin2 = document.getElementById("linkedin2");

const username = document.getElementById("sign-up-username");




Toastify({
    // Options
    duration: 3000, // Duration in milliseconds
    gravity: "top", // Toast position (top, bottom, or center)
    close: true, // Show close button
    backgroundColor: "red", // Background color
    stopOnFocus: true, // Stops auto close on focus
});

var email, password, signupEmail, provider, usernm, token, credential, user, password, confirmSignupEmail, confirmpassword;

var openpage = 1;
let email_pattern = /^[a-z0-9A-Z]+@(gmail|outlook|rediffmail|yahoo)+\.com$/i;
let pass_pattern = /[^d+|a-z|A-Z|!@#$%^&*()_?<>]/

const delay = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};


sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    sign_up_form.reset();
    openpage = 2;
    accounttext2.style.display = 'none';

});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    sign_in_form.reset();
    openpage = 1;
    accounttext1.style.display = 'none';
    sign_in.innerHTML = 'sign-in';
    password_box.style.display = 'flex';

    document.getElementById("sign-in-title").innerText = 'Sign in';
    forgot_page.innerText = 'Forgot password?';
    openpage = 1;
});
sign_in.addEventListener("click", () => {
    email = sign_in_email.value;

    if (!email_pattern.test(email)) {
        notify('error', 'Error!', 'Please Enter a valid email!!');

        return;
    }
    if (openpage == 3) {
        sendPasswordResetEmail(auth, email)
            .then(function () {
                // this sends a password reset email to the user 

                notify('success', 'Email sent!', ' ');

                // frgEmail.innerText = 'Resend email';
                sign_in.innerHTML = 'Resend email';
            })
            .catch(function (error) {

                accounttext1.style.display = "block";
                notify('error', 'Unable to send !', ' An account with this email does not exist!');
            });
        return;
    }

    console.log("HEre");
    password = sign_in_psw.value;
    console.log(password);
    console.log(email);

    // Pop up if email is not of right format =>




    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // after successful sign in 
            const user = userCredential.user;
            accounttext1.style.display = "none";
            console.log("Success! Welcome back!");
            accounttext1.style.display = "none";
            notify('success', 'Success!', 'Welcome Back!!');
            delay(3000).then(() => {
                window.open('main/index.html', "_self");
            });
        })
        .catch((error) => {

            notify('error', 'Error!', 'Wrong Email or Password!');
            if (error["code"] === "auth/user-not-found") {
                accounttext1.style.display = "block";
            }


            return;
        });
});
sign_up.addEventListener("click", function () {
    email = sign_up_email.value;
    password = sign_up_psw.value;
    usernm = username.value;
    if (usernm == '') {
        notify('error', 'Error!', 'User name is required!!');

        return;

    }
    if (!email_pattern.test(email)) {

        notify('error', 'Error!', 'Please Enter a valid email!!');

        return;

    }



    // // for signing up 
    //   if (password != confirmpassword) {
    //     pswPop2.innerHTML = "Passwords don't match. <a href=\"javascript:close('invPsw2')\" class=\"close\">x</a>";
    //     pswPop2.style.display = 'block';
    //     return;
    //   } else 
    if (!pass_pattern.test(password)) {
        notify('error', 'Weak Password!', 'Password must contain at least one special, one upper, one lower and special char');

        return;
    } else if (password == '') {
        notify('error', 'Error!', 'Password field must be non-empty!');
        return;
    } else if (password.length < 8) {

        notify('error', 'Weak Password!', 'Password must be at least 8 characters!');

        return;
    }

    // create new user in user base after successful creation of account 

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            notify('success', 'Success!', 'Account created successfully!');
            delay(3000).then(() => {
                window.open('main/index.html', "_self");
            });


        })
        .catch((error) => {
            console.log(error);
            accounttext2.style.display = 'block';
            notify('error', 'Unable to create account!', 'Account With this email already exists!');

        });

});

function signinfromGoogle() {
    provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contactsch');
    // provider is a google sign in object
    signInWithPopup(auth, provider)
        .then((result) => {

            // credential gives you the credential object from the googleauthprovider class
            credential = GoogleAuthProvider.credentialFromResult(result);
            token = credential.accessToken;
            // console.log(credential);
            user = result.user;
            delay(1000).then(() => {
                window.open('main/index.html', "_self");
            });

        }).catch((error) => {
            console.log(error);
        });
}
function signinfromTwitter() {
    provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            credential = TwitterAuthProvider.credentialFromResult(result);
            token = credential.accessToken;
            // console.log(credential);
            user = result.user;
        }).catch((error) => {
            console.log(error);
        });
}

signinGoogle1.addEventListener("click", () => {
    signinfromGoogle();
});
signinGoogle2.addEventListener("click", () => {
    signinfromGoogle();
});
signinTwiter1.addEventListener("click", () => {
    signinfromTwitter();
});
signinTwiter2.addEventListener("click", () => {
    signinfromTwitter();
});

signinLinkedin2.addEventListener('click', function () {
    delay(1000).then(() => {
        window.open('main/index.html', "_self");
    });
});
signinlinkedin1.addEventListener('click', function () {
    delay(1000).then(() => {
        window.open('main/index.html', "_self");
    });
});
document.getElementById("fb2").addEventListener('click', function () {
    delay(1000).then(() => {
        window.open('main/index.html', "_self");
    });
});
document.getElementById("fb1").addEventListener('click', function () {
    delay(1000).then(() => {
        window.open('main/index.html', "_self");
    });
});

document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 && openpage === 1) { // openpage = 1 when you're on the login page 
        sign_in.click();
    }
    if (event.keyCode === 13 && openpage === 2) { // openpage = 2 when you're on the signup page 
        sign_up.click();
    }

});



//Notify and pop ups for errors

function notify(type, title, message) {

    //CREATE TOAST CONTAINER IF IT DOESN'T EXIST
    if (container_div2.length == 0 && openpage == 2) {
        $('<div>', {
            'class': 'toast-container',
            'aria-live': 'polite',
            'aria-atomic': 'true',
        })
            .appendTo(container_div2);
    }

    if (container_div1.length == 0 && openpage == 1) {
        $('<div>', {
            'class': 'toast-container',
            'aria-live': 'polite',
            'aria-atomic': 'true',
        })
            .appendTo(container_div1);
    }


    //VARIABLES 
    var toast_container = (openpage == 1 || openpage == 3 ? container_div1 : openpage == 2 ? container_div2 : null),
        toast_type = type,
        toast_icon = null,
        toast_title = title,
        toast_message = message,
        toast_btn_close_svg = '<svg class="svg-inline--fa fa-times fa-w-11 fa-fw fa-xs" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg="" style="margin:0px;border:none;"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';

    //VARIABLE - ICON
    switch (toast_type) {

        //GENERAL:
        case 'info': toast_icon = '<svg viewBox="0 0 448 512"><path fill="#f8f9fa" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>'; break;
        case 'warning': toast_icon = '<svg viewBox="0 0 576 512"><path fill="#343a40" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>'; break;
        case 'success': toast_icon = '<svg viewBox="0 0 512 512"><path fill="#f8f9fa" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>'; break;
        case 'error': toast_icon = '<svg viewBox="0 0 512 512"><path fill="#f8f9fa" d="M497.9 150.5c9 9 14.1 21.2 14.1 33.9v143.1c0 12.7-5.1 24.9-14.1 33.9L361.5 497.9c-9 9-21.2 14.1-33.9 14.1H184.5c-12.7 0-24.9-5.1-33.9-14.1L14.1 361.5c-9-9-14.1-21.2-14.1-33.9V184.5c0-12.7 5.1-24.9 14.1-33.9L150.5 14.1c9-9 21.2-14.1 33.9-14.1h143.1c12.7 0 24.9 5.1 33.9 14.1l136.5 136.4zM377.6 338c4.7-4.7 4.7-12.3 0-17l-65-65 65.1-65.1c4.7-4.7 4.7-12.3 0-17L338 134.4c-4.7-4.7-12.3-4.7-17 0l-65 65-65.1-65.1c-4.7-4.7-12.3-4.7-17 0L134.4 174c-4.7 4.7-4.7 12.3 0 17l65.1 65.1-65.1 65.1c-4.7 4.7-4.7 12.3 0 17l39.6 39.6c4.7 4.7 12.3 4.7 17 0l65.1-65.1 65.1 65.1c4.7 4.7 12.3 4.7 17 0l39.4-39.8z"/></svg>'; break;
        case 'other': toast_icon = '<svg class="fa-spin" viewBox="0 0 512 512"><path fill="#f8f9fa" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/></svg>'; break;

        default: toast_icon = '<i style="width:35px;height:35px" class="fas fa-' + toast_type + '"></i>';
    }

    //CREATE NOTIFICATION
    $('<div>', {
        'class': 'toast',
        'data-autohide': 'true',
        'data-delay': '5000',
        'data-type': toast_type,
        'role': 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
    })
        .html('<div class="toast-content"><div class="toast-icon">' + toast_icon + '</div><div class="toast-body"><strong>' + toast_title + '</strong><div>' + toast_message + '</div></div></div><button class="close" type="button" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">' + toast_btn_close_svg + '</span></button>')
        .appendTo(toast_container)
        .toast('show');


    //REMOVE HIDDEN TOAST
    $('.toast').on('hidden.bs.toast', function () {
        $(this).toast('dispose').remove();
    });

}
document.getElementById("togglePassword").addEventListener('click', function (e) {
    // toggle the type attribute
    const type = sign_in_psw.getAttribute('type') === 'password' ? 'text' : 'password';
    sign_in_psw.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
document.getElementById("togglePassword2").addEventListener('click', function (e) {
    // toggle the type attribute
    const type = sign_up_psw.getAttribute('type') === 'password' ? 'text' : 'password';
    sign_up_psw.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});



//forgot password
const forgot_page = document.getElementById("forgot-page");

const password_box = document.getElementById("password-box");
forgot_page.addEventListener("click", function () {
    if (openpage == 1) {

        sign_in.innerHTML = 'Send Email';
        password_box.style.display = 'none';
        document.getElementById("sign-in-title").innerText = 'Reset Password';
        forgot_page.innerText = 'return to sign-in';
        openpage = 3;

    }
    else {
        sign_in.innerHTML = 'sign-in';
        password_box.style.display = 'flex';

        document.getElementById("sign-in-title").innerText = 'Sign in';
        forgot_page.innerText = 'Forgot password?';
        openpage = 1;
    }
});
//
