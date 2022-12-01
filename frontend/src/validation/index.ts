
export const rules = {
    isRequired : async (value: string | number): Promise<string | boolean> => {
        return !!value || false
    },

    isEmail : async (value: string): Promise<string | boolean> => {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailPattern.test(value) || false
    },

    isPhoneNumber: async (value: string): Promise<string | boolean> => {
        const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        return phonePattern.test(value) || false 
    },

    isEmailUnique : async (value: string | number): Promise<string | boolean> => {
        if(value === "") return true

        const response = await (await fetch(`http://localhost:3000/unique/email/${value}`)).text()
        if(value !== response) return true

        return false
    },

    isUsernameUnique : async (value: string | number): Promise<string | boolean> => {
        if(value === "") return true

        const response = await (await fetch(`http://localhost:3000/unique/username/${value}`)).text()
        if(value !== response) return true

        return false
    },

    minLength : async (value: string, min: number): Promise<string | boolean> => {
        if(value.length < min) return false

        return true
    },

    maxLength : async (value: string, max: number): Promise<string | boolean> => {
        if(value.length > max) return false
        
        return true
    },

    isEqual: async (value: string, state: any): Promise<boolean | string> => {
        if(value === state) return true
        return false
    } 
}