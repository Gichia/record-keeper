import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RecordContext from '../../context/records/record.context';

import RecordItem from '../record-item/record-item.component';

const RecordsPreview = () => {

    // Init Context
    const recordContext = useContext(RecordContext);
    const { records, filtered } = recordContext;

    if (records.length === 0) {
        return <h4>No records to diplay...</h4>
    };

    const recordsPreviewCards = (
        <TransitionGroup>
            { filtered !== null ? 
                // Show filtered records
                filtered.map(record => 
                    <CSSTransition key={record.id} timeout={500} classNames="item" >
                        <RecordItem record={record} />
                    </CSSTransition>
                ) : 

                // Show all records
                records.map(record => 
                    <CSSTransition key={record.id} timeout={500} classNames="item" >
                        <RecordItem record={record} />
                    </CSSTransition>
                ) 
            }
        </TransitionGroup>
    );

    return (
        <React.Fragment>
            { recordsPreviewCards }
        </React.Fragment>
    )
};

export default RecordsPreview;
