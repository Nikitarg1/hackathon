export default {
    validateForm(form) {
        return form.validate()
    },
    resetErrors(errors) {
        Object.keys(errors).forEach(key => {
            errors[key].error = false;
            errors[key].errorMessage = '';
        })
    },
}
