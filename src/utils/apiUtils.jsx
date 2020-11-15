export const parseApiErrors = (error) => {
    let errors = {};

    if (error.response.data['violations']) {
        error.response.data['violations'].map(item =>
            errors[item['propertyPath']] = item.message
        );
    }

    return errors;
};
