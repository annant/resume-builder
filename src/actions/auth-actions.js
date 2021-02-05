export const loginUser = (credential) => {
    return {
        type: 'CREATE_SESSION',
        payload: credential
    }
};

export const registerUser = (accountData) => {
    return {
        type: 'REGISTER',
        payload: accountData
    }
};