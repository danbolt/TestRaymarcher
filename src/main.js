let Gameplay = function () {
    this.filterTargetImage = null;
    this.filter = null;

    this.cameraMatrix = mat4.create();
};
Gameplay.prototype.preload = function () {
    this.game.load.shader('march', 'shader/hg_sdf.glsl');
};
Gameplay.prototype.create = function () {
    this.filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('march'));

    this.filterTargetImage = this.game.add.sprite(0, 0);
    this.filterTargetImage.width = this.game.width;
    this.filterTargetImage.height = this.game.height;
    this.filterTargetImage.filters = [ this.filter ];
};
Gameplay.prototype.update = function () {
    //
};

let main = function () {
    let game = new Phaser.Game(320, 240, Phaser.WEBGL);

    game.state.add('Gameplay', Gameplay, false);
    game.state.start('Gameplay');
};

