export const formValidation = {
    checkType(state, name, value) {
        if (name === "phone") {
            return this.phoneNumberValidation(state, name, value);
        } else if (name === "password") {
            return this.passwordValidation(state, name, value);
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
        };
        return data;
    },

    passwordValidation(state, name, value) {
        let error = [];
        if (value.length < 6) {
            error.push("Minimum 6 characters are required");
        }
        const data = {
            ...state,
            [name]: value,
            passwordError: error,
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
};