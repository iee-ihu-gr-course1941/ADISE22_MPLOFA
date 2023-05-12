import {useContext, useState} from "react";
import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import {UserContext} from "../Contexts/UserContext";
import {Link} from "@inertiajs/inertia-react";

export function BugSubmissionForm() {
    const [whyModel,setWhyModel] = useState(false),
        User = useContext(UserContext),
        [device,setDevice] = useState(''),
        [bugDesc,setBugDesc] = useState(''),
        [submitted,setSubmitted] = useState(false);
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-lg-2 col-12 align-content-center border border-1 p-5">
                            <img src={'Images/BugIcon.png'} className="img-fluid rounded-start" alt="..."></img>
                    </div>
                    <div className="col-lg-10 col-12">
                        <div className="card-body mx-auto bug-form-body">
                            <h5 className="card-title text-danger">Submit Bugs</h5>
                            <p className="card-text">
                                <strong>
                                    If you come across something that you think, doesn't work as intended, I would appreciate it,
                                    if you could report it using this form.
                                </strong>
                            </p>
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#BugSubmission">
                                Report a Bug !
                            </button>
                        </div>
                    </div>
                </div>
                 <div className="modal fade p-0" id="BugSubmission" tabIndex="-1" aria-labelledby="Bug Submission" aria-hidden="true">
                     <div className="modal-dialog ">
                         <div className="modal-content">
                             <div className="modal-header ">
                                 <h1 className="modal-title fs-5" id="exampleModalLabel">Submit a Bug</h1>
                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             {
                                 !submitted ?
                                 <div className="modal-body">
                                     <p><strong>How to submit Bugs</strong></p>
                                     <p>If you are using a desktop or a laptop, fill the first field with either word.</p>
                                     <p>If you are using a mobile phone or a tablet, please provide the device model you are using.</p>
                                     <button type={'button'} className={'btn btn-sm text-info p-2 mb-2'} onClick={()=>{setWhyModel(!whyModel)}}>
                                         Why do i have to provide the device model?
                                     </button>
                                     {
                                         whyModel && (
                                             <div className={'p-3 border border-1 my-2'}>
                                                 <p className={'text-success'}>
                                                     When using a mobile phone or a tablet to play the game,
                                                     sometimes there might be issues with the scaling of the graphics.
                                                 </p>
                                                 <p className={'text-success'}>
                                                     By providing the name of the model you are using,
                                                     I can find the resolution it runs on and fix the scaling issue.
                                                 </p>
                                             </div>
                                         )

                                     }
                                     <p>
                                         Give information about what were you doing when you encountered the bug,
                                         what part of the game wasn't functioning as intended, if you can remember what steps led
                                         to the bug happening.
                                     </p>
                                     <form className={'w-100'}>
                                         <div className="my-3">
                                             <label htmlFor="Device" className="form-label">
                                                 <strong>What device were you using when you encountered this bug?</strong>
                                             </label>
                                             <FormFloatingTextInput type={'text'} name={'Device'} required={true}
                                                                    placeHolder={'Device Model'}
                                                                    className={' my-3'} value={device}
                                                                    handleChange={(e)=>{setDevice(e.target.value);console.log()}}>
                                             </FormFloatingTextInput>
                                         </div>
                                         <div className="my-2">
                                             <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                                 <strong>Describe the bug you encountered in detail.</strong>
                                             </label>
                                             <textarea name={'Bug'} className={'border border-1 rounded text-center w-100 p-3'}
                                                       style={{resize:'none',height:150}} value={bugDesc} required={true} placeholder={'What was the issue?'}
                                                       onChange={(e)=>{setBugDesc(e.target.value);}}>
                                         </textarea>
                                         </div>
                                         <strong>Please provide as much detail as possible.</strong>
                                     </form>
                                 </div>
                                     :
                                     <div className={'my-5'}>
                                         <h4 className={'text-success'}>Bug successfully submitted!</h4>
                                     </div>
                             }
                             <div className="modal-footer text-center justify-content-center">
                                 <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={()=>{setSubmitted(false)}}>Close</button>
                                 {!submitted &&
                                     <Link href={route('New_Bug')} method={'post'} as={'button'} data={{bug_description:bugDesc,device:device}}
                                      className={"btn btn-outline-primary"} type="button" disabled={bugDesc ==='' || device===''}
                                      onSuccess={()=>{setDevice('');setBugDesc('');setSubmitted(true)}}>
                                     Submit
                                 </Link>
                                 }
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </>
    )
}
