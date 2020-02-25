import React from "react";
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
        })
    }

    render() {
        const {data} = this.state

        return (
            <div className={`se-react-tab`}>
                <ul className="tab-navs">
                    {data.map(p => (
                        <li key={p.value} onClick={this.activeNav.bind(this, p)}
                            className={`nav-item ${p.value}${(p.active ? ' active' : '')}`}>{p.text}</li>
                    ))}
                </ul>
                <div className="tab-contents">
                    {data.map(p => {
                        const Component = p.component
                        return p.component ? <Component className={`tab-content ${p.active?'':'hide'}`}/> : ''
                    })}
                </div>
            </div>
        );
    }
}

export default Component;

