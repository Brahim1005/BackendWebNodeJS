
function validateUserData(userData){

    let errors = [];

    if (!userData.first_name || !userData.last_name || !userData.gender || !userData.city || !userData.street || !userData.house_number || !userData.phone_number) {
        errors.push('All fields must be filled out.');
    }

    if (/\d/.test(userData.first_name) ) {
        errors.push('First name cannot contain numbers.');
    }

    if(typeof userData.first_name != 'string'){
        errors.push('First name needs to be a string.');
    }

    if (/\d/.test(userData.last_name) ) {
        errors.push('Last name cannot contain numbers.');
    }

    if(typeof userData.last_name != 'string'){
        errors.push('Last name needs to be a string.');
    }

    if(typeof userData.gender != 'string'){
        errors.push("Gender needs to be a string")
    }

    if(typeof userData.city!= 'string'){
        errors.push("City needs to be a string")
    }

    if(typeof userData.street != 'string'){
        errors.push("Street needs to be a string")
    }

    if ( typeof userData.house_number === 'string' || isNaN(Number(userData.house_number))) {
        errors.push('House number must be a number.');
    }

    if (!/^\+\d{2} \d{3} \d{2} \d{2} \d{2}$/.test(userData.phone_number)) {
        errors.push('Phone number needs to be formatted like "+32 444 44 44 44".');
    }

   
    if (errors.length > 0) {
        return errors;
    }

    return null;
}

module.exports = validateUserData; 