import React, { useReducer } from 'react';
import uuid from 'uuid';
import RecordContext from './record.context';
import recordReducer from './record.reducer';
import { 
    ADD_RECORD,
    UPDATE_RECORD,
    DELETE_RECORD,
    SET_CURRENT,
    FILTER_RECORDS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
} from './record.types';


const RecordState = props => {
    const initialState = {
        records: [
            {
                id: 1,
                user: 'Peter Gichia',
                title: 'Record One',
                description: 'Record One Description',
                type: 'personal',
                dueDate: '2020-03-01',
                isCompleted: false,
                dateCreated: '2020-02-06',
            },
            {
                id: 2,
                user: 'Patrick Gichini',
                title: 'Record Two',
                description: 'Record Two Description',
                type: 'personal',
                dueDate: '2020-03-01',
                isCompleted: false,
                dateCreated: '2020-02-06',
            },
            {
                id: 3,
                user: 'Chris Ngene',
                title: 'Record Three',
                description: 'Record Three Description',
                type: 'professional',
                dueDate: '2020-03-01',
                isCompleted: false,
                dateCreated: '2020-02-06',
            },
        ],
        current: null,
        filtered: null,
    };


    const [state, dispatch] = useReducer(recordReducer, initialState);

    // Add Record
    const addRecord = record => {
        record.id = uuid.v4();
        dispatch({ type: ADD_RECORD, payload: record, });
    };

    // Delete Record
    const deleteRecord = id => {
        dispatch({ type: DELETE_RECORD, payload: id, });
    };

    // Set Current Record
    const setCurrent = record => {
        dispatch({ type: SET_CURRENT, payload: record, })
    };

    // Clear Current Record
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT, })
    };

    // Update Record
    const updateRecord = record => {
        dispatch({ type: UPDATE_RECORD, payload: record, })
    };

    // Filter Records
    const filterRecords = text => {
        dispatch({ type: FILTER_RECORDS, payload: text, })
    };

    // Clear Filters
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER, })
    };

    return (
        <RecordContext.Provider value={{ 
            records: state.records,
            current: state.current,
            filtered: state.filtered,
            addRecord,
            updateRecord,
            deleteRecord,
            setCurrent,
            clearCurrent,
            filterRecords,
            clearFilter,
         }} >
            { props.children }
        </RecordContext.Provider>
    );

};

export default RecordState;
