var count_shapes = 10;
var count_obstacles = 2;
var count_type_obstacles = 2;
var colour = 1;
var lastFrames = -1;
var grayscale = 0;

var max_level = 3;
var level = 1;

var pause = 1;
var score = 0;
var frames = 0;
var gravity = -1;
var current_rotation = 0;
var halfAngle = Math.PI/8;

// source initialization

var source_rotation = 0;

var camera = {};
camera['camera_position'] = [0.0, 0.0, 0.0];
camera['camera_target'] = [0.0, 0.0, -1.0];
camera['camera_up'] = [0.0, 1.0, 0.0];

var shaderProgram;

function create_octagon0(){
   dict = {};
   var tan_h = Math.tan(halfAngle);
   var tan_mh = Math.tan(-halfAngle);
   dict['position'] = [0, 0.25, 0];
   dict['radius'] = 1/Math.cos(halfAngle);
   dict['positions'] = [
      // Right face
      1.0, tan_h, 1.0,
      1.0, tan_h, -1.0,
      1.0, tan_mh, -1.0,
      1.0, tan_mh, 1.0,

      // Top Right face
      tan_h, 1.0, 1.0,
      tan_h, 1.0, -1.0,
      1.0, tan_h, -1.0,
      1.0, tan_h, 1.0,

      // Top faces
      -tan_h, 1.0, 1.0,
      -tan_h, 1.0, -1.0,
      tan_h, 1.0, -1.0,
      tan_h, 1.0, 1.0,

      // Top Left face
      -1.0, tan_h, 1.0,
      -1.0, tan_h, -1.0,
      -tan_h, 1.0, -1.0,
      -tan_h, 1.0, 1.0,

      // Left fact
      -1.0, tan_h, 1.0,
      -1.0, tan_h, -1.0,
      -1.0, tan_mh, -1.0,
      -1.0, tan_mh, 1.0,

      // Bottom Left face
      -tan_h, -1.0, 1.0,
      -tan_h, -1.0, -1.0,
      -1.0, -tan_h, -1.0,
      -1.0, -tan_h, 1.0,

      // Bottom faces
      tan_h, -1.0, 1.0,
      tan_h, -1.0, -1.0,
      -tan_h, -1.0, -1.0,
      -tan_h, -1.0, 1.0,

      // Bottom Right face
      1.0, -tan_h, 1.0,
      1.0, -tan_h, -1.0,
      tan_h, -1.0, -1.0,
      tan_h, -1.0, 1.0,
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
   var tan_h = Math.tan(halfAngle);
   var tan_mh = Math.tan(-halfAngle);
   dict['position'] = [0, 0.25, 0];
   dict['radius'] = 1/Math.cos(halfAngle);
   dict['positions'] = [
      // Right face
      1.0, tan_h, 1.0,
      1.0, tan_h, -1.0,
      1.0, tan_mh, -1.0,
      1.0, tan_mh, 1.0,

      // Top Right face
      tan_h, 1.0, 1.0,
      tan_h, 1.0, -1.0,
      1.0, tan_h, -1.0,
      1.0, tan_h, 1.0,

      // Top faces
      -tan_h, 1.0, 1.0,
      -tan_h, 1.0, -1.0,
      tan_h, 1.0, -1.0,
      tan_h, 1.0, 1.0,

      // Top Left face
      -1.0, tan_h, 1.0,
      -1.0, tan_h, -1.0,
      -tan_h, 1.0, -1.0,
      -tan_h, 1.0, 1.0,

      // Left fact
      -1.0, tan_h, 1.0,
      -1.0, tan_h, -1.0,
      -1.0, tan_mh, -1.0,
      -1.0, tan_mh, 1.0,

      // Bottom Left face
      -tan_h, -1.0, 1.0,
      -tan_h, -1.0, -1.0,
      -1.0, -tan_h, -1.0,
      -1.0, -tan_h, 1.0,

      // Bottom faces
      tan_h, -1.0, 1.0,
      tan_h, -1.0, -1.0,
      -tan_h, -1.0, -1.0,
      -tan_h, -1.0, 1.0,

      // Bottom Right face
      1.0, -tan_h, 1.0,
      1.0, -tan_h, -1.0,
      tan_h, -1.0, -1.0,
      tan_h, -1.0, 1.0,


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
    var tan_h = Math.tan(halfAngle);
    dict = {};
    dict['position'] = [0, 0.25, -20];
    dict['positions'] = [
      // Right face
      tan_h/3, 1.0, tan_h/50,
      tan_h/3, 1.0, -tan_h/50,
      tan_h/3, -1.0, -tan_h/50,
      tan_h/3, -1.0, tan_h/50,

      // Left face
      -tan_h/3, 1.0, tan_h/50,
      -tan_h/3, 1.0, -tan_h/50,
      -tan_h/3, -1.0, -tan_h/50,
      -tan_h/3, -1.0, tan_h/50,

      // Top faces
      -tan_h/3, 1.0, tan_h/50,
      tan_h/3, 1.0, tan_h/50,
      tan_h/3, 1.0, -tan_h/50,
      -tan_h/3, 1.0, -tan_h/50,

      // Bottom faces
      -tan_h/3, -1.0, tan_h/50,
      tan_h/3, -1.0, tan_h/50,
      tan_h/3, -1.0, -tan_h/50,
      -tan_h/3, -1.0, -tan_h/50,

      // Front face
      -tan_h/3, 1.0, tan_h/50,
      tan_h/3, 1.0, tan_h/50,
      tan_h/3, -1.0, tan_h/50,
      -tan_h/3, -1.0, tan_h/50,

      // Back face
      -tan_h/3, 1.0, -tan_h/50,
      tan_h/3, 1.0, -tan_h/50,
      tan_h/3, -1.0, -tan_h/50,
      -tan_h/3, -1.0, -tan_h/50,
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
      [0.5,  0.5,  0.5,  1.0],    // Right face: red
      [0.5,  0.5,  0.5,  1.0],    // Left face: red
      [0.5,  0.5,  0.5,  1.0],    // Top face: red
      [0.5,  0.5,  0.5,  1.0],    // Bottom face: red
      [0.5,  0.5,  0.5,  1.0],    // Front face: red
      [0.5,  0.5,  0.5,  1.0],    // Back face: red
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
    dict['rotation']  = type * Math.PI / 2.5 * Math.ceil(Math.random() * (speed_level[level] + 1));
    console.log(dict['rotation']);
    return dict;
}

var level_frames = 800;

function create_2triangles(){
    var type = Math.floor(Math.random()*2)*2 - 1;
    var tan_h = Math.tan(halfAngle);
    dict = {};
    dict['position']  = [0, 0.25, -20];
    dict['positions'] = [
      // Top triangle
      // Right face
      0, 0, tan_h/50,
      0, 0, -tan_h/50,
      tan_h, 1.0, -tan_h/50,
      tan_h, 1.0, tan_h/50,

      // Left face
      0, 0, tan_h/50,
      0, 0, -tan_h/50,
      -tan_h, 1.0, -tan_h/50,
      -tan_h, 1.0, tan_h/50,

      // Top faces
      -tan_h, 1.0, tan_h/50,
      tan_h, 1.0, tan_h/50,
      tan_h, 1.0, -tan_h/50,
      -tan_h, 1.0, -tan_h/50,

      // Front face
      -tan_h, 1.0, tan_h/50,
      tan_h, 1.0, tan_h/50,
      0, 0, tan_h/50,
      tan_h, 1.0, tan_h/50,

      // Back face
      -tan_h, 1.0, -tan_h/50,
      tan_h, 1.0, -tan_h/50,
      0, 0, -tan_h/50,
      tan_h, 1.0, -tan_h/50,

      // Bottom triangle
      // Right face
      0, 0, tan_h/50,
      0, 0, -tan_h/50,
      tan_h, -1.0, -tan_h/50,
      tan_h, -1.0, tan_h/50,

      // Left face
      0, 0, tan_h/50,
      0, 0, -tan_h/50,
      -tan_h, -1.0, -tan_h/50,
      -tan_h, -1.0, tan_h/50,

      // Top faces
      -tan_h, -1.0, tan_h/50,
      tan_h, -1.0, tan_h/50,
      tan_h, -1.0, -tan_h/50,
      -tan_h, -1.0, -tan_h/50,

      // Front face
      -tan_h, -1.0, tan_h/50,
      tan_h, -1.0, tan_h/50,
      0, 0, tan_h/50,
      tan_h, -1.0, tan_h/50,

      // Back face
      -tan_h, -1.0, -tan_h/50,
      tan_h, -1.0, -tan_h/50,
      0, 0, -tan_h/50,
      tan_h, -1.0, -tan_h/50,

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

    dict['faceColors'] = [
      // Top triangle
      [0.5,  0.5,  0.5,  1.0],    // Right face: red
      [0.5,  0.5,  0.5,  1.0],    // Left face: red
      [0.5,  0.5,  0.5,  1.0],    // Top face: red
      [0.5,  0.5,  0.5,  1.0],    // Front face: red
      [0.5,  0.5,  0.5,  1.0],    // Back face: red
      // Bottom triangle
      [0.5,  0.5,  0.5,  1.0],    // Right face: red
      [0.5,  0.5,  0.5,  1.0],    // Left face: red
      [0.5,  0.5,  0.5,  1.0],    // Top face: red
      [0.5,  0.5,  0.5,  1.0],    // Front face: red
      [0.5,  0.5,  0.5,  1.0],    // Back face: red
    ];
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

function create_cube_source(){
   dict = {};
    dict['position']  = [0.0, -0.5, -2.0];
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
    dict['speed']     = 100;
    dict['rotation']  = 0;
    return dict;
}


//
// Start here
//
window.onload = function init() {
  canvas = document.getElementById( "gl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

  

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

  cube_source = create_cube_source();
  buffer_cube_source = initBuffers(gl, cube_source);


  const texture_ob2 = loadTexture(gl, 'Image/ice.jpg');
  const texture_ob1 = loadTexture(gl, 'Image/fire.jpg');
  const texture_1 = loadTexture(gl, 'Image/space_gate.jpg');
  const texture_2 = loadTexture(gl, 'Image/cube_source.jpg');
  const texture_3 = loadTexture(gl, 'Image/star.jpg');

  var then = 0;


  document.onkeyup = handleKeyUp;
  document.onkeydown = handleKeyDown;

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
    
    element = document.getElementById("level");
    element.innerHTML = "Level: " + level.toString();
    element = document.getElementById("score");
    var x = 60 * frames / 60 * 100;
    score = Math.round(x)/100;
    element.innerHTML = "Score: " + score.toString();

    then = now;
    refresh_tunnel(gl, shapes, buffer_shapes);
    refresh_obstacles(gl, obstacles, buffer_obstacles);
    handleKeys(shapes, obstacles, cube_source);

    const projectionMatrix = clearScene(gl);
    var i=0;
    while(i < count_shapes){
        shapes[i].position[2] += pause * shapes[i].speed * deltaTime;
        if(shapes[i].category==0)
            drawScene(gl, projectionMatrix, shapes[i], buffer_shapes[i], texture_1);
        else
            drawScene(gl, projectionMatrix, shapes[i], buffer_shapes[i], texture_3);
        i++;
    }
    i=0;
    while(i < count_obstacles){
        obstacles[i].position[2] += pause * obstacles[i].speed * deltaTime;
        if(frames<=500)obstacles[i].rotation = 0;
        obstacles[i].rotationZ += Math.ceil((level*4)/9) * pause * obstacles[i].rotation * deltaTime;

        if(obstacles[i].vertexCount == 36){
          drawScene(gl, projectionMatrix, obstacles[i], buffer_obstacles[i], texture_ob1);
        }
        else if(obstacles[i].vertexCount == 60){
          drawScene(gl, projectionMatrix, obstacles[i], buffer_obstacles[i], texture_ob2);
        }
        i++;
    }
    drawScene(gl, projectionMatrix, cube_source, buffer_cube_source, texture_2);

    if(!detect_collision(shapes, obstacles)){
        requestAnimationFrame(render);
    }
    else{
        frames = 0;
    }
  }
  requestAnimationFrame(render);
}



function detect_collision(shapes, obstacles){
  for (var i = 0; i < count_obstacles; i++){
      console.log(obstacles[i].position[0], obstacles[i].position[1], obstacles[i].position[2])
      if(obstacles[i].position[2] > -0.5){
          console.log(obstacles[i].rotationZ)
          var theta = obstacles[i].rotationZ - Math.floor(obstacles[i].rotationZ / Math.PI) * Math.PI;
          //var alpha = shapes[0].rotationZ - Math.floor(shapes[0].rotationZ / Math.PI) * Math.PI;

          console.log(theta, halfAngle, Math.PI)
          if((theta + halfAngle) > Math.PI) theta -= Math.PI;
          
          else if(-Math.PI / 8 <= theta && theta <= Math.PI / 8){
            console.log(2)
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
    else{
        statusKeys[event.keyCode] = false;
    }
}

function handleKeys(shapes, obstacles, cube_source){
    if(pause){
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
        if(statusKeys[38]){
          // Up Key
          var i = 0; 
          while(i < count_shapes){
              shapes[i].position[2] += 0.3;
              i++;
          }
          i=0;
          while(i < count_obstacles){
              obstacles[i].position[2] += 0.3;
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
    mat4.perspective(projectionMatrix, fieldOfView, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100);
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
function drawScene(gl, projectionMatrix, shape, buffers, texture) {
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

  mat4.translate(modelMatrix, modelMatrix, shape.position);  
  mat4.rotate(modelMatrix, modelMatrix, shape.rotationX, [1, 0, 0]);       
  mat4.rotate(modelMatrix, modelMatrix, shape.rotationY, [0, 1, 0]);       
  mat4.rotate(modelMatrix, modelMatrix, shape.rotationZ, [0, 0, 1]);       

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
    gl.getAttribLocation(shaderProgram, 'aVertexPosition'), shape.numComponentsPosition, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, 'aVertexPosition'));
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, 'aVertexColor'), shape.numComponentsColor, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, 'aVertexColor'));
  }

   // tell webgl how to pull out the texture coordinates from buffer
   {
       gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
       gl.vertexAttribPointer(gl.getAttribLocation(shaderProgram, 'aTextureCoord'), 2, gl.FLOAT, false, 0, 0);
       gl.enableVertexAttribArray(gl.getAttribLocation(shaderProgram, 'aTextureCoord'));
   }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(shaderProgram);

  // Set the shader uniforms

  gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'), false, projectionMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, 'uViewMatrix'), false, viewMatrix);
  gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, 'uModelMatrix'), false, modelMatrix);

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(gl.getUniformLocation(shaderProgram, 'uSampler'), 0);

  {

    gl.drawElements(gl.TRIANGLES, shape.vertexCount, gl.UNSIGNED_SHORT, 0);
  }

}



// loading texture
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


  };
  image.src = url;

  return texture;
}

