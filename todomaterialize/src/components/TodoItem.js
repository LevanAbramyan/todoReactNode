import React, { Component } from 'react';


class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
        }
    }
    toggleInputField = () => {
        const { isEditing } = this.state;
        this.setState({ isEditing: !isEditing });
    };

    handleEditField = e => {

        const { value } = e.target;
        const { item } = this.props;
        if (e.key === 'Enter') {
            item.text = value;
            this.props.updateTask(item);
            this.setState({
                isEditing: false,
            })
        }
        else if (e.key === 'Escape') {
            this.setState({
                isEditing: false,
            })
        }
    };
    render() {

        const { deleteTask, item, } = this.props;
        const { isEditing, } = this.state;
        return (
            <>
                <div className={"list"} >
                    <div className="container">
                        <div className="round">
                            {this.props.items && this.props.items.map((item) => {
                                return (
                                    <input type="checkbox" id={`checkbox-${this.props.items.id}`}
                                        onChange={(e) => this.props.handleStatusChange(e, this.props.item)}
                                        checked={(item) ? item.status : ''}
                                    />)
                            })}
                            <label for="checkbox"></label>
                        </div>
                    </div>
                    {/* <input onChange={(e) => this.props.handleStatusChange(e, this.props.item)} type="checkbox" checked={(item) ? item.status : ''} /> */}
                    {!isEditing && <p onDoubleClick={() => this.toggleInputField()} className={(item.status === true) ? "lined" : ''}>{item.text}</p>}
                    {isEditing &&
                        <input
                            required
                            defaultValue={item.text}
                            autoFocus
                            onKeyUp={(e) => this.handleEditField(e)}
                        />}
                    <div className="callout" data-closable>
                        <button onClick={() => deleteTask(item)} className="close-button" aria-label="Close alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                </div>




            </>
        )
    }
}
;
export default TodoItem;