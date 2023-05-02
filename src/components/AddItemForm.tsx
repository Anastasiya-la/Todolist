import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('Add Item Form')
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (error !== null) {
            setError(null)
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }

    }
    return (
        <div>
            <TextField onKeyDown={onKeyDownHandler} value={title} onChange={onChangeHandler} variant={'outlined'}
                       className={error ? 'error' : ''} error={!!error} helperText={error} label={'Title'}
                       size={'small'}/>
            <IconButton color={'secondary'} onClick={addItem} size={'small'}
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
});

export default AddItemForm;