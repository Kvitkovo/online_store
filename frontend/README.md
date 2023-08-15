# README

### Prepare for running app local

- Run `npm install`<br />
- Run `npm prepare`<br />
- Run `npm start` <br />

## React Component code styleguide

### Component structure

    import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
    import lib from 'lib';

    import { fetchData } from '../api'

    import { useMyHook } from '../hooks';
    import { totalSum } from '../utils';
    import constants from '../constants';

    import { CustomList } from './conponents';
    import { Input, Button } from '../ui-kit';

    const MyComponent = () => {
        const [editMode, setEditMode] = useState(false);
        const [values, setValues] = useState([]);

        const valuesIds = useMemo(() => values.map(value => value.id), [values]);

        const handleClick = useCallback((item) => setValues(item),[]);

        useEffect(() => {
            fetchData();
        }, []);

        return (
            <>
                <CustomList valuesIds={valuesIds}/>
                <Input />
                <Button onClick={handleClick}>Click</Button>
            </>
        );
    };

    export default memo(MyComponent);

### Project folder/file structure

    components
        LoginPageComponent
            conponents(optional)
                CustomList
                    CustomList.jsx
                    index.js
                    CustomList.scss
                ...otherFiles
            LoginPageComponent.jsx
            index.js
            LoginPageComponent.scss
        common
            ReusedElement
                index.js
                ReusedElement.jsx
                ReusedElement.scss
    pages
        Login
            Login.jsx
            index.js
        ...otherFiles
    api
        fetchData.js
        ...otherFiles
    helpers
        axiosConfig.js
        ...otherFiles
    ui-kit
         Button
            index.js
            Button.jsx
            Button.scss
        Input
            index.js
            Input.jsx
            Input.scss
        ...otherFiles
        index.js
    constants
        index.js
        PATH.js
        API.js
    hooks
        useMyHook.js
        ...otherFiles
        index.js
    utils
        totalSum.js
        ...otherFiles
        index.js
