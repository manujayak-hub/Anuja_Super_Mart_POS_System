import React, { useState, useEffect } from 'react';

const UpdateForm = ({ initialValues, onSubmit }) => {
    const [updatedValues, setUpdatedValues] = useState(initialValues);

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field "${name}" changed: ${updatedValues[name]} => ${value}`);
        setUpdatedValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(updatedValues);
    };

    // Reset form values when initialValues change
    useEffect(() => {
        setUpdatedValues(initialValues);
    }, [initialValues]);

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for updating product */}
                {Object.entries(initialValues).map(([key, value]) => (
                    // Hide the _id field
                    key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !=='__v' && (
                        <div key={key} className="mb-3">
                            <label htmlFor={key} className="form-label">{key}</label>
                            {/* Regular input field */}
                            <input
                                type="text"
                                className="form-control"
                                id={key}
                                name={key}
                                value={updatedValues[key]}
                                onChange={handleChange}
                                disabled={key === 'productId'}
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateForm;
