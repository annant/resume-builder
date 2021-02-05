export const updateResumeReducer = (resume = {}, action) => {
    const sessionData = sessionStorage.getItem('RESUME');
    if(sessionData) {
        resume = JSON.parse(sessionData);
    }
    if(action.type === 'UPDATE_RESUME') {
        action.payload.email = action.payload.email || action.payload.userName;
        sessionStorage.setItem('RESUME', JSON.stringify(action.payload));
        return action.payload;
    }
    return resume;
}