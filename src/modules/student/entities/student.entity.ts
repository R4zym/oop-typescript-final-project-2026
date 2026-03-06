export class Student {
    id: number;
    name: string;
    email: string;
    dateOfBirth: Date;

    constructor(id: number, name: string, email: string, dateOfBirth: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    getFullName(): string {
        return this.name;
    }

    isAdult(): boolean {
        const today = new Date();
        const age = today.getFullYear() - this.dateOfBirth.getFullYear();
        return age >= 18;
    }
}
