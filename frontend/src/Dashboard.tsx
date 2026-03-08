import React, { useState, useEffect } from 'react';
import * as api from './api';
import EmployeeList from './components/EmployeeList'; 
import { Employee, Department, Project } from './types';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'employees' | 'departments' | 'projects'>('employees');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [depts, setDepts] = useState<Department[]>([]);
    const [projs, setProjs] = useState<Project[]>([]);

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    
    const [newDeptName, setNewDeptName] = useState("");
    const [newProjName, setNewProjName] = useState("");

    const refreshData = async () => {
        const [e, d, p] = await Promise.all([api.getEmployee(), api.getDepartments(), api.getProjects()]);
        setEmployees(e);
        setDepts(d);
        setProjs(p);
    };

    useEffect(() => { refreshData(); }, []);

    const handleAddEmployee = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!newEmail) {
            setEmailError("Email is required.");
            return;
        }

        if (!emailRegex.test(newEmail)) {
            setEmailError("Invalid email format (e.g. user@gmail.com)");
            return;
        }

        setEmailError("");
        try {
            await api.createEmployee({ Name: newName, Email: newEmail });
            setNewName(""); 
            setNewEmail("");
            refreshData();
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    const handleAddDept = async () => {
        const id = depts.length + 101; 
        await api.createDepartment({ Department_ID: id, Department_name: newDeptName });
        setNewDeptName("");
        refreshData();
    };

    const handleAddProj = async () => {
        const id = projs.length + 501;
        await api.createProject({ Project_ID: id, Project_name: newProjName });
        setNewProjName("");
        refreshData();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 py-12 px-4 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Team Managing Dashboard</h1>
                    <p className="text-slate-400 font-medium">Better and more efficient team management system.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="flex border-b border-white/5 bg-black/20">
                        {['employees', 'departments', 'projects'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-8 py-5 text-xs font-bold uppercase tracking-widest transition-all ${
                                    activeTab === tab 
                                    ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-wrap gap-4 items-end">
                            {activeTab === 'employees' && (
                                <>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">Full Name</label>
                                        <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
                                        <input 
                                            value={newEmail} 
                                            onChange={e => {
                                                setNewEmail(e.target.value);
                                                if(emailError) setEmailError("");
                                            }} 
                                            className={`w-full bg-slate-900/50 border ${emailError ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'border-white/10'} text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all`} 
                                            placeholder="john@example.com" 
                                        />
                                        {emailError && <p className="text-rose-400 text-[11px] mt-2 font-bold italic">⚠️ {emailError}</p>}
                                    </div>
                                    <button onClick={handleAddEmployee} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg">Add Member</button>
                                </>
                            )}

                            {activeTab === 'departments' && (
                                <>
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">Department Name</label>
                                        <input value={newDeptName} onChange={e => setNewDeptName(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Engineering" />
                                    </div>
                                    <button onClick={handleAddDept} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg">Create Department</button>
                                </>
                            )}

                            {activeTab === 'projects' && (
                                <>
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">Project Name</label>
                                        <input value={newProjName} onChange={e => setNewProjName(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Website Redesign" />
                                    </div>
                                    <button onClick={handleAddProj} className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg">Launch Project</button>
                                </>
                            )}
                        </div>

                        <div className="bg-black/20 rounded-2xl overflow-hidden border border-white/5">
                            {activeTab === 'employees' && (
                                <EmployeeList 
                                    employees={employees} 
                                    onDelete={async (id: number) => { await api.deleteEmployee(id); refreshData(); }}
                                    onUpdate={async (id: number, data: Partial<Employee>) => { await api.updateEmployee(id, data); refreshData(); }}
                                    departments={depts}
                                    projects={projs}
                                />
                            )}

                            {activeTab === 'departments' && (
                                <table className="w-full text-left">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-200">ID</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-200">Department Name</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {depts.map(d => (
                                            <tr key={d.Department_ID} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-sm text-slate-400">{d.Department_ID}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-white">{d.Department_name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'projects' && (
                                <table className="w-full text-left">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-200">ID</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-200">Project Name</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {projs.map(p => (
                                            <tr key={p.Project_ID} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 text-sm text-slate-400">{p.Project_ID}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-white">{p.Project_name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;