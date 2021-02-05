const users = [
    {
        userName: 'agupta@gmail.com',
        password: 'abcd1234',
        firstName: 'Brian',
        lastName: 'Fahey',
        contact: '1234567890'
    },
    {
        userName: 'agupt1a@gmail.com',
        password: 'abcd1234',
        firstName: 'John',
        lastName: 'Miller',
        contact: '1234567890'
    }
];
export const login = ({userName, password}) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {

            return user.userName === userName && user.password === password;
        });
        if(user) {
            const {password, ...sessionData} = user;
            console.log(sessionData);
            resolve({status: 200, sessionData});
            return;
        }
        reject({status: 204, error: 'Invalid username or password'});
    });
}