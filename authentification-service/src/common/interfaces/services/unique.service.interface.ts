export interface IUniqueService {
    isEmailUnique(email: string): Promise<boolean>
    isUsernameUnique(username: string): Promise<boolean>
}