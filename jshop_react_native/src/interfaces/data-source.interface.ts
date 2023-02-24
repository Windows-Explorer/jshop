export default interface IDataSource {
    getData(): Promise<any[]>
}