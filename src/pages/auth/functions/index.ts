export const passwordvalidate = (password: string)=>{
    var re = {
        'full': /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    };
    // add check for space within password.
    return re.full.test(password)
}