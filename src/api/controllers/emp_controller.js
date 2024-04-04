import employee from '../models/emp_model';
import mongoose from 'mongoose';

const createEmp = async (req, res) => {
    const {
        empID,
        empName,
        empRole,
        empAddress,
        empContactNum,
        empJoinedDate,
        empBasicSalary,
        empRemainingLeaves,
        empFinalSalary
    } = req.body;

    try {
        const newEmployee = await employee.create({
            empID,
            empName,
            empRole,
            empAddress,
            empContactNum,
            empJoinedDate,
            empBasicSalary,
            empRemainingLeaves,
            empFinalSalary
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getallEmp = async (req, res) => {
    try {
        const employees = await employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getbyIdEmp = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const employeeFound = await employee.findById(id);

        if (!employeeFound) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(employeeFound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const updateEmp = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // Add this line to get the action from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        let updatedEmployee;

        if (action === 'absent') {
            // If the action is 'absent', decrease the remaining leaves by 1
            updatedEmployee = await employee.findOneAndUpdate(
                { _id: id, empRemainingLeaves: { $gt: 0 } }, // Check if remaining leaves are greater than 0
                { $inc: { empRemainingLeaves: -1 } }, // Decrease remaining leaves by 1
                { new: true }
            );
        } else {
            // If the action is not 'absent', update other employee details
            const {
                empName,
                empRole,
                empAddress,
                empContactNum,
                empJoinedDate,
                empBasicSalary,
                empRemainingLeaves,
                empFinalSalary
            } = req.body;

            updatedEmployee = await employee.findOneAndUpdate(
                { _id: id },
                {
                    empName,
                    empRole,
                    empAddress,
                    empContactNum,
                    empJoinedDate,
                    empBasicSalary,
                    empRemainingLeaves,
                    empFinalSalary
                },
                { new: true }
            );
        }

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found or no remaining leaves' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteEmp = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const deletedEmployee = await employee.findOneAndDelete({ _id: id });

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(deletedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { createEmp, deleteEmp, updateEmp, getallEmp, getbyIdEmp };
