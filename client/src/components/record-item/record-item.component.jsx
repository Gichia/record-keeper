import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RecordContext from '../../context/records/record.context';

const RecordItem = ({ record }) => {

    // Init Context
    const recordContext = useContext(RecordContext);
    const { deleteRecord, setCurrent, clearCurrent } = recordContext;

    // Destructure values
    const { id, title, type, isCompleted, dueDate,  } = record;

    // Delete current record
    const onDelete = () => {
        deleteRecord(id);
        clearCurrent();
    };

    const recordCard = (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {title}{' '} 
                <span 
                    style={{ float: "right" }}
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary') }
                >
                    { type.charAt(0).toUpperCase() + type.slice(1) }
                </span>
            </h3>

            <ul className="list">
                { dueDate && (
                    <li>
                        <i className="far fa-calendar-alt"></i> {' '} 
                        <strong>Due Date</strong>:  { dueDate }
                    </li>
                ) }

                { !isCompleted && (
                    <li style={{ color: "red" }}>
                        <i className="far fa-window-close"></i> Pending
                    </li>
                ) }
            </ul> 

            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(record)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>

        </div>
    );

    return (
        <React.Fragment>
            { recordCard }
        </React.Fragment>
    )
};

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
};

export default RecordItem;
