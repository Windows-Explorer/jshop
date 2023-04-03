export interface ICheckUniqueService {
    checkEmailUnique(email: string): Promise<boolean>
    checkUsernameUnique(username: string): Promise<boolean>
}