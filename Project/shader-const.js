const shaders_dict = {}

// Fragment shader program

shaders_dict['vsSource'] = `
  varying lowp vec4 vColor;
  varying lowp vec3 vNormal;
  varying lowp vec3 vView;

  attribute vec2 aTextureCoord;

  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec3 aNormal;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;
  varying highp vec2 vTextureCoord;

  uniform vec3 uSourceAmbientColor;
  uniform vec3 uSourceDiffuseColor;
  uniform vec3 uSourceSpecularColor;
  uniform vec3 uSourcePosition;

  varying lowp vec3 sAColor;
  varying lowp vec3 sDColor;
  varying lowp vec3 sSColor;
  varying lowp vec3 sDirection;

  
  void main() {
    sAColor = uSourceAmbientColor;
    sDColor = uSourceDiffuseColor;
    sSColor = uSourceSpecularColor;

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;
    vNormal = vec3(uModelMatrix * vec4(aNormal, 0.0));
    vView = vec3(-uViewMatrix[0][2], -uViewMatrix[1][2], -uViewMatrix[2][2]);

    sDirection = vec3(uModelMatrix * vec4(aVertexPosition, 1.0)) - uSourcePosition;
    vTextureCoord = aTextureCoord;
  }
  `;

shaders_dict['fsLSource'] = `
  precision lowp float;
  varying lowp vec4 vColor;
  varying lowp vec3 vNormal;
  varying lowp vec3 vView;
  varying lowp vec3 sAColor;
  varying lowp vec3 sDColor;
  varying lowp vec3 sSColor;
  varying lowp vec3 sDirection;

  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main() {
      
      vec3 mat_ambient_color = vec3(vColor.x/5.0, vColor.y/5.0, vColor.z/5.0);
      vec3 mat_diffuse_color = vec3(vColor.x, vColor.y, vColor.z);
      vec3 mat_specular_color = vec3(vColor.x, vColor.y, vColor.z);
      float mat_shininess = 5000.0;

      vec3 source_ambient_color = sAColor;
      vec3 source_diffuse_color = sDColor;
      vec3 source_specular_color = sSColor;
      
      vec3 R = normalize(reflect(sDirection, normalize(vNormal)));
      vec3 V = normalize(vView);
      
      vec3 I_specular = source_specular_color * mat_specular_color * pow(max(-dot(R,V), 0.0), mat_shininess);
      vec3 I_ambient = source_ambient_color * mat_ambient_color;
      vec3 I_diffuse = source_diffuse_color * mat_diffuse_color * max(0.0, -(dot(vNormal, sDirection)/(length(vNormal)*length(sDirection))));
      vec3 I = I_ambient + I_diffuse + I_specular;
      gl_FragColor = vec4(I, 1.0)*vColor;
      gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
`;


// Fragment shader program

shaders_dict['fsSource'] = `
  precision lowp float;
  varying lowp vec4 vColor;
  varying lowp vec3 vNormal;
  varying lowp vec3 vView;

  void main(void) {
      gl_FragColor = vColor;
  }
  `;

shaders_dict['fsSSource'] = `
  precision lowp float;
  varying lowp vec4 vColor;
  varying lowp vec3 vNormal;
  varying lowp vec3 vView;
  varying lowp vec3 sAColor;
  varying lowp vec3 sDColor;
  varying lowp vec3 sSColor;
  varying lowp vec3 sDirection;

  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main() {
      
      vec3 mat_ambient_color = vec3(vColor.x/15.0, vColor.y/15.0, vColor.z/15.0);
      vec3 mat_diffuse_color = vec3(vColor.x, vColor.y, vColor.z);
      vec3 mat_specular_color = vec3(vColor.x, vColor.y, vColor.z);
      float mat_shininess = 5000.0;

      vec3 source_ambient_color = sAColor;
      vec3 source_diffuse_color = sDColor;
      vec3 source_specular_color = sSColor;
      
      vec3 R = normalize(reflect(sDirection, normalize(vNormal)));
      vec3 V = normalize(vView);
      
      vec3 I_specular = source_specular_color * mat_specular_color * pow(max(-dot(R,V), 0.0), mat_shininess);
      vec3 I_ambient = source_ambient_color * mat_ambient_color;
      vec3 I_diffuse = source_diffuse_color * mat_diffuse_color * max(0.0, -(dot(vNormal, sDirection)/(length(vNormal)*length(sDirection))));
      vec3 I = I_ambient + I_diffuse + I_specular;
      gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
  `;

 shaders_dict['fsSource'] = `
     varying highp vec2 vTextureCoord;
     varying highp vec3 vLighting;

     uniform sampler2D uSampler;

     void main(void) {
       highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

       gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
     }
   `;