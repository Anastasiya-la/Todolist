import React, {ChangeEvent, useState} from 'react';

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
        editMode ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>
    );
};

export default EditableSpan;