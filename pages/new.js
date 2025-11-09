function showAlert(title, text, type) {
    Swal.fire({
        
        icon: type, 
        title: title,
        text: text,
    });
}


function isGenderSelected() {
    var radios = document.getElementsByName('gender');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value; // 
        }
    }
    return false;
}

function saveToLocalStorage(userData) {
    var userJson = JSON.stringify(userData);
   

    localStorage.setItem('facebookUserData', userJson);
    console.log("Data saved to Local Storage:", userData); 
}


// Main validation function
function validateForm(event) {
    event.preventDefault();


    var mandatoryFields = [
        { id: 'firstName', name: 'First Name' },
        { id: 'surname', name: 'Surname' },
        { id: 'date', name: 'Date' }, 
        { id: 'month', name: 'Month' }, 
        { id: 'year', name: 'Year' }, 
        { id: 'emailOrMobile', name: 'Mobile/Email' }, 
        { id: 'newPassword', name: 'Password' } 
    ];

    var fieldElement;

    // A. Empty Field Check
    for (var i = 0; i < mandatoryFields.length; i++) {
        fieldElement = document.getElementById(mandatoryFields[i].id);
        
        if (fieldElement && fieldElement.value.trim() === "") {
            showAlert("Required Field", mandatoryFields[i].name + " bharna laazmi hai.", "error");
            return false;
        }
    }


    var selectedGender = isGenderSelected();
    if (!selectedGender) {
        showAlert("Required Field", "Gender select karna zaroori hai.", "error");
        return false;
    }

    // C. Specific Value Checks
    var emailOrMobileElement = document.getElementById('emailOrMobile');
    var newPasswordElement = document.getElementById('newPassword');

    var emailOrMobileValue = emailOrMobileElement.value.trim();
    var newPasswordValue = newPasswordElement.value;

   
    if (emailOrMobileValue.indexOf('@') !== -1) {



        if (emailOrMobileValue.indexOf('@') < 1 || emailOrMobileValue.lastIndexOf('.') < emailOrMobileValue.indexOf('@')) {
            showAlert("Invalid Email", "Email address ka format theek nahi hai. '@' aur '.' check karein.", "error");
            return false;
        }
    }


    if (newPasswordValue.length < 8) {
        showAlert("Weak Password", "Password km se km 8 characters ka hona chahiye.", "warning");
        return false;
    }

    
    var userData = {
        firstName: document.getElementById('firstName').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        dob: document.getElementById('date').value + "-" + document.getElementById('month').value + "-" + document.getElementById('year').value, 
        gender: selectedGender,
        emailOrMobile: emailOrMobileValue,
        password: newPasswordValue
    };

    saveToLocalStorage(userData);

    showAlert("Success!", "finally! Saad You did it.", "success");

    return true;
}