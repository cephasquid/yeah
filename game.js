var game = new Phaser.Game(800, 600, Phaser.AUTO, 'runner', { preload: preload, create: create, update: update, render: render });

function preload() {


    game.load.image('tile', 'assets/re-square.png');
    game.load.image('player', 'assets/gree-square.png');

}

var player;

var blockArray = [];
var blockSpriteArray = [];

var speed = 1;
var gravity = 10;

var sectionSize = 50;
var currentSection = 0;
var score = 0;
var blockSize = 10;
var upKey;
var isJumping = false;
var ground = 500;
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(40, game.world.centerY, 'player');
    player.anchor.set(0.5);

    game.world.setBounds(0, 0, 2000, 2000);
    game.physics.enable(player, Phaser.Physics.ARCADE);


    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    for(i=0;i<10;i++) {
        blockArray[i] = generateBlock();
        generateSection(blockArray[i],i);

    }

}

function hitSprite(sprite1, sprite2) {
    if(sprite1 == player)
        end();
}

function end() {
    console.log("end");
}
function update () {


    blockSpriteArray.forEach(function(sprite) {
        sprite.x -= speed;
        game.physics.arcade.collide(player, sprite, hitSprite, null, this);

    });
    if(player.y  < ground) {
        player.y += gravity;
        isJumping = true;
    }
    else {
        isJumping = false;
    }

    if(player.x > blockSpriteArray[currentSection].x) {
        currentSection++;
        score++;
        blockArray.push(generateBlock());
        generateSection(blockArray[blockArray.length-1],blockArray.length-1);
    }

    if(upKey.isDown) {
        jump(1);
    }
}

function render () {

    game.debug.inputInfo(32, 32);

}

function generateBlock() {
    var random = Math.random() * 3 ;
    return random;
}
function generateSection(random,section) {

    var sprite = game.add.sprite(section * sectionSize,  ground-random * blockSize,'tile');
    game.physics.enable(sprite, Phaser.Physics.ARCADE)
    blockSpriteArray.push(sprite);
}

function jump(level) {
    if(isJumping) return;
    player.y -= 40 * level;

}