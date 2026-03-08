export interface Employee {
    Employee_ID?: number;
    Name: string;
    Email: string;
    department?: number;
    project?: number;
}

export interface Project {
    Project_ID: number;
    Project_name: string;
}

export interface Department {
    Department_ID: number;
    Department_name: string;
    manager?: number; 
}
