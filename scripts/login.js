
/*
function registerSwitch(){
    document.getElementById("register-form").style.display='block';
    document.getElementById("login-form").style.display='none';
}

function loginSwitch(){
    document.getElementById("login-form").style.display='block';
    document.getElementById("register-form").style.display='none';
}


document.getElementById("register-link").setAttribute('onclick', 'registerSwitch()');
document.getElementById("login-link").setAttribute('onclick', 'loginSwitch()');

*/

function validate(){
    var myInput = document.getElementById("pw_reg");
    var valid = true;
    var lowerCaseLetters = /[a-z]/g; 
    var upperCaseLetters = /[A-Z]/g; 
    var numbers = /[1-9]/g; 
    var minLength = 8;

    if(!myInput.value.match(lowerCaseLetters)) {             
        alert("Password must have at least one lowercase letter");
        valid = false;
    }
       
    if(!myInput.value.match(upperCaseLetters)) { 
        alert("Password must have at least one uppercase letter");
        valid = false;
    }
     
    if(!myInput.value.match(numbers)) { 
        alert("Password must have at least one number");
        valid = false;
    }

    if(!(myInput.value.length >= minLength)) {
        alert("Password must be at least 8 characters long");
        valid = false;
    }
    var email = document.getElementById("email_input").value;
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!(pattern.test(String(email).toLowerCase()))){
        alert("Invalid email format")
    }
}
    
document.getElementById("reg-button").setAttribute('onclick', 'validate()');