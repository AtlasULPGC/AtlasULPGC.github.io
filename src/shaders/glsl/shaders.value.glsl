#pragma glslify: no = require('./interpolations/no.interpolations.glsl')
#pragma glslify: trilinear = require('./interpolations/trilinear.interpolations.glsl')

// Support up to textureSize*textureSize*7 voxels

void value(in vec3 dataCoordinates,
           in int kernelSize,
           in int interpolationMethod,
           in ivec3 dataDimensions,
           in int textureSize,
           in sampler2D textureContainer0,
           in sampler2D textureContainer1,
           in sampler2D textureContainer2,
           in sampler2D textureContainer3,
           in sampler2D textureContainer4,
           in sampler2D textureContainer5,
           in sampler2D textureContainer6,
           in sampler2D textureContainer[7], // not working on Moto X 2014
           in int bitsAllocated, 
           in int numberOfChannels, 
           in int pixelType,
           out vec4 intensity
  ) {

  //
  // no interpolation for now...
  //

  if( interpolationMethod == 0){

    // no interpolation
    no(dataCoordinates,
       kernelSize,
       dataDimensions,
       textureSize,
       textureContainer0,
       textureContainer1,
       textureContainer2,
       textureContainer3,
       textureContainer4,
       textureContainer5,
       textureContainer6,
       textureContainer,
       bitsAllocated,
       numberOfChannels,
       pixelType,
       intensity);

  }
  else if( interpolationMethod == 1){

    // trilinear interpolation

    trilinear(dataCoordinates,
      kernelSize,
      dataDimensions,
      textureSize,
      textureContainer0,
      textureContainer1,
      textureContainer2,
      textureContainer3,
      textureContainer4,
      textureContainer5,
      textureContainer6,
      textureContainer,
      bitsAllocated,
      numberOfChannels,
      pixelType,
      intensity);

  }

}

#pragma glslify: export(value)