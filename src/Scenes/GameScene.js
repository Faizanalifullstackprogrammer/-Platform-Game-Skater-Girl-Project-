import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('Game');
  }

  preload(){
    //load image
    // this.load.image('logo', 'assets/skater-girl1.png')
  }

  create(){
    // ground speed
    this.gameSpeed = 10;

    // Create a Ground
    const {height, width } = this.game.config;

    this.ground = this.add.tileSprite(0, height, width, 126, 'ground-road').setOrigin(0,1);
    this.skater_girl = this.physics.add.sprite(-90, 120, 'skater-girl-jump-3')
    .setOrigin(0,3)
    .setScale(0.2)
    .setBodySize(300, 1550, false)
    .setDepth(1)
    .setCollideWorldBounds(true)
    .setGravityY(5000);
    
    console.log(this.skater_girl);

    this.obsticles = this.physics.add.group();
    this.initAnims();
    this.handleInput();
  }

  initAnims() {
    this.anims.create({
      key: 'girl-run',
      frames: [
        {key: 'skater-girl-roll-0'},
        {key: 'skater-girl-roll-1'},
        {key: 'skater-girl-roll-2'},
        {key: 'skater-girl-roll-3'},
        {key: 'skater-girl-roll-4'},
        {key: 'skater-girl-roll-5'},
        {key: 'skater-girl-roll-6'},
        {key: 'skater-girl-roll-7'},
        {key: 'skater-girl-roll-8'},
        {key: 'skater-girl-roll-9'},
        {key: 'skater-girl-roll-10'},
        {key: 'skater-girl-roll-11'},
        {key: 'skater-girl-roll-12'},
        {key: 'skater-girl-roll-13'},
        {key: 'skater-girl-roll-14'},
        {key: 'skater-girl-roll-15'},
        {key: 'skater-girl-roll-16'},
        {key: 'skater-girl-roll-17'},
        {key: 'skater-girl-roll-18'},
      ],
      frameRate: 36,    
      repeat: -1
    });

    // Jump
    this.anims.create({
      key: 'girl-jump',
      frames: [
        {key: 'skater-girl-jump-0'},
        {key: 'skater-girl-jump-1'},
        {key: 'skater-girl-jump-2'},
        {key: 'skater-girl-jump-3'},
        {key: 'skater-girl-jump-4'},
        {key: 'skater-girl-jump-5'},
        {key: 'skater-girl-jump-6'},
        {key: 'skater-girl-jump-7'},
        {key: 'skater-girl-jump-8'},
        {key: 'skater-girl-jump-9'},
        {key: 'skater-girl-jump-10'},
        {key: 'skater-girl-jump-11'},
      ],
      frameRate: 25,
      repeat: -1
    });


  }

  handleInput() {
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.skater_girl.body.onFloor() || this.skater_girl.body.velocity.x > 0){
        return;
      }

      this.skater_girl.body.height = 244;
      this.skater_girl.body.offset.y = 0;

      this.skater_girl.setVelocityY(-1600);
      this.skater_girl.setTexture('skater-girl-jump-3', 0);
    })
  }

  // 60 fps
  update() {
    this.ground.tilePositionX += this.gameSpeed;

    if(this.skater_girl.body.deltaAbsY() > 0) {
      this.skater_girl.play('girl-jump', true);
    } else {
      this.skater_girl.play('girl-run', true);
    }
  }
};