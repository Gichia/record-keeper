import React, { useContext, useRef, useEffect } from 'react';

import RecordContext from '../../context/records/record.context';


const RecordsFilterForm = () => {

    // Init Context
    const recordContext = useContext(RecordContext);
    const text = useRef('');
    
    const { filterRecords, clearFilter, filtered } = recordContext;

    useEffect(() => {
        if (filtered === null) { text.current.value = ''; };
    }, []);

    // Handle filter
    const onChange = e => {
        if (text.current.value !== '') {
            filterRecords(e.target.value);
        } else {
            clearFilter();
        };
    };

    return (
        <form>
            <input 
                ref={text} 
                type="text" 
                placeholder="Filter Records..." 
                onChange={onChange}
            /> 
        </form>
    )
}

export default RecordsFilterForm;
