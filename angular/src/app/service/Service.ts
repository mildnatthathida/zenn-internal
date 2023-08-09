export class Book {
    constructor(
        public _id: string,
        public name: String,
        public price: String,
        public description: String
    ){}
}

export class File {
    _id: String = '';
    title: String = '';
    textContent: String = '';
}