import IDataSource from "../interfaces/data-source.interface"

export default class DataSource implements IDataSource {
    async getData(): Promise<any[]> {
        const result = await (await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")).json()
        console.log(result)
        return result
    }

}