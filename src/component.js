import React from "react";
import "./component.scss"

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: props.data.map(p=>({...p, checked:false})),
        };

    }

    getData() {
        return this.state.data.filter(p => p.checked)
    }

    clean() {
        this.setState(state => {
            const data = [...state.data]
            data.forEach(p => {
                p.checked = false;
                return p;
            });
            return {
                data
            }
        })
    }

    changeCheckboxStatus(e, item) {
        this.setState(state=>{
            const data = [...state.data]
            data.filter(p => p.value == item.value);
            return data;
        })
        item.checked = e.target.checked;
        const {onChange} = this.props
        if (onChange){
            onChange(e, item);
        }
    }

    render() {
        const {} = this.state;
        return (
            <ul className={'se-react-checkbox-group ' + (this.props.className || '')}>
                {this.state.data.map(item => {
                    const id = 'se-react-checkbox-group-box' + item.value;
                    return (
                        <li key={item.value}>
                            <input type="checkbox" id={id} value={item.value}
                                   checked={item.checked} onChange={e => this.changeCheckboxStatus(e, item)}/>
                            <label htmlFor={id}>{item.text}</label>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Component;

