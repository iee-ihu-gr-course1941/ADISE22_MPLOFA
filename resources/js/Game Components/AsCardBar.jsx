import uuid from "react-uuid";
import React, {Fragment, useContext, useState} from 'react'
import {HeightContext} from "../Contexts/HeightContext";

export function AsCardBar(props) {
    const selected = props.selected,viewport_height = useContext(HeightContext);
    const CardMap1 = [
        ['A', "Ace"],['2', "Two"], ['3', "Three"],['4', "Four"],
        ['5', "Five"],['6', "Six"],['7', "Seven"]],
        CardMap2 = [['8', "Eight"], ['9', "Nine"],
            ['10', "Ten"],['J', "Jack"], ['Q', "Queen"],['K', "King"]];
        const Buttons1 = CardMap1.map((card) => {
            return (
                <Fragment key={card[1]}>
                    <input type="radio" className="btn-check" name='as' id={card[1]} value={card[1]}/>
                    <label className={"btn btn-outline-primary btn-sm " + (viewport_height < 500 && 'mb-2')} htmlFor={card[1]} style={{fontSize:(viewport_height<400 ? 11 : 15)}}>
                        {selected.length>1 ? card[0] + "'s" : card[0]}
                    </label>
                </Fragment>
            )
        });const Buttons2 = CardMap2.map((card) => {
            return (
                <Fragment key={card[1]}>
                    <input type="radio" className="btn-check" name='as' id={card[1]} value={card[1]}/>
                    <label className="btn btn-outline-primary btn-sm" htmlFor={card[1]} style={{fontSize:(viewport_height<400 ? 11 : 15)}}>
                        {selected.length>1 ? card[0] + "'s" : card[0]}
                    </label>
                </Fragment>
            )
        });
    return (
        <>
            <p className={'my-0 mb-md-3'} style={{fontSize:(viewport_height < 450 ? 13 : 19)}}>Declare your Cards</p>
            <div className="btn-group" role="group" aria-label="Basic example">
                {
                    (viewport_height < 500)
                        ?
                        <div className={'col'}>
                            <div className={(viewport_height < 500) ? "btn-group me-2" : "btn-group-vertical me-2"} role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                                {Buttons1}
                            </div>
                            <div className={(viewport_height < 500) ? "btn-group me-2" : "btn-group-vertical me-2"} role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                                {Buttons2}
                            </div>
                        </div>
                        :
                        <>
                            <div className={(viewport_height < 500) ? "btn-group me-2 " : "btn-group-vertical me-2"} role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                                {Buttons1}
                            </div>
                            <div className={(viewport_height < 500) ? "btn-group me-2 " : "btn-group-vertical me-2"} role="group" aria-label="First group" onChange={props.handleAs.bind(this)}>
                                {Buttons2}
                            </div>
                        </>

                }
            </div>
        </>
    )
}
