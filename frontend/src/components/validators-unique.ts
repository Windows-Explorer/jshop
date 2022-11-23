export const isEmailUnique = async (value: string) => {
    if(value === "") return true
    const response = await (await fetch(`http://localhost:3000/unique/email/${value}`)).text()
    if(value != response) return true
}

export const isUsernameUnique = async (value: string) => {
    if(value === "") return true
    const response = await (await fetch(`http://localhost:3000/unique/username/${value}`)).text()
    if(value != response) return true
}