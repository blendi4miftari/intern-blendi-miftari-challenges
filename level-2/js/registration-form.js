const nextBtn = document.querySelector("#next-btn");
const previousBtn = document.querySelector("#previous-btn");
const inputName = document.querySelector("#full-name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const inputConfirmPassword = document.querySelector("#confirm-password");
const inputNewsletter = document.querySelector("#newsletter");
const inputRole = document.querySelector("#role");
const inputBio = document.querySelector("#bio");
const personalDiv = document.querySelector("#personal");
const accountDiv = document.querySelector("#account");
const preferencesDiv = document.querySelector("#preferences");
const form = document.querySelector("form");
const progressBar = document.querySelector("#progress-fill");
const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const summaryDiv = document.querySelector('#summary');
const summaryFullname = document.querySelector('#summary-fullname')
const summaryEmail = document.querySelector('#summary-email')
const summaryPhone = document.querySelector('#summary-phone')
const summaryUsername = document.querySelector('#summary-username')
const summaryNewsletter = document.querySelector('#summary-newsletter')
const summaryRole = document.querySelector('#summary-role')
const summaryBio = document.querySelector('#summary-bio')
const actionsDiv = document.querySelector('#action-buttons')
const headerDiv = document.querySelector('#header')
const successDiv = document.querySelector('#success');
const submitBtn = document.querySelector('#submit-btn')
const registrationTitle = document.querySelector('#registration-title')

const storage = {
    personal: {
        fullname: "",
        email: "",
        phone: "",
    },
    account: {
        username: "",
        password: "",
        confirmPassword: "",
    },
    preferences: {
        newsletter: "",
        role: "",
        bio: "",
    },
};

let current = 1;
const total = 3;

function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (inputEmail.value == " " || !emailRegex.test(inputEmail.value)) {
        return false;
    } else {
        return true;
    }
}

function isRequired(inputValue) {
    if (inputValue === "") {
        return false;
    } else {
        return true;
    }
}

function validatePhone() {
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    if (inputPhone.value == " " || !phoneRegex.test(inputPhone.value)) {
        return false;
    } else {
        return true;
    }
}

function validatePassword() {
    return inputPassword.value.length >= 6;
}

function validateConfirmPassword() {
    if (inputConfirmPassword.value === inputPassword.value) {
        return true;
    } else {
        return false;
    }
}

function validateBio() {
    if (inputBio.value.length >= 200) {
        return false;
    } else {
        return true;
    }
}

function validateInputs() {
    if (current === 1) {
        if (validateEmail() && validatePhone()) {
            return true;
        } else {
            showError(inputName, "Please write an valid email or phone");
            return false;
        }
    } else if (current === 2) {
        if (
            isRequired(inputUsername.value) &&
            validatePassword() &&
            validateConfirmPassword()
        ) {
            return true;
        } else {
            showError(
                inputUsername,
                "Please fill all the fields and confirm the password",
            );
            return false;
        }
    } else if (current === 3) {
        if (isRequired(inputRole.value) && validateBio()) {
            return true;
        } else {
            showError(
                inputBio,
                "Please fill all the fields and do not exceed more than 500 chars on bio",
            );
            return false;
        }
    }
}

function showError(input, msg) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add(
        "rounded-lg",
        "mb-5",
        "border",
        "bg-red-100",
        "border-red-200",
        "error-msg",
    );
    const errorParagraph = document.createElement("p");
    if (
        input.nextElementSibling === null ||
        !input.nextElementSibling.classList.contains("error-msg")
    ) {
        errorParagraph.classList.add("p-2", "text-sm", "text-red-900");
        errorParagraph.textContent = msg;
        input.insertAdjacentElement("afterend", errorDiv);
        errorDiv.appendChild(errorParagraph);
    }
}

function clearError(input) {
    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }
}

function displayPersonalForm() {
    nextBtn.disabled = true;
    if (current === 1) {
        personalDiv.classList.remove("hidden");
        accountDiv.classList.add("hidden");
        canGoNext();
    }
}

function displayAccountForm() {
    nextBtn.disabled = true;
    if (current === 2) {
        personalDiv.classList.add("hidden");
        accountDiv.classList.remove("hidden");
        preferencesDiv.classList.add("hidden");
        canGoNext();
    }
}

function displayPreferencesForm() {
    nextBtn.disabled = true;
    if (current === 3) {
        accountDiv.classList.add("hidden");
        preferencesDiv.classList.remove("hidden");
        canGoNext()
    }
}

function displaySummary() {
    preferencesDiv.classList.add("hidden");
    summaryDiv.classList.remove('hidden');
    actionsDiv.classList.add('hidden');
    headerDiv.classList.add('hidden')
    summaryFullname.textContent = storage.personal.fullname;
    summaryEmail.textContent = storage.personal.email;
    summaryPhone.textContent = storage.personal.phone;
    summaryUsername.textContent = storage.account.username;
    summaryNewsletter.textContent = storage.preferences.newsletter ? 'Checked' : 'Not Checked';
    summaryRole.textContent = storage.preferences.role;
    summaryBio.textContent = storage.preferences.bio;
}

function displaySuccess(e) {
    e.preventDefault()
    registrationTitle.classList.add('hidden')
    summaryDiv.classList.add('hidden')
    successDiv.classList.remove('hidden')
}

function isStepValid() {
    if (current === 1) {
        if (validateEmail() && validatePhone()) {
            return true;
        } else {
            return false;
        }
    } else if (current === 2) {
        if (
            isRequired(inputUsername.value) &&
            validatePassword() &&
            validateConfirmPassword()
        ) {
            return true;
        } else {
            return false;
        }
    } else if (current === 3) {
        if (isRequired(inputRole.value) && validateBio()) {
            return true;
        } else {
            return false;
        }
    }
}

function canGoNext(e) {
    if (isStepValid()) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

function next(e) {
    e.preventDefault();
    if (validateInputs()) {
        if (current === 1) {
            storage.personal.fullname = inputName.value;
            storage.personal.email = inputEmail.value;
            storage.personal.phone = inputPhone.value;
        } else if (current === 2) {
            storage.account.username = inputUsername.value;
            storage.account.password = inputPassword.value;
            storage.account.confirmPassword = inputConfirmPassword.value;
        } else if (current === 3) {
            storage.preferences.newsletter = inputNewsletter.checked;
            storage.preferences.role = inputRole.value;
            storage.preferences.bio = inputBio.value;
        }
        ++current;
        previousBtn.classList.remove("invisible");
        updateProgressBar();
        if (current === 2) {
            displayAccountForm();
        } else if (current === 3) {
            displayPreferencesForm();
        }  else if (current === 4){
            displaySummary();
        }
    }
}

function previous(e) {
    e.preventDefault();
    --current;
    if (current === 1) {
        previousBtn.classList.add("invisible");
        updateProgressBar();
        displayPersonalForm();
    } else if (current === 2) {
        previousBtn.classList.remove("invisible");
        updateProgressBar();
        displayAccountForm();
    }
}

function updateProgressBar() {
    if (current === 1) {
        progressBar.classList.remove("w-2/3");
        progressBar.classList.remove("w-full");
        progressBar.classList.add("w-1/3");
    } else if (current === 2) {
        step2.classList.remove("text-gray-400");
        step2.classList.add("text-blue-700");
        progressBar.classList.remove("w-1/3");
        progressBar.classList.remove("w-full");
        progressBar.classList.add("w-2/3");
    } else if (current === 3) {
        step3.classList.remove("text-gray-400");
        step3.classList.add("text-blue-700");
        progressBar.classList.remove("w-1/3");
        progressBar.classList.remove("w-2/3");
        progressBar.classList.add("w-full");
    }
}

function init() {
    form.addEventListener("input", canGoNext);
    nextBtn.addEventListener("click", next);
    previousBtn.addEventListener("click", previous);
    inputName.addEventListener("blur", () => {
        if (!isRequired(inputName.value)) {
            showError(inputName, "Please fill this field");
        } else {
            clearError(inputName);
        }
    });
    inputEmail.addEventListener("blur", () => {
        if (!validateEmail()) {
            showError(inputEmail, "Please enter a valid email");
        } else {
            clearError(inputEmail);
        }
    });
    inputPhone.addEventListener("blur", () => {
        if (!validatePhone()) {
            showError(inputPhone, "Please enter a valid phone number");
        } else {
            clearError(inputPhone);
        }
    });
    inputUsername.addEventListener("blur", () => {
        if (!isRequired(inputUsername.value)) {
            showError(inputUsername, "Please fill this field");
        } else {
            clearError(inputUsername);
        }
    });
    inputPassword.addEventListener("blur", () => {
        if (!validatePassword()) {
            showError(
                inputPassword,
                "Please write a password with min 6 chars",
            );
        } else {
            clearError(inputPassword);
        }
    });
    inputConfirmPassword.addEventListener("blur", () => {
        if (!validateConfirmPassword()) {
            showError(inputConfirmPassword, "Please match your password");
        } else {
            clearError(inputConfirmPassword);
        }
    });
    inputRole.addEventListener("blur", () => {
        if (!isRequired(inputRole.value)) {
            showError(inputRole, "Please fill this field");
        } else {
            clearError(inputRole);
        }
    });
    inputBio.addEventListener("blur", () => {
        if (!validateBio()) {
            showError(inputBio, "Please fill this field max 200 chars");
        } else {
            clearError(inputBio);
        }
    });

    submitBtn.addEventListener('click', displaySuccess);
}

document.addEventListener("DOMContentLoaded", init);
