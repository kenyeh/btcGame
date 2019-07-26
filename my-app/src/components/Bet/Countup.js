import React, { Component } from 'react'
import NP from 'number-precision'
import * as workerTimers from 'worker-timers';

export default class countup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterNumber: 0
        };
        this.endNum = 0;
        this.duration = 0;
        this.delay = 0;

        this.stepAdd = 0;
        this.isCounting = false;

        NP.enableBoundaryChecking(false);
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.value, prevProps.value, this.isCounting);
        if (this.props.value !== prevProps.value && !this.isCounting) {
            // console.log('countup start');
            this.isCounting = true;
            this.setState({
                counterNumber: 0
            }, () => {
                // console.log('componentDidUpdate', this.props);
                this.endNum = this.props.value;
                this.duration = this.props.duration;
                this.delay = this.props.delay;
                this.startCountup();
            })
            
        }
    }


    startCountup = () => {
        const me = this;

        // console.log('start contuine');
        
        this.stepAdd = this.endNum / (this.duration / 20);

        if (this.endNum === 0 || this.duration === 0) {
            this.setState({
                counterNumber: this.endNum
            });
            this.isCounting = false;
            return ;
        }
        // console.log(this.endNum, this.duration, this.delay);
        this.counterTimer = workerTimers.setTimeout(me.TimerFn.bind(me), this.delay);
    }

    TimerFn = () => {
        const me = this
        let num = 0;
        // console.log('TimerFn contuine');
        if (me.state.counterNumber < me.endNum) {
            num = NP.plus(me.state.counterNumber, this.stepAdd);

            me.setState({
                counterNumber: num > me.endNum ? me.endNum : num
            }, () => {
                me.counterTimer = workerTimers.setTimeout(me.TimerFn.bind(me), 20);
            })
        } else {
            // complete
            me.countupDone()
        }
    }

    countupDone = () => {
        console.log('complete');
        this.isCounting = false;
        workerTimers.clearTimeout(this.counterTimer);
        this.props.complete();
    }


    render() {
        return (
            <span>{this.state.counterNumber.toFixed(2)}</span>
        )
    }
}
