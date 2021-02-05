export const loginReducer = (authData=null, action) => {
    const sessionData = sessionStorage.getItem('SESSION_DATA');
    if(!authData && sessionData) {
        authData = JSON.parse(sessionData);
    }
    if(action.type === 'CREATE_SESSION') {
        return action.payload;
    }
    return authData;
}

export const registerReducer = (users = [], action) => {
    if(action.type === 'ADD_USER') {
        return [...users, action.payload];
    }
    return users;
}