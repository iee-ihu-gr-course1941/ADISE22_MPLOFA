export function FormFloatingTextInput({
type , name, value, className, autoComplete, required, handleChange, placeHolder,
    disabled, validFeedback, invalidFeedback,id,divClassName
}) {
    return (
        <div className={'form-floating p-0 ' + divClassName}>
            <input type={type ? type : 'text'} className={"form-control " + className} placeholder={placeHolder} name={name}
                   id={id} defaultValue={value} onChange={handleChange}  disabled={disabled} required={required}/>
            <label htmlFor={name}>{placeHolder}</label>
            {invalidFeedback ? <div className='invalid-feedback'>{invalidFeedback ? invalidFeedback : ""}</div> : ''}
            {validFeedback ? <div className='valid-feedback'>{validFeedback ? validFeedback : ""}</div> : ''}
        </div>
    )
}
