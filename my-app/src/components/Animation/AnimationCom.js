import React, { Component } from 'react'

import './AnimationCom.scss';

export default class AnimationCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        this.universeCanvas();
    }

    universeCanvas () {
        const me = this;
        /** 
         * canvas 创建星空
         */

        // 定义变量
        let canvas,
            context,
            screenW,
            screenH,
            stars = [];

        // 定义常量
        const FPS = 50,
            numStars = 200;

        /**
         * canvas设置，修复窗口变化，画布大小不变的问题
         */
        function canvasRender() {
            //获取屏幕大小
            screenW = getScreenInfo().winWidth;
            screenH = getScreenInfo().winHeight;

            // 设置canvas
            // canvas.setAttribute('width', screenW);
            // canvas.setAttribute('height', screenH);

            canvas.width = screenW;
            canvas.height = screenH;

            window.addEventListener('resize', drawStar);
        }

        const drawStar = function () {
            //获取canvas
            canvas = me.refs.universe;
            // console.log(canvas);
            // 设置画布
            canvasRender();
            //获取canvas执行上下文
            context = canvas.getContext('2d');
            // ===========组件应用层============
            //创建星星
            for (let i = 0; i < numStars; i++) {
                let x = Math.round(Math.random() * screenW);
                let y = Math.round(Math.random() * screenH);
                let length = 1 + Math.random() * 2;
                let opacity = Math.random();

                // 创建星星实例
                let star = new Star(x, y, length, opacity);
                stars.push(star);
            }

            // 星星闪动
            setInterval(animate, 1000 / FPS);
        }

        // ============组件定制层==============
        /**
         * Star
         * 
         * @param int x
         * @param int y
         * @param int length
         * @param float opacity
         */

        // 星星构造函数
        const Star = function (x, y, length, opacity) {
            this.x = parseInt(x);
            this.y = parseInt(y);
            this.length = parseInt(length);
            this.opacity = opacity;
            this.factor = 1;
            this.increment = Math.random() * 0.03;
        }

        //对象原型方法
        /**
         * 画星星
         * 
         * @param context
         */
        Star.prototype.draw = function (context) {
            context.rotate(Math.PI * 1 / 10);

            //save the context
            context.save();
            //move into the middle of the canvas,just make room
            context.translate(this.x, this.y);
            //change the opacity
            if (this.opacity > 1) {
                this.factor = -1;
            } else if (this.opacity <= 0) {
                this.factor = 1;

                // 更新一次星星位置
                this.x = Math.round(Math.random() * screenW);
                this.y = Math.round(Math.random() * screenH);
            }

            // factor 控制方面，淡入淡出，每次重绘，星星的透明度都在变化
            this.opacity += this.increment * this.factor;

            context.beginPath();
            //画线
            for (var i = 5; i > 0; i--) {
                context.lineTo(0, this.length);
                context.translate(0, this.length);
                context.rotate(Math.PI * 2 / 10);
                context.lineTo(0, -this.length);
                context.translate(0, -this.length);
                context.rotate(-(Math.PI * 6 / 10));
            }

            context.lineTo(0, this.length);
            context.closePath();

            context.fillStyle = 'rgba(255,255,200, ' + this.opacity + ')';
            context.shadowBlur = 5;
            context.shadowColor = '#ffff33';
            context.fill();

            context.restore();
        }

        /**
         * 获取窗口大小信息
         */
        const getScreenInfo = function() {
            let winWidth = 0;
            let winHeight = 0
            //获取窗口宽度
            if (window.innerWidth) {
                winWidth = window.innerWidth;
            } else if ((document.body) && (document.body.clientWidth)) {
                winWidth = document.body.clientWidth;
            }

            //获取窗口高度
            if (window.innerHeight) {
                winHeight = window.innerHeight;
            } else if ((document.body) && (document.body.clientHeight)) {
                winHeight = document.body.clientHeight;
            }

            //通过深入Document内部对body进行检测，获取窗口大小
            if (document.documentElement &&
                document.documentElement.clientHeight &&
                document.documentElement.clientWidth) {
                winHeight = document.documentElement.clientHeight;
                winWidth = document.documentElement.clientWidth;
            }

            // 将上述方法简化
            // screenW = window.innerWidth ||
            //     document.body.clientWidth ||
            //     document.documentElement.clientWidth;

            // screenH = window.innerHeight ||
            //     document.body.clientHeight ||
            //     document.documentElement.clientHeight;

            return {
                'winWidth': winWidth,
                'winHeight': winHeight
            }
        }

        

        /**
         * 星星闪动函数
         */
        const animate = function() {
            context.clearRect(0, 0, screenW, screenH);
            for (let i = 0; i < stars.length; i++) {
                stars[i].draw(context);
            }
        }

        // start
        drawStar();
    }

    
    render() {
        const Status =  this.props.animationStatus;
        // const Status = 'launch'
        let groundClass = '';
        let launcherClass = '';
        let rocketElClass = '';
        let rocketClass = '';
        let flyingStarClass = '';
        let universe = '';

        // console.log('get animationStatus', Status);
        switch (Status) {
            case 'loading':
                groundClass = ' ground-shake';
                rocketElClass = ' rocket-shake';
                launcherClass = ' launcher-ready';
            break;
            case 'launch':
                universe = ' fading';
                groundClass = ' sink';
                launcherClass = ' launching';
                rocketElClass = ' fly';
                rocketClass = ' fire blur';
                flyingStarClass = ' show';
            break;
            case 'flyaway':
                universe = ' hide';
                groundClass = ' remain-sink';
                rocketElClass = ' flyaway';
                rocketClass = ' fire blur';
                flyingStarClass = ' show';
            break;
            default:
                
        }


        return (
            <div className="animted-section">
                <div className="section-area">
                    <div className={'bg-universe ' + universe}>
                        <canvas id="universe" ref="universe"></canvas>
                    </div>
                    <div className={'flying-star  ' + flyingStarClass}>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className={'ground ' + groundClass}>
                        <div className={'launcher ' + launcherClass}></div>
                        {/* <div className="launchpad"></div> */}
                    </div>
                    <div className={'rocket-element ' + rocketElClass}>
                        <div className={'rocket' + rocketClass}></div>
                    </div>
                </div>
            </div>
        )
    }
}
