export interface subjectinterface {
    readonly idCourse : number
    readonly clasename : string,
    readonly coursecode : string,
    description : string,
    section : number,
    date : string,
    time : number,
    enrolled : number,
    status : CourseStatus
    enrollStudent : string[],
    createdAt : Date,
    updatedAt : Date,
}

export enum CourseStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    WAITLIST = "WAITLIST"
}

export default subjectinterface