function ViewBase(width, height) {
	this.width = width;
	this.height = height;
	this.angle = 45;
	this.aspect = this.width / this.height;
	this.renderer = Detector.webgl ?
			new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

	this.camera = new THREE.PerspectiveCamera(this.angle, this.aspect, 0.1, 1000);
	this.scene = new THREE.Scene();
	this.scene.add(this.camera);
	this.camera.position.z = 5;
	this.renderer.setSize(this.width, this.height);

	var pointLight = new THREE.PointLight(0xcccccc);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	this.pointLight = pointLight;

	this.scene.add(this.pointLight);

	this.ambientLight = new THREE.AmbientLight(0xcccccc);
	scene.add(this.ambientLight);

	this.domElement = this.renderer.domElement;
}

ViewBase.prototype = {

};
