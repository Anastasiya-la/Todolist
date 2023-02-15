import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    oldTitle: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.oldTitle)

    const activateEditMode = () => {
        setEditMode(true);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        editMode ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}
                              variant={'standard'}/> :
            <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>
    );
};

export default EditableSpan;