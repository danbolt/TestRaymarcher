let Gameplay = function () {
    this.filterTargetImage = null;
    this.filter = null;
};
Gameplay.prototype.preload = function () {
    this.game.load.shader('march', 'shader/hg_sdf.glsl');
};
Gameplay.prototype.create = function () {
    let filterUniforms = {
	camera: { type: 'mat4', value: mat4.create() },
	sphereTransform: { type: 'mat4', value: mat4.create() },
	sphereRadius: { type: '1f', value: 32 },
	lightTransform: { type: 'mat4', value: mat4.create() },
	lightStrength: { type: '4fv', value: vec4.fromValues(1, 1, 1, 1) }
    };
    this.filter = new Phaser.Filter(this.game, filterUniforms, this.game.cache.getShader('march'));

    this.filterTargetImage = this.game.add.sprite(0, 0);
    this.filterTargetImage.width = this.game.width;
    this.filterTargetImage.height = this.game.height;
    this.filterTargetImage.filters = [ this.filter ];

    mat4.translate(this.filter.uniforms.camera.value, this.filter.uniforms.camera.value, vec3.fromValues(-60, -30, -100));
    mat4.translate(this.filter.uniforms.lightTransform.value, this.filter.uniforms.lightTransform.value, vec3.fromValues(100, 100, -100));
    mat4.translate(this.filter.uniforms.sphereTransform.value, this.filter.uniforms.sphereTransform.value, vec3.fromValues(0.5, 0.5, 0.1));
    this.filter.uniforms.lightStrength.value = vec4.fromValues(0.5, 0.5, 0.5, 1.0);
    this.filter.update();
};
Gameplay.prototype.update = function () {
    this.filter.uniforms.camera.value = mat4.create();
    mat4.translate(this.filter.uniforms.camera.value, this.filter.uniforms.camera.value, vec3.fromValues(0, 0, -100));
    this.filter.update();
};

let main = function () {
    let game = new Phaser.Game(320, 240, Phaser.WEBGL);

    game.state.add('Gameplay', Gameplay, false);
    game.state.start('Gameplay');
};

