export interface personInterface {
    firstname ?: string,
    lastname ?: string
    age ?: number
}

export interface studentInterface extends personInterface {
    id ?: number,
}