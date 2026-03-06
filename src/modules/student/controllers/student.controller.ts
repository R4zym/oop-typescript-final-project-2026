import { Request, Response } from 'express';

class StudentController {
    // Get all students
    public getAllStudents(req: Request, res: Response): void {
        // Logic to retrieve all students
        res.send('Get all students');
    }

    // Create a new student
    public createStudent(req: Request, res: Response): void {
        // Logic to create a new student
        res.send('Create a new student');
    }

    // Update an existing student
    public updateStudent(req: Request, res: Response): void {
        // Logic to update student
        res.send('Update student');
    }

    // Partially update an existing student
    public patchStudent(req: Request, res: Response): void {
        // Logic to partially update student
        res.send('Partially update student');
    }

    // Delete a student
    public deleteStudent(req: Request, res: Response): void {
        // Logic to delete a student
        res.send('Delete student');
    }
}

export default new StudentController();
