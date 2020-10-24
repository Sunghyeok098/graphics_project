var gl;
var stars = [];
var points;
var maxNumTriangles = 200;
var maxNumVertices = 3* maxNumTriangles;
var index = 0;
var redraw = false;
var theta = 0.0;
var thetaLoc;
var direction = true;

var colors = [

    vec4(0.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(0.0, 1.0, 1.0, 1.0)
];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext( "webgl", { antialias: false, preserveDrawingBuffer: true} ); //set no delete before primitive
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    gl.viewport( 0, 0, canvas.width, canvas.height );

    // Specify the background color as RGB (0.13, 0.45, 0.15, 0.8) which are grass colors.
    gl.clearColor( 0.13, 0.45, 0.15, 0.8 );


    //  Load shaders and initialize attribute buffers
    // Specify using Fragment_shader1 and vertex-shader as program1.
    var program1 = initShaders( gl, "vertex-shader", "fragment-shader1" );
    // Specify using Fragment_shader2 and vertex-shader as program2.
    var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    // Specify using Fragment_shader2 and vertex-shader2 as program3.
    var program3 = initShaders( gl, "vertex-shader2", "fragment-shader1" );

    // First use program1.
    gl.useProgram( program1 );


    // Load the data into the GPU


//The part that paints the sky.=======================================================
//using varying and attribute
    var skyVertices = [
      vec2(-1, 0.2),
      vec2(1, 0.2),
      vec2(-1, 1),
      vec2(1, 1)
    ]

    var skyColors = [
      vec4(0.0, 0.0, 0.0, 1.0),
      vec4(0.0, 0.0, 0.0, 1.0),
      vec4(0.0, 0.2, 0.6, 1.0),
      vec4(0.2, 0.2, 0.6, 1.0)
    ];

    var skyBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, skyBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(skyVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var skyColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, skyColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(skyColors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program1, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);



    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

//The part that draws a mountain behind.=======================================================
//using uniform and attribute

    var mountain1Vertices = [
      vec2(-0.1, 0.8),
      vec2(-0.7, 0.0),
      vec2(0.5, 0.0)
    ]

    // Change program to program1 to designate color using uniform.
    gl.useProgram( program2 );
    var mountain1BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain1BufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mountain1Vertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    // The color of the mountains is designated as RGB (0, 0.33, 0, 1).
    gl.uniform4fv(uColor, [0, 0.33, 0, 1]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );

//The part in front of the mountain.=======================================================
//using uniform
    var mountain2Vertices = [
      vec2(0.4, 0.65),
      vec2(-0.1, -0.15),
      vec2(0.9, -0.15)
    ]


    var mountain2BufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain2BufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mountain2Vertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    // The color of the mountains is designated as RGB (0, 0.43, 0, 1).
    gl.uniform4fv(uColor, [0, 0.43, 0, 1]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );


//The part that draws the body of a house.=======================================================
//using attribute
    var houseVertices = [
      vec2(-0.70, -0.5),
      vec2(0.0, -0.5),
      vec2(-0.70, 0),
      vec2(0.0, 0)
    ]

    //Change program to program1 to designate color using attribute.
    gl.useProgram( program1 );
    var houseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, houseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.61, 0.38, 0.21, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );




//The part that paints the roof of a house.=======================================================
//using attribute
    var houseVertices = [
      vec2(-0.81, 0),
      vec2(0.11, 0),
      vec2(-0.35, 0.35)
    ]

    var houseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, houseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.61, 0.38, 0.21, 1.0);

    gl.drawArrays( gl.TRIANGLES, 0, 3);



//House decoration=======================================================
//Show vertical lines at home
//using attribute
    var houseVertices = [
      vec2(-0.7, 0),
      vec2(-0.7, -0.5),
      vec2(-0.6, 0),
      vec2(-0.6, -0.5),
      vec2(-0.5, 0),
      vec2(-0.5, -0.5),
      vec2(-0.4, 0),
      vec2(-0.4, -0.5),
      vec2(-0.3, 0),
      vec2(-0.3, -0.5),
      vec2(-0.2, 0),
      vec2(-0.2, -0.5),
      vec2(-0.1, 0),
      vec2(-0.1, -0.5),
      vec2(-0.0, 0),
      vec2(-0.0, -0.5),
      vec2(-0.81, 0),
      vec2(0.11, 0)

    ]

    var houseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, houseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.25, 0, 0, 1.0);

    gl.drawArrays( gl.LINES, 0, 18);

//House window=======================================================
//using attribute

    //window frame
    var houseVertices = [
      vec2(-0.63, -0.34),
      vec2(-0.37, -0.34),
      vec2(-0.63, -0.1),
      vec2(-0.37, -0.1)
    ]

    var houseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, houseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.25, 0, 0, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    //window_glass1
    var windowVertices = [
      vec2(-0.6, -0.21),
      vec2(-0.51, -0.21),
      vec2(-0.6, -0.13),
      vec2(-0.51, -0.13)
    ]

    var windowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, windowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(windowVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.66, 1, 1, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    //window_glass2
    var windowVertices = [
      vec2(-0.49, -0.21),
      vec2(-0.40, -0.21),
      vec2(-0.49, -0.13),
      vec2(-0.40, -0.13)
    ]

    var windowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, windowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(windowVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.66, 1, 1, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    //window_glass3
    var windowVertices = [
      vec2(-0.6, -0.31),
      vec2(-0.51, -0.31),
      vec2(-0.6, -0.23),
      vec2(-0.51, -0.23)
    ]

    var windowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, windowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(windowVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.66, 1, 1, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    //window_glass4
    var windowVertices = [
      vec2(-0.49, -0.31),
      vec2(-0.40, -0.31),
      vec2(-0.49, -0.23),
      vec2(-0.40, -0.23)
    ]

    var windowBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, windowBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(windowVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.66, 1, 1, 1.0);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

//The part where a well is drawn using TRIGLE_FAN.=======================================================
//using uniform and attribute

    var wellVertices = [
      vec2(0.43, -0.6),
      vec2(0.6, -0.8),
      vec2(0.65, -0.73),
      vec2(0.67, -0.66),
      vec2(0.69, -0.59),
      vec2(0.66, -0.52),
      vec2(0.62, -0.41),
      vec2(0.58, -0.4),
      vec2(0.53, -0.38),
      vec2(0.43, -0.35),
      vec2(0.33, -0.38),
      vec2(0.28, -0.4),
      vec2(0.24, -0.41),
      vec2(0.20, -0.52),
      vec2(0.19, -0.59),
      vec2(0.18, -0.66),
      vec2(0.20, -0.73),
      vec2(0.25, -0.80),
      vec2(0.29, -0.82),
      vec2(0.34, -0.84),
      vec2(0.40, -0.85),
      vec2(0.45, -0.84),
      vec2(0.49, -0.83),
      vec2(0.51, -0.82),
      vec2(0.6, -0.8),
    ]

    // Change program to program1 to designate color using uniform.
    gl.useProgram( program2 );
    var wellBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, wellBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(wellVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.07, 0.27, 0.67, 1]);


    gl.drawArrays( gl.TRIANGLE_FAN, 0, 25);

//The part where a fence is drawn.=======================================================
//using uniform

    var fenceVertices = [
      vec2(-0.8, -0.65),
      vec2(0.1, -0.65),
      vec2(-0.8, -0.55),
      vec2(0.1, -0.55)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    //fense piler1
    var fenceVertices = [
      vec2(-0.75, -0.8),
      vec2(-0.65, -0.8),
      vec2(-0.75, -0.45),
      vec2(-0.65, -0.45)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    var fenceVertices = [
      vec2(-0.70, -0.40),
      vec2(-0.75, -0.45),
      vec2(-0.65, -0.45),
    ]
    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    //fense piler2
    var fenceVertices = [
      vec2(-0.575, -0.8),
      vec2(-0.475, -0.8),
      vec2(-0.575, -0.45),
      vec2(-0.475, -0.45)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    var fenceVertices = [
      vec2(-0.525, -0.40),
      vec2(-0.575, -0.45),
      vec2(-0.475, -0.45),
    ]
    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );


    //fense piler3
    var fenceVertices = [
      vec2(-0.4, -0.8),
      vec2(-0.3, -0.8),
      vec2(-0.4, -0.45),
      vec2(-0.3, -0.45)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    var fenceVertices = [
      vec2(-0.35, -0.40),
      vec2(-0.4, -0.45),
      vec2(-0.3, -0.45),
    ]
    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );


    //fense piler4
    var fenceVertices = [
      vec2(-0.225, -0.8),
      vec2(-0.125, -0.8),
      vec2(-0.225, -0.45),
      vec2(-0.125, -0.45)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    var fenceVertices = [
      vec2(-0.175, -0.40),
      vec2(-0.225, -0.45),
      vec2(-0.125, -0.45),
    ]
    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    //fense piler5
    var fenceVertices = [
      vec2(-0.05, -0.8),
      vec2(0.05, -0.8),
      vec2(-0.05, -0.45),
      vec2(0.05, -0.45)
    ]


    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    var fenceVertices = [
      vec2(0.0, -0.40),
      vec2(-0.05, -0.45),
      vec2(0.05, -0.45),
    ]
    var fenceBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenceBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenceVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var uColor = gl.getUniformLocation(program2, "uColor");
    gl.uniform4fv(uColor, [0.61, 0.38, 0.21, 1.0]);


    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    //fense strip
    var fenseVertices = [
      vec2(-0.8, -0.65),
      vec2(0.1, -0.65),
      vec2(-0.8, -0.55),
      vec2(0.1, -0.55),
      vec2(-0.8, -0.65),
      vec2(-0.8, -0.55),
      vec2(0.1, -0.65),
      vec2(0.1, -0.55),
      vec2(-0.75, -0.8),
      vec2(-0.65, -0.8),
      vec2(-0.75, -0.45),
      vec2(-0.75, -0.8),
      vec2(-0.65, -0.45),
      vec2(-0.65, -0.8),
      vec2(-0.70, -0.40),
      vec2(-0.75, -0.45),
      vec2(-0.70, -0.40),
      vec2(-0.65, -0.45),
      vec2(-0.575, -0.8),
      vec2(-0.475, -0.8),
      vec2(-0.575, -0.8),
      vec2(-0.575, -0.45),
      vec2(-0.475, -0.8),
      vec2(-0.475, -0.45),
      vec2(-0.525, -0.40),
      vec2(-0.575, -0.45),
      vec2(-0.525, -0.40),
      vec2(-0.475, -0.45),
      vec2(-0.4, -0.8),
      vec2(-0.3, -0.8),
      vec2(-0.4, -0.8),
      vec2(-0.4, -0.45),
      vec2(-0.3, -0.8),
      vec2(-0.3, -0.45),
      vec2(-0.35, -0.40),
      vec2(-0.4, -0.45),
      vec2(-0.35, -0.40),
      vec2(-0.3, -0.45),
      vec2(-0.225, -0.8),
      vec2(-0.125, -0.8),
      vec2(-0.225, -0.8),
      vec2(-0.225, -0.45),
      vec2(-0.125, -0.8),
      vec2(-0.125, -0.45),
      vec2(-0.175, -0.40),
      vec2(-0.225, -0.45),
      vec2(-0.175, -0.40),
      vec2(-0.125, -0.45),
      vec2(-0.05, -0.8),
      vec2(0.05, -0.8),
      vec2(-0.05, -0.8),
      vec2(-0.05, -0.45),
      vec2(0.05, -0.8),
      vec2(0.05, -0.45),
      vec2(0.0, -0.40),
      vec2(-0.05, -0.45),
      vec2(0.0, -0.40),
      vec2(0.05, -0.45),
      vec2(-0.81, 0),
      vec2(-0.35, 0.35),
      vec2(0.11, 0),
      vec2(-0.35, 0.35)
    ]

    //Change program to program1 to designate color using attribute.
    gl.useProgram( program1 );
    var fenseBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fenseBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(fenseVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.29, 0, 0, 1.0);

    gl.drawArrays( gl.LINES, 0, 62);

//The part where a grass is drawn.=======================================================
    var grassVertices =[
      vec2(-0.88, -0.83),
      vec2(-0.88, -0.88),
      vec2(-0.84, -0.84),
      vec2(-0.88, -0.88),
      vec2(-0.92, -0.84),
      vec2(-0.88, -0.88),

      vec2(-0.75, -0.13),
      vec2(-0.75, -0.18),
      vec2(-0.79, -0.14),
      vec2(-0.75, -0.18),
      vec2(-0.71, -0.14),
      vec2(-0.75, -0.18),

      vec2(-0.91, -0.43),
      vec2(-0.91, -0.48),
      vec2(-0.95, -0.44),
      vec2(-0.91, -0.48),
      vec2(-0.87, -0.44),
      vec2(-0.91, -0.48),

      vec2(0.41, -0.18),
      vec2(0.41, -0.25),
      vec2(0.45, -0.22),
      vec2(0.41, -0.26),
      vec2(0.37, -0.22),
      vec2(0.41, -0.26),

      vec2(0.01, -0.83),
      vec2(0.01, -0.88),
      vec2(0.05, -0.84),
      vec2(0.01, -0.88),
      vec2(-0.03, -0.84),
      vec2(0.01, -0.88),

      vec2(0.91, -0.43),
      vec2(0.91, -0.48),
      vec2(0.95, -0.44),
      vec2(0.91, -0.48),
      vec2(0.87, -0.44),
      vec2(0.91, -0.48),

    ];
    var grassBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, grassBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(grassVertices), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var vColor = gl.getAttribLocation( program1, "vColor" );
    gl.disableVertexAttribArray( vColor );
    gl.vertexAttrib4f(vColor, 0.27, 0.43, 0, 1.0);

    gl.drawArrays( gl.LINES, 0, 36);

    //direction
    document.getElementById("Direction").onclick = function () {
        console.log(event.button)
        direction = !direction;
    };

  //fish------------------------------------------------------------------
 gl.useProgram(program3);
  var vertices = [
      vec2(0.175, 0.3),
      vec2(0.3, 0.425),
      vec2(0.3, 0.175),
      vec2(0.275, 0.3),
      vec2(0.3, 0.3125),
      vec2(0.3, 0.2875),
      vec2(0.3, 0.425),
      vec2(0.3, 0.175),
      vec2(0.55 ,0.425),
      vec2(0.3, 0.175),
      vec2(0.55, 0.425),
      vec2(0.55, 0.175),
      vec2(0.55, 0.425),
      vec2(0.55, 0.175),
      vec2(0.675, 0.3),
      vec2(0.675, 0.3),
      vec2(0.8, 0.425),
      vec2(0.8, 0.175),
  ];

  var colors = [
      vec4(1,1,0,1),
      vec4(1,0.6,0,1),
      vec4(1,0.6,0,1),
      vec4(0,0,0,1),
      vec4(0,0,0,1),
      vec4(0,0,0,1),
      vec4(1,0.6,0,1),
      vec4(1,0.6,0,1),
      vec4(1,0,0,1),
      vec4(1,0.6,0,1),
      vec4(1,0,0,1),
      vec4(1,0,0,1),
      vec4(1,0,0,1),
      vec4(1,0,0,1),
      vec4(1,1,0,1),
      vec4(1,1,0,1),
      vec4(1,1,0,1),
      vec4(1,0.2,0,1)
  ];


  var bufferId = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

  // Associate vertex data buffer with shader variables

  var vPosition = gl.getAttribLocation( program3, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

  var vertexColorBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program3, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  thetaLoc = gl.getUniformLocation(program3,"theta");

  //decide direction
  theta += (direction ? 0.1 : -0.1);
  gl.uniform1f( thetaLoc, theta );
  gl.drawArrays( gl.TRIANGLES, 0, 21);


  //Draw star-------------------------------------------------------------------
  gl.useProgram(program1);

  canvas.addEventListener('mousedown', function(event){

    var cx = 2*event.clientX/canvas.width-1;
    var cy = 2*(canvas.height-event.clientY)/canvas.height-1;

    var t1_v1_x = cx - 0.025;
    var t1_v1_y = cy + 0.01;
    var t1_v2_x = cx;
    var t1_v2_y = cy - 0.01;
    var t1_v3_x = cx + 0.025;
    var t1_v3_y = cy + 0.01;

    var t2_v1_x = cx - 0.02;
    var t2_v1_y = cy - 0.03;
    var t2_v2_x = cx;
    var t2_v2_y = cy + 0.03;
    var t2_v3_x = cx;
    var t2_v3_y = cy - 0.01;

    var t3_v1_x = cx ;
    var t3_v1_y = cy + 0.03;
    var t3_v2_x = cx ;
    var t3_v2_y = cy - 0.01;
    var t3_v3_x = cx + 0.02;
    var t3_v3_y = cy - 0.03;


    //add star vertex in 'stars' array
    stars.push(t1_v1_x, t1_v1_y, t1_v2_x, t1_v2_y, t1_v3_x, t1_v3_y, t2_v1_x, t2_v1_y, t2_v2_x, t2_v2_y, t2_v3_x,
      t2_v3_y, t3_v1_x, t3_v1_y, t3_v2_x, t3_v2_y, t3_v3_x, t3_v3_y);

    index+=9; //vertex 9
});

var color = vec4(1.0, 1.0, 0.0, 1.0); //set color

var draw_Buffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, draw_Buffer);
//gl.bufferData( gl.ARRAY_BUFFER, flatten(t), gl.STATIC_DRAW );
gl.bufferData( gl.ARRAY_BUFFER, flatten(stars), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program1, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

var cBuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
gl.bufferData( gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vColor = gl.getAttribLocation( program1, "vColor" );
gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
gl.disableVertexAttribArray(vColor);
gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0);
gl.drawArrays( gl.TRIANGLES, 0, index);

requestAnimFrame(init);
};
