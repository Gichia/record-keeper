import React from 'react';
import PropTypes from 'prop-types';

import AddRecordForm from '../../add-record-form/add-record-form.component';
import RecordsPreview from '../../records-preview/records-preview.component';
import RecordsFilterForm from '../../records-filter-form/records-filter-form.component';

const HomePage = () => {

    const homeLayout = (
        <div className='grid-2'>
            <div>
                <AddRecordForm />
            </div>
            <div>
                <RecordsFilterForm />
                <RecordsPreview />
            </div>
        </div>
    );

    return (
        <React.Fragment>
            { homeLayout }
        </React.Fragment>
    )
};

HomePage.propTypes = {

};

export default HomePage;

