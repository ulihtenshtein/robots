
//FightCode can only understand your robot
//if its class is called Robot
var Robot = function(robot) {
    robot.clone();
    Robot.doner = DefaultDoner.getInstance();
    Robot.sdoner = DefaultOnScannedRobotDoner.getInstance();
   
};
Robot.to = 0;
Robot.toClone = 1;


Robot.prototype.onIdle = function(ev) {
  Robot.doner.doIt(ev);
};

Robot.prototype.onScannedRobot = function(ev) {
  var robot = ev.robot;
  
  if( (ev.scannedRobot.parentId == robot.id) || 
     (ev.scannedRobot.id == robot.parentId) ) {
    return;
  };
  checkOnScanned(ev);
  Robot.sdoner.doIt(ev);
   
};

Robot.prototype.onHitByBullet = function(ev) {
  var robot = ev.robot;
  //alert(ev.bearing);
  robot.disappear();
  
  //robot.rotateCannon(ev.bearing);
  robot.fire();
};

Robot.prototype.onWallCollision = function(ev) {
  var  r = ev.robot;

  if( r.parentId == null ) {
      Robot.to = Robot.to < 3 ? Robot.to + 1 : 0; 
  } else {
    Robot.toClone = Robot.toClone < 3 ? Robot.toClone + 1 : 0; 
  };

  robot.trun(ev.bearing +15);
};

Robot.prototype.onRobotCollision = function(ev) {
  var r = ev.robot;

  if( r.parentId == null ) {
      Robot.to = Robot.to < 3 ? Robot.to + 1 : 0; 
  } else {
    Robot.toClone = Robot.toClone < 3 ? Robot.toClone + 1 : 0; 
  };

  r.trun(ev.bearing + 20);
};

//default strategy.....................................
function DefaultDoner() {
 this.doIt = function(ev) {
   var r = ev.robot;
  var  amount = 100 + Math.random()*50;
  var who =  r.parentId ? Robot.toClone : Robot.to;
  switch( who ) {
    case 0 :
       toUp(amount);
       break;
    case 1:
       toRight(amount);
       break;
    case 2:
       toDown(amount);
       break;
    case 3:
       toLeft(amount);
      break;
    default: 
  };

   r.rotateCannon(45);
   r.rotateCannon(-90);
   r.rotateCannon(45);

   var direct = Math.random()*4^0;
   r.parentId ? Robot.toClone = direct : Robot.to = direct;
   // r.parentId && Robot.to = direct || Robot.toClone = direct;
   //Robot.to = direct;//Robot.to < 3 ? Robot.to + 1 : 0
 };
};

DefaultDoner.getInstance = function () {
  if ( DefaultDoner.obj === undefined ) {
    DefaultDoner.obj = new DefaultDoner();
  };
     return DefaultDoner.obj;
 };

//default on scannedRobot .................
function  DefaultOnScannedRobotDoner() {

   this.doIt = function(ev) {
   var cln = 1;
   var cln = robot.parentId ? 1 : -1;
  
    robot.rotateCannon(cln*2);
    robot.fire();
    robot.ahead(cln*10);
    robot.turn(cln*15);
    robot.rotateCannon(cln*(-20));
 };
};

DefaultOnScannedRobotDoner.getInstance = function() {
  if( DefaultOnScannedRobotDoner.obj === undefined ) {
    DefaultOnScannedRobotDoner.obj = new DefaultOnScannedRobotDoner();
  };
    return DefaultOnScannedRobotDoner.obj;
};


function checkOnScanned(ev) {
};
function logObj(obj, robot) {
  for( var keys in obj) {
    robot.log( '' + keys + ':' + obj[keys] +'\n');
  };
};
function toLeft(amount) {
  var ev = Robot.ev;
  var r = ev.robot;
  r.turn(270-r.angle);
  r.ahead(amount);
};
function toRight(amount) {
  var ev = Robot.ev;
  var r = ev.robot;
  r.turn(90-r.angle);
  r.ahead(amount);
};
function toDown(amount) {
  var ev = Robot.ev;
  var r = ev.robot;
  r.turn(180-r.angle);
  r.ahead(amount);
};
function toUp(amount) {
  var ev = Robot.ev;
  var r = ev.robot;
  r.turn(-r.angle);
  r.ahead(amount);
};
function logPos(robot) {
   robot.log('(' + robot.position.x + ',' + robot.position.y + ')');
};

