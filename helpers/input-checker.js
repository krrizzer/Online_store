


function isValidNewUser(user) {
    return (
        isValidEmail(user.username) &&
        isValidPassword(user.password) &&
        isValidName(user.name) &&
        user.role == "user"
    );
}


function isValidUser(user){
    return (
        isValidEmail(user.username) &&
        isValidPassword(user.password)
    );
}



function isValidEmail(email){
    return String(email)
            .toLowerCase()
            .match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            );
}


function isValidPassword(password){
    return password.length >= 8;
}


function isValidName(name){
    return name.length >= 3;
}

module.exports = {isValidNewUser, isValidUser};