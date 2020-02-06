import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecordContext from '../../context/records/record.context';

const AddRecordForm = ({ formTitle, submitBtnText }) => {

    // Init Context
    const recordContext = useContext(RecordContext);
    const { addRecord, current, clearCurrent, updateRecord } = recordContext;

    useEffect(() => {
        if (current) {
            // Fill the records from with selected record
            setRecord(current);
        } else {
            // Clear the form inputs
            setRecord({
                title: '',
                description: '',
                type: 'personal',
                dueDate: '',
            });
        };
    }, [recordContext, current]);

    // Local State For The Form
    const [record, setRecord] = useState({
        title: '',
        description: '',
        type: 'personal',
        dueDate: '',
    });

    // Desctructure values from state
    const { title, description, type, dueDate, } = record;

    // Handle inputs change
    const onChange = e => setRecord({
        ...record, [e.target.name]: e.target.value
    });

    // Handle form submit 
    const onSubmit = e => {
        e.preventDefault();
        
        // Check for type of submit
        if (current === null) {
            // Create new record
            addRecord(record);
        } else {
            // Update current record
            updateRecord(record);
        };

        // Clear the form inputs
        clearAll();

    };

    // Clear all edit effects
    const clearAll = () => {
        clearCurrent();
    };

    const recordForm = (
        <form onSubmit={onSubmit}>
            <h2 
                className={ current ? "text-warning" : "text-primary" }
            >
                { current ? "Edit Record" : formTitle }
            </h2>

            <input 
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
                required
            />

            <textarea 
                name="description" 
                cols="30" 
                rows="5"
                placeholder="Description"
                value={description}
                onChange={onChange}
                required
            >
            </textarea>

            <h5 className="my-1">Due Date</h5>
            <input 
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={onChange}
                required
            />

            <h5>Record Type</h5>
            <input 
                type="radio" 
                name="type" 
                value="personal"
                checked={type === 'personal'} 
                onChange={onChange}
                required
            /> Personal {' '}
            <input 
                type="radio" 
                name="type" 
                value="professional"
                checked={type === 'professional'} 
                onChange={onChange}
                required
            /> Professional

            <div>
                <input 
                    type="submit" 
                    value={ current ? "Update Record" : submitBtnText }
                    className={ current ? "btn btn-warning btn-block" : "btn btn-primary btn-block" } 
                /> 
            </div>
            { current &&
                <div>
                    <button 
                        className="btn btn-light btn-block"
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            }

        </form>
    );

    return (
        <React.Fragment>
            { recordForm }
        </React.Fragment>
    )
}

AddRecordForm.propTypes = {
    formTitle: PropTypes.string.isRequired,
    submitBtnText: PropTypes.string.isRequired,
};

AddRecordForm.defaultProps = {
    formTitle: "Add Record",
    submitBtnText: "Add Contact",
};

export default AddRecordForm;
