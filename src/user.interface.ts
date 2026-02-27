interface personInterface {
    firstname ?: string,
    lastname ?: string
    age ?: number
}

interface studentInterface extends personInterface {
    id ?: number,
}