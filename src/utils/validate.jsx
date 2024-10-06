export const validateLoginForm = (payload) => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (!payload || typeof payload.username !== "string" || payload.username.trim().length === 0 ) {
        isFormValid = false;
        errors.username = "A felhasználónév mező kitöltése kötelező!";
    }

    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        if(payload.password.trim().length === 0){
            errors.password = "A jelszó mező kitöltése kötelező!";
        }else{
            errors.password = "A jelszónak legalább 8 karakternek kell lennie!";
        };
    }

    if (!isFormValid) {
        message = "Hibásan kitöltött űrlap!";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};