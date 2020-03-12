import React from "react";
import {render} from "react-dom";
import Component from "./component";
import './index.scss'

const styles = {
    fontFamily: "sans-serif",
};

const functionStrs = ['Summary', 'Progress', 'Time Spent']
const [Summary,Progress,TimeSpent] = functionStrs.map(p=>{
    return (props)=>{
        console.log(props)
        return (<div className={`${p.toLowerCase()}-component ${(props.className || '')}`}>
            {p} component
        </div>)
    }
})

class App extends React.Component {
    static data = [
        {text: 'Summary', value: 'summary', component: Summary, props:{ln:'en'}},
        {text: 'Progress', value: 'progress', component: Progress},
        {text: 'Time Spent', value: 'time_spent', component: TimeSpent},
    ]

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div style={styles}>
                <Component activeValue="progress" onChange={console.log} data={App.data}/>
            </div>

        );
    }
}

render(<App/>, document.querySelector(".root"));
