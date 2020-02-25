import React from "react";
import {render} from "react-dom";
import Component from "./component";
import './index.scss'
import $ from "jquery";

const styles = {
    fontFamily: "sans-serif",
};

/*
const Summary=(props)=>{
    return (<div className={`summary-component ${(props.className || '')}`}>
        Summary component
    </div>)
}*/

const functionStrs = ['Summary', 'Progress', 'Time Spent']
const [Summary,Progress,TimeSpent] = functionStrs.map(p=>{
    return (props)=>{
        return (<div className={`${p.toLowerCase()}-component ${(props.className || '')}`}>
            {p} component
        </div>)
    }
})

class App extends React.Component {
    static data = [
        {text: 'Summary', value: 'summary', component: Summary},
        {text: 'Progress', value: 'progress', component: Progress},
        {text: 'Time Spent', value: 'time_spent', component: TimeSpent},
    ]

    constructor(props, context) {
        super(props, context);


        //fetch data then place data and rowsCount into state
        this.state = {
            //data:,
        }

        this.myRef = React.createRef();
    }



    render() {

        return (
            <div style={styles}>
                <Component data={App.data}/>
            </div>

        );
    }
}

render(<App/>, document.querySelector(".root"));
