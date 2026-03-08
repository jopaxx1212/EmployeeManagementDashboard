import React, { useState } from 'react';
import { Employee, Department, Project } from '../types';

interface Props {
    employees: Employee[];
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, updatedData: Partial<Employee>) => Promise<void>;
    departments: Department[];
    projects: Project[];
}

const EmployeeList: React.FC<Props> = ({ employees, onDelete, onUpdate, departments, projects }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

    const handleEdit = (emp: Employee) => {
        setEditingId(emp.Employee_ID!);
        setEditName(emp.Name);
    };

    const handleSave = (id: number) => {
        onUpdate(id, { Name: editName });
        setEditingId(null);
    };

    const getDeptName = (id?: number) => departments.find(d => d.Department_ID === id)?.Department_name || 'Unassigned';
    const getProjName = (id?: number) => projects.find(p => p.Project_ID === id)?.Project_name || 'None';

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                        <th className="px-6 py-4 text-xs font-bold text-slate-200 uppercase tracking-widest">Employee</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-200 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-200 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {employees.map((emp) => (
                        <tr key={emp.Employee_ID} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingId === emp.Employee_ID ? (
                                    <input 
                                        className="bg-slate-800 border border-indigo-500 rounded px-2 py-1 text-sm text-white outline-none"
                                        value={editName} 
                                        onChange={(e) => setEditName(e.target.value)} 
                                    />
                                ) : (
                                    <span className="text-sm font-semibold text-white">{emp.Name}</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{emp.Email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {editingId === emp.Employee_ID ? (
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleSave(emp.Employee_ID!)} className="text-emerald-400 hover:text-emerald-300">Save</button>
                                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-200">Cancel</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end gap-4">
                                        <button onClick={() => setViewingEmployee(emp)} className="text-slate-400 hover:text-white transition-colors">View</button>
                                        <button onClick={() => handleEdit(emp)} className="text-indigo-400 hover:text-indigo-300">Edit</button>
                                        <button onClick={() => onDelete(emp.Employee_ID!)} className="text-rose-500 font-bold hover:text-rose-400">Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {viewingEmployee && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Employee Details</h2>
                            <button onClick={() => setViewingEmployee(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Employee ID</label>
                                <p className="text-white font-medium">{viewingEmployee.Employee_ID}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                <p className="text-white font-medium text-lg">{viewingEmployee.Name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                                <p className="text-indigo-300 font-medium">{viewingEmployee.Email}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Department</label>
                                    <p className="text-emerald-400 font-medium">{getDeptName(viewingEmployee.department)}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Project</label>
                                    <p className="text-amber-400 font-medium">{getProjName(viewingEmployee.project)}</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setViewingEmployee(null)}
                            className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;