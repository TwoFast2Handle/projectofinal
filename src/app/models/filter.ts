export class Filter {

    genre : string
    search : string
    sort : string 
    ascDesc : boolean
    page : number
    itemsPerPage : number

    constructor () {
        this.genre = ""
        this.search = ""
        this.sort = ""
        this.ascDesc = false
        this.page = 0
        this.itemsPerPage = 0
    }

}
