export const formValidation = {
    checkType(state, name, value) {
        if (name === "phone") {
            return this.phoneNumberValidation(state, name, value);
        } else if (
            name === "password" ||
            name === "oldPassword" ||
            name === "newPassword" ||
            name === "confirmPassword"
        ) {
            return this.passwordValidation(state, name, value);
        } else if (name === "firstname") {
            return this.firstNameValidation(state, name, value);
        } else if (name === "lastname") {
            return this.lastNameValidation(state, name, value);
        } else if (name === "dietName") {
            return this.dietNameValidation(state, value);
        } else if (name === "dietQuantity") {
            return this.dietQuantityValidation(state, value);
        } else if (name === "dietUnit") {
            return this.dietUnitValidation(state, value);
        } else if (name === "dietCalorie") {
            return this.dietCalorieValidation(state, value);
        } else if (name === "exerciseName") {
            return this.exerciseNameValidation(state, value);
        } else if (name === "exerciseDescription") {
            return this.exerciseDescriptionValidation(state, value);
        } else if (name === "expenseName") {
            return this.expenseNameValidation(state, value);
        } else if (name === "amount") {
            return this.paymentAmountValidation(state, name, value);
        } else if (name === "expenseAmount") {
            return this.paymentAmountValidation(state, name, value);
        } else {
            return state;
        }
    },

    phoneNumberValidation(state, name, value) {
        let error = [];
        const phoneNumberRegex = /^[+]?\d*$/;

        if (!value.match(phoneNumberRegex)) {
            error.push("This is not a valid phone number");
        }

        if (value.length !== 11) {
            error.push("Phone Number must contain 11 digits");
        }

        const data = {
            ...state,
            [name]: value,
            phoneError: error,
            errorStatus: null,
        };

        return data;
    },

    passwordValidation(state, name, value) {
        let error = [];

        if (value.length < 6) {
            error.push("Minimum 6 characters are required");
        }

        let data = {...state, [name]: value, errorStatus: null };

        if (name === "password") {
            data = {
                ...data,
                passwordError: error,
            };
        } else if (name === "oldPassword") {
            data = {
                ...data,
                oldPasswordError: error,
            };
        } else if (name === "newPassword") {
            data = {
                ...data,
                newPasswordError: error,
            };
        } else if (name === "confirmPassword") {
            data = {
                ...data,
                confirmPasswordError: error,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    firstNameValidation(state, name, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid first name");
        }

        const data = {
            ...state,
            [name]: value,
            firstnameError: error,
            errorStatus: null,
        };

        return data;
    },

    lastNameValidation(state, name, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid last name");
        }

        const data = {
            ...state,
            [name]: value,
            lastnameError: error,
            errorStatus: null,
        };

        return data;
    },

    dietNameValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid diet item name");
        }

        const data = {
            ...state,
            name: value,
            nameError: error,
            errorStatus: null,
        };

        return data;
    },

    dietQuantityValidation(state, value) {
        let error = [];
        const onlyNumberRegex = /^[+]?\d*$/;

        if (!value.match(onlyNumberRegex) || value.trim() === "") {
            error.push("Please give a valid quantity");
        }

        const data = {
            ...state,
            quantity: value,
            quantityError: error,
            errorStatus: null,
        };

        return data;
    },

    dietUnitValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid unit");
        }

        const data = {
            ...state,
            unit: value,
            unitError: error,
            errorStatus: null,
        };

        return data;
    },

    dietCalorieValidation(state, value) {
        let error = [];
        const onlyNumberRegex = /^[+]?\d*$/;

        if (!value.match(onlyNumberRegex) || value.trim() === "") {
            error.push("Please give a valid calorie");
        }

        const data = {
            ...state,
            calorie: value,
            calorieError: error,
            errorStatus: null,
        };

        return data;
    },

    exerciseNameValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid exercise name");
        }

        const data = {
            ...state,
            name: value,
            nameError: error,
            errorStatus: null,
        };

        return data;
    },

    exerciseDescriptionValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please write something about the exercise");
        }

        const data = {
            ...state,
            description: value,
            descriptionError: error,
            errorStatus: null,
        };

        return data;
    },

    paymentAmountValidation(state, name, value) {
        let error = [];

        const paymentAmountRegex = /^\+?[1-9]\d*$/;
        let errorStatus = null;

        if (!value.match(paymentAmountRegex)) {
            error.push("This is not a valid amount");
            errorStatus = state.errorStatus;
        }

        let data = {...state, errorStatus };

        if (name === "amount") {
            data = {
                ...data,
                amount: value,
                amountError: error,
                errorStatus: null,
            };
        } else if (name === "expenseAmount") {
            data = {
                ...data,
                amount: value,
                amountError: error,
                errorStatus: null,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    expenseNameValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid expense item name");
        }

        const data = {
            ...state,
            name: value,
            nameError: error,
            errorStatus: null,
        };

        return data;
    },
};