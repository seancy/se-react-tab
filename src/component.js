import React from "react";
import PropTypes from 'prop-types'
import "./component.scss"

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        const data = (this.props.data || [
            {text: 'Summary', value: 'summary'},
            {text: 'Progress', value: 'progress'}
        ]).map((p, index) => {
            let active = false
            if (index == 0) {
                active = true
            }
            return {...p, active}
        })

        this.state = {
            data
        };
    }

    activeNav(item){
        this.setState(prev=>{
            let data = prev.data
            data = data.map(p=>{
                return p.value==item.value?{...p, active: true}:{...p, active: false}
            })
            return {data}
        }, ()=>{
            const {onChange}=this.props
            onChange && onChange(this.state.data.find(p=>p.active))
        })
    }

    render() {
        const {data} = this.state
        const activeItem = data.find(p => p.active)
        const Component = activeItem && activeItem.component

        return (
            <div className={`se-react-tab`}>
                <ul className="tab-navs">
                    {data.map(p => (
                        <li key={p.value} onClick={this.activeNav.bind(this, p)}
                            className={`nav-item ${p.value}${(p.active ? ' active' : '')}`}>{p.text}</li>
                    ))}
                </ul>
                <div className="tab-content">
                    {Component && <Component {...activeItem.props}/>}
                </div>
            </div>
        );
    }
}

/*
* {
                        const Component = p.component
                        return p.component ? <Component className={`tab-content ${p.active?'':'hide'}`}/> : ''
                    }
* */
export default Component;


Component.propTypes = {
    onChange:PropTypes.func,

    /*data:PropTypes.arrayOf(PropTypes.exact({
        value:PropTypes.string,
        text:PropTypes.string
    })),
    onEnter:PropTypes.func,
    onRemove:PropTypes.func,
    */
}
