import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="new-todo">
                <button onClick={this.props.toggle}
                   
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" /></svg></button>
                <form onSubmit={this.props.addTask}>
                    <input required data-value-missing
                        placeholder="What need to be done?"
                        autoFocus
                        value={this.props.task}
                        // placeholder="What needs to be done?"
                        //ref={this.props.inputElement}
                        // value={this.props.currentItem.text}
                        onChange={this.props.handleInput}></input>



                </form>
            </div>
        )
    }
}

export default Header;

