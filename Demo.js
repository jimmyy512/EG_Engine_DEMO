var footBG;
var EG;
const const_g=1;   //重力加速度
const const_u=0.6; //能耗係數
var ArrowAS={
    arrowWay:true,
    arrowY:130,
    arrowShow:true,
};
var ball={
    x:336,
    y:100,
    Vx:0,
    Vy:0,
    constMaxY:200,
    constMinY:0,
};
HandAS={
    isStart:false,
    isChangeImage:false,
    isResetDone:false,
    isWordStartAction:false,
    isEnd:false,
    speedY:5,
    ReInit:function(){
        this.isStart=false;
        this.isChangeImage=false;
        this.isResetDone=false;
        this.isWordStartAction=false;
        this.isEnd=false;
        this.speedY=5;
    }
};
ShootDoorAS={
    isStart:false,
    speedY:-1.5,
    speedX:-2.1,
    degreesSpeed:1,
    minY:100,
    middleY:240,
    ReInit:function(){
        this.isStart=false;
        this.speedY=-1.5;
        this.speedX=-2.1;
        this.degreesSpeed=1;
        this.minY=100;
        this.middleY=240;
    }
};
var card1;
var card2;
var arrow1;
var arrow2;
var soccerPlatform;
var soccer;
var soccerShadow;
var hand;
var soccer2;
var CountSprite;
var bottomLabel;
var isWordStartAction=false;
var isShowBottomLabel=false;

window.onload=()=>{
    EG=new Director(60,750,390,'canvasID',updateFunction,window);
    footBG=new Sprite("image/bg_game.png",0,0,750,390,EG.Canvas);
    card1=new Sprite("image/poker_back.png",160,170,66,87,EG.Canvas);
    card2=new Sprite("image/poker_back.png",520,170,66,87,EG.Canvas);
    arrow1=new Sprite("image/arrow_prompt.png",177,this.ArrowAS.arrowY,32,28,EG.Canvas);
    arrow2=new Sprite("image/arrow_prompt.png",537,this.ArrowAS.arrowY,32,28,EG.Canvas);
    soccerPlatform=new Sprite("image/soccer_pedestal.png",336,255,74,36,EG.Canvas);
    soccer=new Sprite("image/soccer.png",336,this.ball.y,74,70,EG.Canvas);
    soccerShadow=new Sprite("image/soccer_shadow.png",373,264,74,11,EG.Canvas);
    soccerShadow.setAnchorPoint(0.5,0.5);
    soccerShadow.setScale(0.5);
    hand=new Sprite("image/countdown_hand_1.png",0,0,383,322,EG.Canvas);
    soccer2=new Sprite("image/soccer.png",100,300,74,70,EG.Canvas);
    CountSprite=new Sprite("image/countdown_num_5.png",490,205,60,60,EG.Canvas);
    CountSprite.setAnchorPoint(0.5,0.5);
    hand.setPosition(EG.visible.width-hand.getOriginWidth(),
                             hand.getOriginHeight());
    bottomLabel=new Label("Majitoo",300,380,"Arial",40,"White",EG.Canvas);

    EG.addIntervalEvent("ArrowEvent",2,()=>
    {
        ArrowAS.arrowShow=!ArrowAS.arrowShow;
    });
}

var updateFunction=function(timestamp)
{
    if(document.getElementById('canvasID')!=null)
    {
        new Image().src = 'image/basket.png';
        new Image().src = 'image/countdown_hand_1.png';
        new Image().src = 'image/countdown_hand_2.png';
        new Image().src = 'image/countdown_num_5.png';
        new Image().src = 'image/countdown_num_4.png';
        new Image().src = 'image/countdown_num_3.png';
        new Image().src = 'image/countdown_num_2.png';
        new Image().src = 'image/countdown_num_1.png';

        // //arrow
        doArrowAnimation();

        // //soccer
        processSoccerPhysics();

        // //soccer shadow
        processSoccerShadow();

        // //handAnimation
        if(HandAS.isStart)
            doHandAnimation();

        // //shoot door Animation
        if(ShootDoorAS.isStart)
            doShootDoorAnimation(timestamp);
       
        // //add to Canvas
        if(isShowBottomLabel)
            EG.addChild(bottomLabel,10);
        EG.addChild(soccer2,2);
        EG.addChild(footBG,0);
        EG.addChild(card1,3);
        EG.addChild(card2,3);
        if(ArrowAS.arrowShow)
            EG.addChild(arrow1,4);
        else
            EG.addChild(arrow2,4);
        EG.addChild(soccerPlatform,1);
        EG.addChild(soccer,3);
        EG.addChild(soccerShadow,2);
    }
};

var doArrowAnimation=function()
{
    if(ArrowAS.arrowWay)
    {
        ArrowAS.arrowY+=0.5;
        ArrowAS.arrowWay=(ArrowAS.arrowY>140) ? false : true;
        arrow1.y=ArrowAS.arrowY;
        arrow2.y=ArrowAS.arrowY;
    }
    else
    {
        ArrowAS.arrowY-=0.5;
        ArrowAS.arrowWay=(ArrowAS.arrowY<130) ? true : false;
        arrow1.y=ArrowAS.arrowY;
        arrow2.y=ArrowAS.arrowY;
    }
}

var processSoccerPhysics=function()
{
    if(ball.Vy==0 && ball.y>=ball.constMaxY-5)
        ball.Vy=0;
    else
        ball.Vy+=const_g;
    ball.y+=ball.Vy;
    if(ball.y>ball.constMaxY)
    {
        ball.y=ball.constMaxY;
        ball.Vy=-Math.ceil(ball.Vy*const_u);
    }
    soccer.y=ball.y;
}

var processSoccerShadow=function()
{
    let scale=1.0;
    let delta=ball.y-ball.constMinY;
    scale=delta*0.0055;
    if(scale>1)
        scale=1.0;
    if(scale<0.6)
        scale=0.6;
    soccerShadow.setScale(scale);
}

var ShootBallClick=function(){
    ball.Vy-=15;
}

var ShootDoorClick=function()
{
    ShootDoorAS.isStart=true;
    ShootDoorAS.degreesSpeed=0;
}

var Soccer2RestartClick=function()
{
    let originPos=soccer2.getOriginPosition();
    soccer2.x=originPos[0];
    soccer2.y=originPos[1];
    soccer2.degress=0;
}

var HandAnimationClick=function()
{
    HandAS.isStart=true;
}

var testCallBackClick=function()
{
    EG.addEvent("test1",2,
    ()=>{
        soccer.setImage("image/basket.png");
        isShowBottomLabel=true;
        EG.addEvent("test2",2,
        ()=>{
            bottomLabel.Color="Orange";
            EG.addEvent("test3",2,
            ()=>{
                soccer.setImage("image/soccer.png");
                bottomLabel.Color="White";
                isShowBottomLabel=false;
            });
        });
    });
}

var doShootDoorAnimation=function(timestamp)
{
    let time=parseInt(timestamp/10);
    if(time%2==0)
    {
        ShootDoorAS.speedY-=0.1;
        ShootDoorAS.speedX+=0.15;
    }
    if(soccer2.y<ShootDoorAS.minY)
    {//動畫結束
        ShootDoorAS.ReInit();
        return;
    }
    soccer2.y+=ShootDoorAS.speedY;
    soccer2.x+=ShootDoorAS.speedX;
    ShootDoorAS.degreesSpeed+=5;
    soccer2.setRotation(ShootDoorAS.degreesSpeed);
};

var doHandAnimation=function()
{
    let minY=EG.visible.height-hand.getOriginHeight();
    if(hand.y>=minY && !HandAS.isEnd)
        hand.y-=HandAS.speedY;
    else if(HandAS.isEnd)
    {
        let maxY=EG.visible.height+hand.getOriginHeight()/2;
        if(hand.y<=maxY)
            hand.y+=HandAS.speedY;
        else
            HandAS.ReInit();
    }
    else
    {
        if(!HandAS.isChangeImage)
        {
            hand.setImage("image/countdown_hand_2.png");
            EG.addEvent("changeHand",0.5,()=>{
                hand.ResetImage();
                HandAS.isResetDone=true;
            })
            HandAS.isChangeImage=true;
        }
        else if(HandAS.isResetDone && !isWordStartAction)
        {
            CountSprite.runAction("CountDown",[
            {
                path:"image/countdown_num_4.png",
                interval:1,
            },
            {
                path:"image/countdown_num_3.png",
                interval:1,
            },
            {
                path:"image/countdown_num_2.png",
                interval:1,
            },
            {
                path:"image/countdown_num_1.png",
                interval:1,
            }],EG)
            EG.addEvent("WordAction",5,()=>{
                isWordStartAction=false;
                CountSprite.ResetImage();
                HandAS.isEnd=true;
            });
            isWordStartAction=true;
        }
    }
    EG.addChild(hand,10);
    if(isWordStartAction)
        EG.addChild(CountSprite,20);
};