class StudentService {
    constructor() {
        this.students = [];
    }

    createStudent(student) {
        this.students.push(student);
        return student;
    }

    getStudent(id) {
        return this.students.find(student => student.id === id);
    }

    updateStudent(id, updatedInfo) {
        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex !== -1) {
            this.students[studentIndex] = { ...this.students[studentIndex], ...updatedInfo };
            return this.students[studentIndex];
        }
        return null;
    }

    deleteStudent(id) {
        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex !== -1) {
            return this.students.splice(studentIndex, 1)[0];
        }
        return null;
    }

    getAllStudents() {
        return this.students;
    }
}

export default StudentService;
