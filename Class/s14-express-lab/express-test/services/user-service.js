import { User } from '../models/User.js';

export const createUser = async ({ username, name, email, password }) => {
    const user = new User.create({
        username,
        name,
        email,
        password,
    }).catch((dbError) => console.error(dbError.message));
    return user;
};

// search for a user
export const finduser = async (username) => {
    const userFound = await User.findOne({ username: username}).catch((dbError) => 
        console.error(dbError.message)
    );
    return userFound;
};

export const fuindUsers = async (name) => {
    return await User.find({ name })
    .sort({ name: 1 })
    .catch(( dbError ) => console.error(dbError.message));
}
