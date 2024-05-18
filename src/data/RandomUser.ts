interface RandomUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    avatar: string
}

//this is a function I generally use to make customized random IDs depend on the situation
export function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default RandomUser;