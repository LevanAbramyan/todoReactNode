import React from 'react';

function Footer(props) {
    return (
        <div className="footer">
<label id="amount">{props.left} item left</label>
            <div className="mid-butt">
                <button  className={(props.filterMode === 'all')? 'with-border': ''} onClick={()=>props.filteR(props.allMode())}>All</button>
                <button className={(props.filterMode === 'active')? 'with-border': ''} onClick={()=>props.filteR(props.activeMode())}>Active</button>
                <button className={(props.filterMode === 'completed')? 'with-border': ''} onClick={()=>props.filteR(props.completedMode())} >Completed</button>
            </div>
            <button onClick={()=>props.clearComplete()}>Clear completed</button>
        </div>
    )
}
export default Footer;