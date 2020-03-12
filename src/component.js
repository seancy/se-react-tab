import React from "react";
import PropTypes from 'prop-types'
import "./component.scss"

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        const data = (this.props.data || [
            {text: 'Summary', value: 'summary'},
            {text: 'Progress', value: 'progress'}
        ])

        const {activeValue}=this.props
        this.state = {
            data,
            activeValue:activeValue || (data && data.length ? data[0].value : '')
        };
    }

    activeNav(item){
        this.setState({activeValue:item.value}, ()=>{
            const {onChange}=this.props
            onChange && onChange(this.state.data.find(p=>p.value == this.state.activeValue))
        })
    }

    render() {
        const {data, activeValue} = this.state
        const activeItem = data.find(p => p.value == activeValue)
        const Component = activeItem && activeItem.component

        return (
            <div className={`se-react-tab`}>
                <ul className="tab-navs">
                    {data.map(p => (
                        <li key={p.value} onClick={this.activeNav.bind(this, p)}
                            className={`nav-item ${p.value}${(p.value == activeValue ? ' active' : '')}`}>{p.text}</li>
                    ))}
                </ul>
                <div className="tab-content">
                    {Component && <Component {...activeItem.props}/>}
                </div>
            </div>
        );
    }
}

export default Component;

Component.propTypes = {
    onChange:PropTypes.func,
    activeValue:PropTypes.string,
    data:PropTypes.arrayOf(PropTypes.exact({
        value:PropTypes.string,
        text:PropTypes.string,
        component:PropTypes.func,
        props:PropTypes.exact({
            defaultLanguage:PropTypes.string,
            token:PropTypes.string,
        })
    })),
}
