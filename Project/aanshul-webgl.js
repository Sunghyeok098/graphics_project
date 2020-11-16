var count_shapes = 10;
var count_obstacles = 1;
var count_type_obstacles = 2;
var colour = 1;
var lastFrames = -1;
var changeLighting = 0;
var periodicRandom = 0;
var oscillation = 0;
var grayscale = 0; 

var max_level = 3;
var level = 1;

var jump = 0;
var pause = 1;
var score = 0;
var frames = 0;
var gravity = -1;
var current_rotation = 0;
var halfAngle = Math.PI/8;

// source initialization

var ambient_factor = 5;
var source_diffuse_color = [1.0, 1.0, 1.0];
var source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
var source_specular_color = [1.0, 1.0, 1.0];
var source_rotation = 0;
var source_position = [0.0, 0.5, -1.0];

var camera = {};
camera['camera_position'] = [0.0, 0.0, 0.0];
camera['camera_target'] = [0.0, 0.0, -1.0];
camera['camera_up'] = [0.0, 1.0, 0.0];

var shaderProgram;
var programInfo;

function hoverMouse(event){
    // console.log(event.clientX);
    // console.log(event.clientY);
    var X = event.clientX;
    var Y = event.clientY;

    var this_X = (Math.max(X, 60) < 700) ? Math.max(X, 60) : 700;
    

    var this_Y = (Math.max(Y, 23) < 503) ? Math.max(Y, 23) : 503;    
    var curr_Y = (this_Y - 23.0)/480.0;
    var phi = (0.5 - curr_Y) * Math.PI;

    var curr_X = (this_X - 60.0)/640.0;
    var theta = (1.5 - 2*curr_X) * Math.PI;

    if(Math.sin(theta) * Math.cos(phi) >0)
    {
   		camera['camera_target'] = [Math.cos(theta) * Math.cos(phi), Math.sin(phi), -Math.sin(theta) * Math.cos(phi)];
    	camera['camera_up'] = [0, Math.cos(phi), Math.sin(phi)];
    }
}

function create_octagon0(){
	dict = {};
	dict['position'] = [0, 0.25, 0];
	dict['radius'] = 1/Math.cos(halfAngle);
	dict['positions'] = [
      // Right face
      1.0, Math.tan(halfAngle), 1.0,
      1.0, Math.tan(halfAngle), -1.0,
      1.0, Math.tan(-halfAngle), -1.0,
      1.0, Math.tan(-halfAngle), 1.0,

      // Top Right face
      Math.tan(halfAngle), 1.0, 1.0,
      Math.tan(halfAngle), 1.0, -1.0,
      1.0, Math.tan(halfAngle), -1.0,
      1.0, Math.tan(halfAngle), 1.0,     

      // Top faces
      -Math.tan(halfAngle), 1.0, 1.0,
      -Math.tan(halfAngle), 1.0, -1.0,
      Math.tan(halfAngle), 1.0, -1.0,
      Math.tan(halfAngle), 1.0, 1.0,

      // Top Left face
      -1.0, Math.tan(halfAngle), 1.0,
      -1.0, Math.tan(halfAngle), -1.0,
      -Math.tan(halfAngle), 1.0, -1.0,
      -Math.tan(halfAngle), 1.0, 1.0,

      // Left fact
      -1.0, Math.tan(halfAngle), 1.0,
      -1.0, Math.tan(halfAngle), -1.0,
      -1.0, Math.tan(-halfAngle), -1.0,
      -1.0, Math.tan(-halfAngle), 1.0,

      // Bottom Left face
      -Math.tan(halfAngle), -1.0, 1.0,
      -Math.tan(halfAngle), -1.0, -1.0,
      -1.0, -Math.tan(halfAngle), -1.0,
      -1.0, -Math.tan(halfAngle), 1.0,

      // Bottom faces
      Math.tan(halfAngle), -1.0, 1.0,
      Math.tan(halfAngle), -1.0, -1.0,
      -Math.tan(halfAngle), -1.0, -1.0,
      -Math.tan(halfAngle), -1.0, 1.0,

      // Bottom Right face
      1.0, -Math.tan(halfAngle), 1.0,
      1.0, -Math.tan(halfAngle), -1.0,
      Math.tan(halfAngle), -1.0, -1.0,
      Math.tan(halfAngle), -1.0, 1.0,

      
    ];

    dict['normals'] = [
	  // Right face
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,

      // Top Right face
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,

      // Top faces
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,

      // Top Left face
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,

      // Left fact
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,

      // Bottom Left face
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,

      // Bottom faces
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,

      // Bottom Right face
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
    ];

    dict['textureCoordinates'] = [
	    // Front
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Back
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Top
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Bottom
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Right
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	];

    if(level<=1 || grayscale)
    {
	    dict['faceColors'] = [
	      [1.0,  1.0,  1.0,  1.0],    // Top face: white
	      [0.0,  0.0,  0.0,  1.0],    // Top Left Right face: black
	      [1.0,  1.0,  1.0,  1.0],    // Left face: white
	      [0.0,  0.0,  0.0,  1.0],    // Bottom Left face: black
	      [1.0,  1.0,  1.0,  1.0],    // Bottom face: white
	      [0.0,  0.0,  0.0,  1.0],    // Bottom Right face: black
	      [1.0,  1.0,  1.0,  1.0],    // Right face: white
	      [0.0,  0.0,  0.0,  1.0],    // Top Right face: black
	    ];
	}
	else
	{
    	dict['faceColors'] = [
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top Left Right face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Left face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom Left face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom Right face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Right face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top Right face: black
	    ];		
	}
    dict['indices'] = [
      0,  1,  2,      0,  2,  3,    // right
      4,  5,  6,      4,  6,  7,    // right top
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // top left
      16, 17, 18,     16, 18, 19,   // left
      20, 21, 22,     20, 22, 23,   // bottom left
      24, 25, 26,     24, 26, 27,   // bottom
      28, 29, 30,     28, 30, 31,   // bottom right
    ];
    dict['rotationX'] = 0;
    dict['rotationY'] = 0;
    dict['rotationZ'] = 0;
    dict['speed'] = 7;
    dict['numComponentsPosition'] = 3;
    dict['numComponentsColor'] = 4;
    dict['vertexCount'] = 48;
    dict['rotation'] = 0.05;
    dict['category'] = 0;
    
    return dict;
}

var speed_level = [0, 2, 4];

function create_octagon1(){
	dict = {};
	dict['position'] = [0, 0.25, 0];
	dict['radius'] = 1/Math.cos(halfAngle);
	dict['positions'] = [
      // Right face
      1.0, Math.tan(halfAngle), 1.0,
      1.0, Math.tan(halfAngle), -1.0,
      1.0, Math.tan(-halfAngle), -1.0,
      1.0, Math.tan(-halfAngle), 1.0,

      // Top Right face
      Math.tan(halfAngle), 1.0, 1.0,
      Math.tan(halfAngle), 1.0, -1.0,
      1.0, Math.tan(halfAngle), -1.0,
      1.0, Math.tan(halfAngle), 1.0,     

      // Top faces
      -Math.tan(halfAngle), 1.0, 1.0,
      -Math.tan(halfAngle), 1.0, -1.0,
      Math.tan(halfAngle), 1.0, -1.0,
      Math.tan(halfAngle), 1.0, 1.0,

      // Top Left face
      -1.0, Math.tan(halfAngle), 1.0,
      -1.0, Math.tan(halfAngle), -1.0,
      -Math.tan(halfAngle), 1.0, -1.0,
      -Math.tan(halfAngle), 1.0, 1.0,

      // Left fact
      -1.0, Math.tan(halfAngle), 1.0,
      -1.0, Math.tan(halfAngle), -1.0,
      -1.0, Math.tan(-halfAngle), -1.0,
      -1.0, Math.tan(-halfAngle), 1.0,

      // Bottom Left face
      -Math.tan(halfAngle), -1.0, 1.0,
      -Math.tan(halfAngle), -1.0, -1.0,
      -1.0, -Math.tan(halfAngle), -1.0,
      -1.0, -Math.tan(halfAngle), 1.0,

      // Bottom faces
      Math.tan(halfAngle), -1.0, 1.0,
      Math.tan(halfAngle), -1.0, -1.0,
      -Math.tan(halfAngle), -1.0, -1.0,
      -Math.tan(halfAngle), -1.0, 1.0,

      // Bottom Right face
      1.0, -Math.tan(halfAngle), 1.0,
      1.0, -Math.tan(halfAngle), -1.0,
      Math.tan(halfAngle), -1.0, -1.0,
      Math.tan(halfAngle), -1.0, 1.0,

      
    ];

    dict['normals'] = [
	  // Right face
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,
      Math.cos(Math.PI + 0*Math.PI/4), Math.sin(Math.PI + 0*Math.PI/4), 0,

      // Top Right face
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,
      Math.cos(Math.PI + 1*Math.PI/4), Math.sin(Math.PI + 1*Math.PI/4), 0,

      // Top faces
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,
      Math.cos(Math.PI + 2*Math.PI/4), Math.sin(Math.PI + 2*Math.PI/4), 0,

      // Top Left face
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,
      Math.cos(Math.PI + 3*Math.PI/4), Math.sin(Math.PI + 3*Math.PI/4), 0,

      // Left fact
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,
      Math.cos(Math.PI + 4*Math.PI/4), Math.sin(Math.PI + 4*Math.PI/4), 0,

      // Bottom Left face
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,
      Math.cos(Math.PI + 5*Math.PI/4), Math.sin(Math.PI + 5*Math.PI/4), 0,

      // Bottom faces
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,
      Math.cos(Math.PI + 6*Math.PI/4), Math.sin(Math.PI + 6*Math.PI/4), 0,

      // Bottom Right face
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
      Math.cos(Math.PI + 7*Math.PI/4), Math.sin(Math.PI + 7*Math.PI/4), 0,
    ];

    dict['textureCoordinates'] = [
	    // Front
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Back
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Top
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Bottom
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Right
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	];

    if(level<=1 || grayscale)
    {
    	dict['faceColors'] = [
	      [0.0,  0.0,  0.0,  1.0],    // Right face: white
	      [1.0,  1.0,  1.0,  1.0],    // Top Right face: black
	      [0.0,  0.0,  0.0,  1.0],    // Top face: white
	      [1.0,  1.0,  1.0,  1.0],    // Top Left Right face: black
	      [0.0,  0.0,  0.0,  1.0],    // Left face: white
	      [1.0,  1.0,  1.0,  1.0],    // Bottom Left face: black
	      [0.0,  0.0,  0.0,  1.0],    // Bottom face: white
	      [1.0,  1.0,  1.0,  1.0],    // Bottom Right face: black
	    ];
	}
	else
	{
    	dict['faceColors'] = [
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top Left Right face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Left face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom Left face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Bottom Right face: black
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Right face: white
	      [Math.random(),  Math.random(),  Math.random(),  1.0],    // Top Right face: black
	    ];		
	}

    dict['indices'] = [
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // top left
      16, 17, 18,     16, 18, 19,   // left
      20, 21, 22,     20, 22, 23,   // bottom left
      24, 25, 26,     24, 26, 27,   // bottom
      28, 29, 30,     28, 30, 31,   // bottom right
      0,  1,  2,      0,  2,  3,    // right
      4,  5,  6,      4,  6,  7,    // right top
    ];
    dict['rotationX'] = 0;
    dict['rotationY'] = 0;
    dict['rotationZ'] = 0;
    dict['speed'] = 7;
    dict['numComponentsPosition'] = 3;
    dict['numComponentsColor'] = 4;
    dict['vertexCount'] = 48;
    dict['rotation'] = 0.05;
    dict['category'] = 1;
    
    return dict;	
}

var game_over = 0;
var speed_multiplier = 1;

function create_cuboid(){
    var type = Math.floor(Math.random()*2)*2 - 1;
    dict = {};
    dict['position'] = [0, 0.25, -20];
    dict['positions'] = [
      // Right face
      Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,

      // Left face
      -Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,

      // Top faces
      -Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,

      // Bottom faces
      -Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,

      // Front face
      -Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, -1.0, Math.tan(halfAngle)/50,

      // Back face
      -Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, 1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle)/3, -1.0, -Math.tan(halfAngle)/50,
    ];

    dict['normals'] = [
      // Right face
      1.0, 0, 0,
      1.0, 0, 0,
      1.0, 0, 0,
      1.0, 0, 0,

      // Left face
      -1.0, 0, 0,
      -1.0, 0, 0,
      -1.0, 0, 0,
      -1.0, 0, 0,

      // Top faces
      0, 1.0, 0,
      0, 1.0, 0,
      0, 1.0, 0,
      0, 1.0, 0,

      // Bottom faces
      0, -1.0, 0,
      0, -1.0, 0,
      0, -1.0, 0,
      0, -1.0, 0,

      // Front face
      0, 0, 1.0,
      0, 0, 1.0,
      0, 0, 1.0,
      0, 0, 1.0,

      // Back face
      0, 0, -1.0,
      0, 0, -1.0,
      0, 0, -1.0,
      0, 0, -1.0,
    ];

    dict['textureCoordinates'] = [
	    // Front
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Back
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Top
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Bottom
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Right
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	];
	if(grayscale==0)
    {
    	dict['faceColors'] = [
	      [1.0,  0.0,  0.0,  1.0],    // Right face: red
	      [1.0,  0.0,  0.0,  1.0],    // Left face: red
	      [1.0,  0.0,  0.0,  1.0],    // Top face: red
	      [1.0,  0.0,  0.0,  1.0],    // Bottom face: red
	      [1.0,  0.0,  0.0,  1.0],    // Front face: red
	      [1.0,  0.0,  0.0,  1.0],    // Back face: red
	    ];
	}
	else
	{
		dict['faceColors'] = [
	      [0.6,  0.6,  0.6,  1.0],    // Right face: red
	      [0.6,  0.6,  0.6,  1.0],    // Left face: red
	      [0.6,  0.6,  0.6,  1.0],    // Top face: red
	      [0.6,  0.6,  0.6,  1.0],    // Bottom face: red
	      [0.6,  0.6,  0.6,  1.0],    // Front face: red
	      [0.6,  0.6,  0.6,  1.0],    // Back face: red
	    ];	
	}
    dict['indices'] = [
      0,  1,  2,      0,  2,  3,    // right
      4,  5,  6,      4,  6,  7,    // left
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // front
      20, 21, 22,     20, 22, 23,   // back
    ];
    dict['numComponentsPosition'] = 3;
    dict['numComponentsColor'] = 4;
    dict['vertexCount'] = 36;
    dict['rotationX'] = 0;
    dict['rotationY'] = 0;
    dict['rotationZ'] = 0;
    dict['speed']     = 7;
    dict['rotation']  = type * Math.PI / 2.5 * Math.ceil(Math.random() * (speed_level[level] + 1));
    console.log(dict['rotation']);
    return dict;
}

var amplitude = 0.007;
var level_frames = 1200;

function create_2triangles(){
    var type = Math.floor(Math.random()*2)*2 - 1;
    dict = {};
    dict['position']  = [0, 0.25, -20];
    dict['positions'] = [
      // Top triangle
      // Right face
      0, 0, Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,

      // Left face
      0, 0, Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,

      // Top faces
      -Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,

      // Front face
      -Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,
      0, 0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, Math.tan(halfAngle)/50,

      // Back face
      -Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), 1.0, -Math.tan(halfAngle)/50,

      // Bottom triangle
      // Right face
      0, 0, Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,

      // Left face
      0, 0, Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,

      // Top faces
      -Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
      -Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,

      // Front face
      -Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,
      0, 0, Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, Math.tan(halfAngle)/50,

      // Back face
      -Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
      0, 0, -Math.tan(halfAngle)/50,
      Math.tan(halfAngle), -1.0, -Math.tan(halfAngle)/50,
    ];

    dict['normals'] = [
      // Top triangle
      // Right face
      Math.cos(-halfAngle), Math.cos(-halfAngle), 0,
      Math.cos(-halfAngle), Math.cos(-halfAngle), 0,
      Math.cos(-halfAngle), Math.cos(-halfAngle), 0,
      Math.cos(-halfAngle), Math.cos(-halfAngle), 0,

      // Left face
      Math.cos(-7*halfAngle), Math.cos(-7*halfAngle), 0,
      Math.cos(-7*halfAngle), Math.cos(-7*halfAngle), 0,
      Math.cos(-7*halfAngle), Math.cos(-7*halfAngle), 0,
      Math.cos(-7*halfAngle), Math.cos(-7*halfAngle), 0,

      // Top faces
      Math.cos(4*halfAngle), Math.cos(4*halfAngle), 0,
      Math.cos(4*halfAngle), Math.cos(4*halfAngle), 0,
      Math.cos(4*halfAngle), Math.cos(4*halfAngle), 0,
      Math.cos(4*halfAngle), Math.cos(4*halfAngle), 0,

      // Front face
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Back face
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,

      // Bottom triangle
      // Right face
      Math.cos(halfAngle), Math.cos(halfAngle), 0,
      Math.cos(halfAngle), Math.cos(halfAngle), 0,
      Math.cos(halfAngle), Math.cos(halfAngle), 0,
      Math.cos(halfAngle), Math.cos(halfAngle), 0,

      // Left face
      Math.cos(7*halfAngle), Math.cos(7*halfAngle), 0,
      Math.cos(7*halfAngle), Math.cos(7*halfAngle), 0,
      Math.cos(7*halfAngle), Math.cos(7*halfAngle), 0,
      Math.cos(7*halfAngle), Math.cos(7*halfAngle), 0,

      // Bottom faces
      Math.cos(-4*halfAngle), Math.cos(-4*halfAngle), 0,
      Math.cos(-4*halfAngle), Math.cos(-4*halfAngle), 0,
      Math.cos(-4*halfAngle), Math.cos(-4*halfAngle), 0,
      Math.cos(-4*halfAngle), Math.cos(-4*halfAngle), 0,

      // Front face
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      // Back face
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
    ];

    dict['textureCoordinates'] = [
	    // Front
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Back
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Top
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Bottom
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Right
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	];
	if(grayscale==0)
	{
	    dict['faceColors'] = [
	      // Top triangle
	      [1.0,  0.0,  0.0,  1.0],    // Right face: red
	      [1.0,  0.0,  0.0,  1.0],    // Left face: red
	      [1.0,  0.0,  0.0,  1.0],    // Top face: red
	      [1.0,  0.0,  0.0,  1.0],    // Front face: red
	      [1.0,  0.0,  0.0,  1.0],    // Back face: red
	      // Bottom triangle
	      [1.0,  0.0,  0.0,  1.0],    // Right face: red
	      [1.0,  0.0,  0.0,  1.0],    // Left face: red
	      [1.0,  0.0,  0.0,  1.0],    // Top face: red
	      [1.0,  0.0,  0.0,  1.0],    // Front face: red
	      [1.0,  0.0,  0.0,  1.0],    // Back face: red
	    ];
	}
	else if(grayscale==1)
	{
	    dict['faceColors'] = [
	      // Top triangle
	      [0.6,  0.6,  0.6,  1.0],    // Right face: red
	      [0.6,  0.6,  0.6,  1.0],    // Left face: red
	      [0.6,  0.6,  0.6,  1.0],    // Top face: red
	      [0.6,  0.6,  0.6,  1.0],    // Front face: red
	      [0.6,  0.6,  0.6,  1.0],    // Back face: red
	      // Bottom triangle
	      [0.6,  0.6,  0.6,  1.0],    // Right face: red
	      [0.6,  0.6,  0.6,  1.0],    // Left face: red
	      [0.6,  0.6,  0.6,  1.0],    // Top face: red
	      [0.6,  0.6,  0.6,  1.0],    // Front face: red
	      [0.6,  0.6,  0.6,  1.0],    // Back face: red
	    ];
	}
    dict['indices'] = [
      // Top triangle
      0,  1,  2,      0,  2,  3,    // right
      4,  5,  6,      4,  6,  7,    // left
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // front
      16, 17, 18,     16, 18, 19,   // back
      // Bottom triangle
      20, 21, 22,     20, 22, 23,   // right
      24, 25, 26,     24, 26, 27,    // left
      28, 29, 30,     28, 30, 31,   // top
      32, 33, 34,     32, 34, 35,   // front
      36, 37, 38,     36, 38, 39,   // back
    ];

    dict['numComponentsPosition'] = 3;
    dict['numComponentsColor'] = 4;
    dict['vertexCount'] = 60;
    dict['rotationX'] = 0;
    dict['rotationY'] = 0;
    dict['rotationZ'] = 0;
    dict['speed']     = 7;
    dict['rotation']  = type * Math.PI / 2.5 * Math.ceil(Math.random() * (speed_level[level] + 1));
    return dict;
}

function create_light_source(){
	dict = {};
    dict['position']  = [0.0, 0.5, -2.0];
    dict['positions'] = [
      // Right face
      0.1, 0.1, 0.1,
      0.1, 0.1, -0.1,
      0.1, -0.1, -0.1,
      0.1, -0.1, 0.1,

      // Left face
      -0.1, 0.1, 0.1,
      -0.1, 0.1, -0.1,
      -0.1, -0.1, -0.1,
      -0.1, -0.1, 0.1,

      // Top faces
      -0.1, 0.1, 0.1,
      0.1, 0.1, 0.1,
      0.1, 0.1, -0.1,
      -0.1, 0.1, -0.1,

      // Bottom faces
      -0.1, -0.1, 0.1,
      0.1, -0.1, 0.1,
      0.1, -0.1, -0.1,
      -0.1, -0.1, -0.1,

      // Front face
      -0.1, 0.1, 0.1,
      0.1, 0.1, 0.1,
      0.1, -0.1, 0.1,
      -0.1, -0.1, 0.1,

      // Back face
      -0.1, 0.1, -0.1,
      0.1, 0.1, -0.1,
      0.1, -0.1, -0.1,
      -0.1, -0.1, -0.1,
    ];

    dict['normals'] = [
      // Right face
      0.1, 0, 0,
      0.1, 0, 0,
      0.1, 0, 0,
      0.1, 0, 0,

      // Left face
      -0.1, 0, 0,
      -0.1, 0, 0,
      -0.1, 0, 0,
      -0.1, 0, 0,

      // Top faces
      0, 0.1, 0,
      0, 0.1, 0,
      0, 0.1, 0,
      0, 0.1, 0,

      // Bottom faces
      0, -0.1, 0,
      0, -0.1, 0,
      0, -0.1, 0,
      0, -0.1, 0,

      // Front face
      0, 0, 0.1,
      0, 0, 0.1,
      0, 0, 0.1,
      0, 0, 0.1,

      // Back face
      0, 0, -0.1,
      0, 0, -0.1,
      0, 0, -0.1,
      0, 0, -0.1,
    ];

    dict['textureCoordinates'] = [
	    // Front
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Back
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Top
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Bottom
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Right
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	    // Left
	    0.0,  0.0,
	    1.0,  0.0,
	    1.0,  1.0,
	    0.0,  1.0,
	];

    dict['faceColors'] = [
      [1.0,  1.0,  1.0,  1.0],    // Right face: white
      [1.0,  1.0,  1.0,  1.0],    // Left face: white
      [1.0,  1.0,  1.0,  1.0],    // Top face: white
      [1.0,  1.0,  1.0,  1.0],    // Bottom face: white
      [1.0,  1.0,  1.0,  1.0],    // Front face: white
      [1.0,  1.0,  1.0,  1.0],    // Back face: white
    ];

    dict['indices'] = [
      0,  1,  2,      0,  2,  3,    // right
      4,  5,  6,      4,  6,  7,    // left
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // front
      20, 21, 22,     20, 22, 23,   // back
    ];

    dict['numComponentsPosition'] = 3;
    dict['numComponentsColor'] = 4;
    dict['vertexCount'] = 36;
    dict['rotationX'] = 0;
    dict['rotationY'] = 0;
    dict['rotationZ'] = 0;
    dict['speed']     = 7;
    dict['rotation']  = 0;
    return dict;
}

function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url, window.location.href)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}


main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  changeShader(gl);
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.

  shapes = [];
  obstacles = [];
  
  buffer_shapes = [];
  buffer_obstacles = [];
  var i = 0; 
  while(i < count_shapes){
      if(i%2==1){
        shapes.push(create_octagon0());
      }
      else{
        shapes.push(create_octagon1());
      }
      shapes[i].position[2] = -2*i;
      buffer_shapes.push(initBuffers(gl, shapes[i]));
      i++;
  }


  i=0;
  while(i<count_obstacles)
  {
      var type = Math.floor(Math.random()*count_type_obstacles);
      if(type==0) 
      { 
       	obstacles.push(create_cuboid());
      }
      else if(type==1)
      {
        obstacles.push(create_2triangles());
      }
      obstacles[i].rotationZ = i*Math.PI/count_obstacles;
      obstacles[i].position[2] -= 10*(i-1);
      buffer_obstacles.push(initBuffers(gl, obstacles[i]));
      i++;
  }

  light_source = create_light_source();
  buffer_light_source = initBuffers(gl, light_source);

  const texture = loadTexture(gl, 'star.jpg');
  const texture_1 = loadTexture(gl, 'texture-2.jpg');
  const texture_2 = loadTexture(gl, 'texture-3.jpg');
  const texture_3 = loadTexture(gl, 'texture-4.jpg');
  const texture_g1 = loadTexture(gl, 'texture-g1.jpg');
  const texture_g2 = loadTexture(gl, 'texture-g2.jpg');

  var then = 0;
  var theta = 0;

  document.onkeyup = handleKeyUp;
  document.onkeydown = handleKeyDown;
  //document.onmousemove = hoverMouse;

  // Draw the scene repeatedly
  function shakey_screen(now) {
    const projectionMatrix = clearScene(gl);

    now *= 0.001;  // convert to seconds
    frames++;
    
    const deltaTime = now - then;
    then = now;

    var i=0;
    while(i < count_shapes){
        shapes[i].position[0] = amplitude * Math.sin(2 * Math.PI * frames / 4);
        if(shapes[i].category==0)
        	if(grayscale==0)
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_1, deltaTime);
        	else
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_g1, deltaTime);
        else
        	if(grayscale==0)
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_3, deltaTime);
        	else
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_g2, deltaTime);
        i++;
    }
    i=0;
    while(i < count_obstacles){
        obstacles[i].position[0] = amplitude * Math.sin(2 * Math.PI * frames / 4);
        drawScene(gl, projectionMatrix, obstacles[i], programInfo, buffer_obstacles[i], texture, deltaTime);
        i++;
    }
    drawScene(gl, projectionMatrix, light_source, programInfo, buffer_light_source, texture_2, deltaTime);

    requestAnimationFrame(shakey_screen);
  }

  // Draw the scene repeatedly
  function render(now) {
    
    if(pause)
      frames++;
    now *= 0.001;  // convert to seconds

    const deltaTime = now - then;

    if(frames % level_frames == 0){
    	//console.log(level);
        level = Math.min(level + 1, max_level);
    }
    print_data(deltaTime);

    then = now;
    refresh_tunnel(gl, shapes, buffer_shapes);
    refresh_obstacles(gl, obstacles, buffer_obstacles);
    handleKeys(shapes, obstacles, light_source);

    if(changeLighting==1)
    {
    	if(colour==1)colour=2;
    	else if(colour==0)colour=1;
    	else colour = 0;

    	changeLighting = 0;
    	changeShader(gl);
    }

    if(periodicRandom==1)
    {
    	if(frames - lastFrames >= 40){
    		lastFrames = frames;
    		source_diffuse_color = [Math.random(), Math.random(), Math.random()];
    		source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    		source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    	}
    }

    if(periodicRandom==2)
    {
      if(frames - lastFrames >= 40){
        lastFrames = frames;
        if(source_diffuse_color[0]!=0.4)
        {
          source_diffuse_color = [0.4, 0.4, 0.4];
          source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
          source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
        }
        else if(source_diffuse_color[0]!=1.0)
        {
          source_diffuse_color = [1.0, 1.0, 1.0];
          source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
          source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]]; 
        }
      }
    }

    if(oscillation>=1)
    {
    	if(light_source.position[2]>=-10 && oscillation==1)
    	{
    		light_source.position[2] -= 0.05;
    		source_position[2] -= 0.05;
    	}
    	else if(light_source.position[2]<-10 && oscillation==1)oscillation=2;
    	else if(light_source.position[2]<=-2 && oscillation==2)
    	{
    		light_source.position[2] += 0.075;
    		source_position[2] += 0.075;	
    	}
    	else if(light_source.position[2]>-2 && oscillation==2)oscillation=1;
    }

    if(jump==1)
    {
    	var i=0;
    	while(i < count_shapes)
    	{
    		if(shapes[i].position[1] > -0.25)
    		{
    			shapes[i].position[1] -= 0.02;	
    		}
    		i++;
    	}
    	i=0;
    	while(i < count_obstacles)
    	{
    		if(obstacles[i].position[1] > -0.25)
    		{
    			obstacles[i].position[1] -= 0.02;	
    		}
    		else if(i==count_obstacles-1)jump=2;
    		i++;
    	}
    	if(light_source.position[1] > -0.4)
    	{
    		//light_source.position[1] -= 0.05;
    		//source_position -= 0.05;	
    	}
    	
    }
    else if(jump==2)
    {
    	var i=0;
    	while(i < count_shapes)
    	{
    		if(shapes[i].position[1] < 0.25)
    		{
    			shapes[i].position[1] += 0.02;	
    		}
    		i++;
    	}

    	i=0;
    	while(i < count_obstacles)
    	{
    		if(obstacles[i].position[1] < 0.25)
    		{
    			obstacles[i].position[1] += 0.02;	
    		}
    		else if(i==count_obstacles-1)jump=0;
    		i++;
    	}
    	if(light_source.position[1] < 0.0)
    	{
    		//light_source.position[1] += 0.05;
    		//source_position += 0.05;	
    	}
    	
    }

    const projectionMatrix = clearScene(gl);
    var i=0;
    while(i < count_shapes){
        shapes[i].position[2] += pause * shapes[i].speed * deltaTime;
        if(shapes[i].category==0)
        	if(grayscale==0)
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_1, deltaTime);
        	else
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_g1, deltaTime);
        else
        	if(grayscale==0)
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_3, deltaTime);
        	else
        		drawScene(gl, projectionMatrix, shapes[i], programInfo, buffer_shapes[i], texture_g2, deltaTime);
        i++;
    }
    i=0;
    while(i < count_obstacles){
        obstacles[i].position[2] += pause * obstacles[i].speed * deltaTime;
        //console.log(obstacles[i].rotation, score);
        if(frames<=500)obstacles[i].rotation = 0;
        obstacles[i].rotationZ += Math.ceil((level*4)/9) * pause * obstacles[i].rotation * deltaTime;
        
        drawScene(gl, projectionMatrix, obstacles[i], programInfo, buffer_obstacles[i], texture, deltaTime);
        i++;
    }
    //light_source.position[2] += pause * light_source.speed * deltaTime;
    drawScene(gl, projectionMatrix, light_source, programInfo, buffer_light_source, texture_2, deltaTime);

    if(!detect_collision(shapes, obstacles)){
        requestAnimationFrame(render);
    }
    else{
        frames = 0;
        shakey_screen(gl, shapes, buffer_shapes, obstacles, buffer_obstacles);
    }
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//

function print_data(deltaTime){
    element = document.getElementById("level");
    element.innerHTML = "level: " + level.toString();
    element = document.getElementById("score");
    var x = 60 * frames / 60 * 100;
    score = Math.round(x)/100;
    element.innerHTML = "score: " + score.toString();
}

function detect_collision(shapes, obstacles){
    for (var i = 0; i < count_obstacles; i++){
        if(obstacles[i].position[2] > -0.5){
            var theta = obstacles[i].rotationZ - Math.floor(obstacles[i].rotationZ / Math.PI) * Math.PI;
            var alpha = shapes[0].rotationZ - Math.floor(shapes[0].rotationZ / Math.PI) * Math.PI;

            if((theta+halfAngle)>Math.PI)theta-=Math.PI;
            if((-Math.PI / 8 <= theta && theta <= Math.PI / 8) || Math.abs(obstacles[i].position[1])<=0.05){
                return true;
            }
            
        }
    }
    return false;
}

// Dictionary that keeps the track of the status of keys
var statusKeys = {};

function handleKeyDown(event){
    statusKeys[event.keyCode] = true;
}

function handleKeyUp(event){
    if(event.keyCode == 80){
        // P Key
        pause = 1 - pause;
    }
    else if(event.keyCode == 84){
      	// T key : toggle shaders
       	changeLighting = 1;
    }
    else if(event.keyCode == 71){
      	// G key : toggle shaders
      	if(grayscale==0)
       		grayscale = 1;
       	else
       		grayscale = 0;
    }
    else if(event.keyCode == 48){
    	// 0 key : source colour to white
    	periodicRandom = 0;
    	source_diffuse_color = [1.0, 1.0, 1.0];
    	source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    	source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    }
    else if(event.keyCode == 49){
    	// 0 key : source colour to white
    	periodicRandom = 0;
    	source_diffuse_color = [1.0, 0.0, 0.0];
    	source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    	source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    }
    else if(event.keyCode == 50){
    	// 0 key : source colour to white
    	periodicRandom = 0;
    	source_diffuse_color = [0.0, 1.0, 0.0];
    	source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    	source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    }
    else if(event.keyCode == 51){
    	// 0 key : source colour to white
    	periodicRandom = 0;
    	source_diffuse_color = [0.0, 0.0, 1.0];
    	source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    	source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    }
    else if(event.keyCode == 52){
    	// 0 key : source colour to white
    	periodicRandom = 0;
    	source_diffuse_color = [Math.random(), Math.random(), Math.random()];
    	source_ambient_color = [source_diffuse_color[0]/ambient_factor, source_diffuse_color[1]/ambient_factor, source_diffuse_color[2]/ambient_factor];
    	source_ambient_color = [source_diffuse_color[0], source_diffuse_color[1], source_diffuse_color[2]];
    }
    else if(event.keyCode == 53){
    	// 0 key : source colour to white
    	if(periodicRandom!=1)
    		periodicRandom = 1;
    	else if(periodicRandom==1)
    		periodicRandom = 0;   	
    }
    else if(event.keyCode == 54){
      // 0 key : source colour to white
      if(periodicRandom!=2)
        periodicRandom = 2;
      else if(periodicRandom==2)
        periodicRandom = 0;     
    }
	else if(event.keyCode == 79){
		// O key
		if(oscillation==0)oscillation=1;
		else if(oscillation>=1){oscillation=0;light_source.position[2]=-2;source_position[2]=-1;}
	}
	else if(event.keyCode == 32){
		// Spacebar for jump
		if(jump==0)jump=1;
	}   
    else{
        statusKeys[event.keyCode] = false;
    }
}

function handleKeys(shapes, obstacles, light_source){
    if(pause){
        if(statusKeys[38]){
            // Up Key
            var i = 0; 
            while(i < count_shapes){
                shapes[i].position[2] += 0.5;//shapes[i].speed / 60;
                i++;
            }
            i=0;
            while(i < count_obstacles){
                obstacles[i].position[2] += 0.5;//obstacles[i].speed / 60;
                i++;
            }
        }
        if(statusKeys[37]){
            // Left Key
            var i = 0; 
            while(i < count_shapes){
                shapes[i].rotationZ += shapes[i].rotation;
                i++;
            }
            i=0;
            while(i < count_obstacles){
                obstacles[i].rotationZ += shapes[0].rotation;
                i++;
            }
        }
        if(statusKeys[39]){
            // Right Key
            var i = 0;
            while(i < count_shapes){
                shapes[i].rotationZ -= shapes[i].rotation;
                i++;
            }
            i=0;
            while(i < count_obstacles){
                obstacles[i].rotationZ -= shapes[0].rotation;
                i++;
            }
        }

    }
}



function refresh_tunnel(gl, shapes, buffers){
    if(shapes.length && shapes[0].position[2] > 1){
        count_shapes--;
        buffers.shift();
        shapes.shift();

        if(shapes[count_shapes-1].category){
            shapes.push(create_octagon0());
        }
        else{
            shapes.push(create_octagon1());
        }
        count_shapes++;
        shapes[count_shapes - 1].position[2] = shapes[count_shapes - 2].position[2] - 2;
        shapes[count_shapes - 1].rotationY = shapes[count_shapes - 2].rotationY;
        shapes[count_shapes - 1].rotationX = shapes[count_shapes - 2].rotationX;
        shapes[count_shapes - 1].rotationZ = shapes[count_shapes - 2].rotationZ;
        buffers.push(initBuffers(gl, shapes[count_shapes - 1]));
    }
}

function refresh_obstacles(gl, obstacles, buffer_obstacles){
    if((obstacles.length > 0 && obstacles[0].position[2] > 0.05)){
        buffer_obstacles.shift();
        obstacles.shift();
        
        var type = Math.floor(Math.random()*(count_type_obstacles+1));
        count_obstacles--;
        
        if(type==0)
        {
                count_obstacles++;
                obstacles.push(create_cuboid());
                obstacles[count_obstacles - 1].rotationZ = Math.random()*Math.PI;

                buffer_obstacles.push(initBuffers(gl, obstacles[count_obstacles - 1]));
        }
        else if(type==1)
        {
            count_obstacles++;
            obstacles.push(create_2triangles());
            obstacles[count_obstacles - 1].rotationZ = Math.random()*Math.PI;
            buffer_obstacles.push(initBuffers(gl, obstacles[count_obstacles - 1]));
        }
    }
    else if(obstacles.length == 0 || (level==2 && obstacles[0].position[2]>-10 && obstacles.length<2)){
        var type = Math.floor(Math.random()*(count_type_obstacles+1));
        
        if(type==0)
        {   
            count_obstacles++;            	
            obstacles.push(create_cuboid());
            obstacles[count_obstacles - 1].rotationZ = Math.random()*Math.PI;
            buffer_obstacles.push(initBuffers(gl, obstacles[count_obstacles - 1]));
        }
        else if(type==1)
        {
            count_obstacles++;
            obstacles.push(create_2triangles());
            obstacles[count_obstacles - 1].rotationZ = Math.random()*Math.PI;
            buffer_obstacles.push(initBuffers(gl, obstacles[count_obstacles - 1]));
        }
    }
}

function clearScene(gl){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to gray, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
    return projectionMatrix;
}

function initBuffers(gl, shape) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  const positions = shape.positions;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Create a buffer for the cube's normal positions.

  const normalBuffer = gl.createBuffer();

  // Select the normalBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const normals = shape.normals;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  const faceColors = shape.faceColors;

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color numComponentsColor times for the numComponentsColor vertices of the face
    for (var i = 0; i < shape.numComponentsColor; ++i) {
        colors = colors.concat(c);
    }
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = shape.indices;

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = shape.textureCoordinates;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
    gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
    normal: normalBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, projectionMatrix, shape, programInfo, buffers, texture, deltaTime) {
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelMatrix = mat4.create();

  const viewMatrix = mat4.create();
  mat4.lookAt(viewMatrix, camera['camera_position'], camera['camera_target'], camera['camera_up']);
  
  // console.log("*");
  // console.log(camera_target);
  // console.log(viewMatrix[2],viewMatrix[6],viewMatrix[10],viewMatrix[14]);
  // console.log(viewMatrix[8],viewMatrix[9],viewMatrix[10],viewMatrix[11]);

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelMatrix,     // destination matrix
                 modelMatrix,     // matrix to translate
                 shape.position);  // amount to translate
  mat4.rotate(modelMatrix,  // destination matrix
              modelMatrix,  // matrix to rotate
              shape.rotationX,     // amount to rotate in radians
              [1, 0, 0]);       // axis to rotate around (X)
  mat4.rotate(modelMatrix,  // destination matrix
              modelMatrix,  // matrix to rotate
              shape.rotationY,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (Y)
  mat4.rotate(modelMatrix,  // destination matrix
              modelMatrix,  // matrix to rotate
              shape.rotationZ,// amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = shape.numComponentsPosition;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the normals from the vertex buffer
  // into the vertexNormal attribute.
  {
    const numComponents = shape.numComponentsPosition;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal, numComponents, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = shape.numComponentsColor;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

	// tell webgl how to pull out the texture coordinates from buffer
	{
	    const numComponents = 2; // every coordinate composed of 2 values
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
	    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, numComponents, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
	}

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.viewMatrix, false, viewMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelMatrix, false, modelMatrix);

  gl.uniform3f(
      programInfo.uniformLocations.sourceAmbientColor,
      source_ambient_color[0],
      source_ambient_color[1],
      source_ambient_color[2]);

  gl.uniform3f(
      programInfo.uniformLocations.sourceDiffuseColor,
      source_diffuse_color[0],
      source_diffuse_color[1],
      source_diffuse_color[2]);

  gl.uniform3f(
      programInfo.uniformLocations.sourceSpecularColor,
      source_specular_color[0],
      source_specular_color[1],
      source_specular_color[2]);

  gl.uniform3f(
      programInfo.uniformLocations.sourcePosition,
      source_position[0],
      source_position[1],
      source_position[2]);

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = shape.vertexCount;
    gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0);
  }

  // Update the rotation for the next draw
  // cubeRotation += deltaTime;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function changeShader(gl){
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    if(colour==1)
    	shaderProgram = initShaderProgram(gl, shaders_dict['vsSource'], shaders_dict['fsLSource']);
	else if(colour==0)
		shaderProgram = initShaderProgram(gl, shaders_dict['vsSource'], shaders_dict['fsSSource']);
	else
		shaderProgram = initShaderProgram(gl, shaders_dict['vsSource'], shaders_dict['fsSource']);

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVevrtexColor and also
    // look up uniform locations.
    programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        vertexNormal: gl.getAttribLocation(shaderProgram, 'aNormal'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        viewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
        modelMatrix: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
        sourceAmbientColor: gl.getUniformLocation(shaderProgram, 'uSourceAmbientColor'),
        sourceDiffuseColor: gl.getUniformLocation(shaderProgram, 'uSourceDiffuseColor'),
        sourceSpecularColor: gl.getUniformLocation(shaderProgram, 'uSourceSpecularColor'),
        sourcePosition: gl.getUniformLocation(shaderProgram, 'uSourcePosition'),
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
      },
    };
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture



function loadTexture(gl, url) {

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    

  var image = new Image();
  
  image.onload = function() {

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  };
  
  //requestCORSIfNotSameOrigin(image, url);
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}