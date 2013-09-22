$(document).ready(function() {
	'use strict';
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@  Scene Renderer for Minecraft Overviewer  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	// GLOBALS
	var mapContainer  = document.getElementById('MapContainer');
	var TEXTURE_PATH   = 'minecraft/textures/blocks/';
	var textureCache_ = {};
	var blockCache_   = {};
	var queryParameters = queryObj();

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	// set the scene size
	var WIDTH = 800,
	HEIGHT = 600;

	// set some camera attributes
	var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

	var renderer = Detector.webgl ? 
			new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	// Set up the controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	//controls.noZoom = true;
	controls.autoRotateSpeed = -2;
	controls.noKeys = true;
	controls.noPan = true;

	var scene = new THREE.Scene();
	scene.add(camera);

	camera.position.z = 5;

	renderer.setSize(WIDTH, HEIGHT);
	mapContainer.appendChild(renderer.domElement);

	// create a point light
	var pointLight = new THREE.PointLight(0xcccccc);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

	// create some ambient light
	var ambientLight = new THREE.AmbientLight(0xcccccc);
	scene.add(ambientLight);

	
	if ('test' in queryParameters) {
		loadTestMap(function(data) {
			var block;
			var dataSize = data.length / 2;
			var dataSizeHalf = Math.floor(dataSize / 2);
			for (var z = 0; z < dataSizeHalf; z++) {
				var zSlice = data[z];
				for (var y = 0; y < dataSizeHalf; y++) {
					var ySlice = zSlice[y];
					for (var x = 0; x < dataSizeHalf; x++) {
						//console.log('index: ' + x + ' ' + y + ' ' + z);
						block = getBlock(ySlice[x]);

						if (!Blocks[ySlice[x]])
							console.log('unknown block id: ' + ySlice[x] + ', using diamond_block');
						//console.log('checking for block id: ' + ySlice[x])
						if (block) {
							//console.log('adding a block: ' + Blocks[ySlice[x].toString()])
							block.position.x = x - dataSizeHalf;
							block.position.y = y - dataSizeHalf;
							block.position.z = z - dataSizeHalf;
							scene.add(block);
							//renderer.render(scene, camera);
						}
					}
				}
			}

		});
	}
	else {
		var surface = getSurface('stone_slab_top.png');
		scene.add(surface);
		var cube = getBlock('diamond_block.png');
		//var cube = new THREE.Mesh(new THREE.CubeGeometry(2, .5, 1), getTexture('bed_head_top.png'));
		scene.add(cube);

		var blockviewer = new BlockViewer(document.getElementById('BlockImages'), function(url) {
				scene.remove(cube);
				cube = getBlock(url);
				scene.add(cube);
			}, function(url) {
				scene.remove(surface);
				surface = getSurface(url);
				scene.add(surface);
				// replace the floor with the selected texture
		});
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@  The Rendering Loop  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	function render() {
		requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
	}
	render();

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@  Block Helper Functions  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	function getTexture(texture, callback) {
		var tex = null;
		if (texture in textureCache_)
			return textureCache_[texture];

		tex = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture(TEXTURE_PATH + texture)
		});
		tex.map.minFilter = THREE.NearestFilter;
		tex.map.magFilter = THREE.NearestFilter;

		textureCache_[texture] = tex;
		return tex;
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	function getSurface(texture_path) {
		var texture = getTexture(texture_path);
		texture.map.wrapS = texture.map.wrapT = THREE.RepeatWrapping;
		texture.map.repeat.set(10, 10);
		texture.map.offset.x = .5;
		texture.map.offset.y = .5;
		var surface = new THREE.Mesh(new THREE.CircleGeometry(5, 15), texture);
		surface.rotation.x = -Math.PI/2;
		surface.position.y = -.5;
		return surface;
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	function getBlock(blockId, callback) {

		//var block_name = blocks[blockId];
		var block_name = blockId;
		if (block_name === 'air')
			return null;

		if (block_name === null || block_name === undefined)
			block_name = 'diamond_block.png';

		if (block_name instanceof Array)
			block_name = 'diamond_block.png';

		if (block_name in blockCache_) // if we have already made this block, clone it
			return blockCache_[block_name].clone();

		var block = null;
		var textures = [];
		var toLoad = block_name instanceof Array ? block_name.length : 1;

		var textureCallback = function(texture) {
			textures.push(texture);
			toLoad--;
			if (!toLoad) {
				var block = block_name.construct(textures);
				callback(block);
			}
		}


		var tex;
		if (block_name === 'grass') {
			var tex_top = getTexture('grass_top.png');
			var tex_side = getTexture('grass_side.png');
			var tex_bottom = getTexture('dirt.png');
			var materials = [tex_side, tex_side, tex_top, tex_bottom, tex_side, tex_side];
			tex = new THREE.MeshFaceMaterial(materials);
		}
		else
			tex = getTexture(block_name);
		// only need to do this for blocks whose sides are different
		//var materials = [tex, tex, tex, tex, tex, tex];

		// create a new mesh with CubeGeometry
		block = new THREE.Mesh(
				new THREE.CubeGeometry(1, 1, 1),
				tex
		);
		block.overdraw = true;
		blockCache_[block_name] = block;
		return block;
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	function loadTestMap(callback) {
		var request = new XMLHttpRequest();
		request.open('GET', 'testMap.json', true);
		request.onload = function() {
			if (request.status === 200) {
				var data = JSON.parse(request.response);
				callback(data);
			}
		};
		request.send()
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@  3D Helper Functions  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	// Rotate an object around an arbitrary axis in world space       
	function rotateAroundWorldAxis(object, ax, radians, update) {
		var axis = {
			x: new THREE.Vector3(1,0,0),
			y: new THREE.Vector3(0,1,0),
			z: new THREE.Vector3(0,0,1)
		};
		var vectorAxis = axis[ax];
		var rotWorldMatrix = new THREE.Matrix4();
		rotWorldMatrix.makeRotationAxis(vectorAxis.normalize(), radians);
		if (update)
			rotWorldMatrix.multiply(object.matrix);
		object.matrix = rotWorldMatrix;
		object.rotation.setFromRotationMatrix(object.matrix);
	}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@  Helper Functions  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	// returns a dictionary of query parameters
	function queryObj() {
		var result = {}, keyValuePairs = location.search.slice(1).split('&');

		keyValuePairs.forEach(function(keyValuePair) {
			keyValuePair = keyValuePair.split('=');
			result[keyValuePair[0]] = keyValuePair[1] || '';
		});

		return result;
	}

});
