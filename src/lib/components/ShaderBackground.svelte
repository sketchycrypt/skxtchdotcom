<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;

	const shaderToyCode = `
vec3 bgColor = vec3(0.15); 
vec3 rectColor = vec3(0.23);

//noise background
const float noiseIntensity = 2.8;
const float noiseDefinition = 0.6;
const vec2 glowPos = vec2(-2., 0.);

//rectangles
const float total = 60.;//number of rectangles
const float minSize = 0.03;//rectangle min size
const float maxSize = 0.08-minSize;//rectangle max size
const float yDistribution = 0.5;


float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise( in vec2 p )
{
    p*=noiseIntensity;
    vec2 i = floor( p );
    vec2 f = fract( p );
	vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

float fbm( in vec2 uv )
{	
	uv *= 5.0;
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    float f  = 0.5000*noise( uv ); uv = m*uv;
    f += 0.2500*noise( uv ); uv = m*uv;
    f += 0.1250*noise( uv ); uv = m*uv;
    f += 0.0625*noise( uv ); uv = m*uv;
    
	f = 0.5 + 0.5*f;
    return f;
}

vec3 bg(vec2 uv )
{
    float velocity = iTime/1.6;
    float intensity = sin(uv.x*3.+velocity*2.)*1.1+1.5;
    uv.y -= 2.;
    vec2 bp = uv+glowPos;
    uv *= noiseDefinition;

    //ripple
    float rb = fbm(vec2(uv.x*.5-velocity*.03, uv.y))*.1;
    //rb = sqrt(rb); 
    uv += rb;

    //coloring
    float rz = fbm(uv*.9+vec2(velocity*.35, 0.0));
    rz *= dot(bp*intensity,bp)+1.2;

    //bazooca line
    //rz *= sin(uv.x*.5+velocity*.8);


    vec3 col = bgColor/(.1-rz);
    return sqrt(abs(col));
}


float rectangle(vec2 uv, vec2 pos, float width, float height, float blur) {
    
    pos = (vec2(width, height) + .01)/2. - abs(uv - pos);
    pos = smoothstep(0., blur , pos);
    return pos.x * pos.y; 
   
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy * 2. - 1.;
    uv.x *= iResolution.x/iResolution.y;
    
    //bg
    vec3 color = bg(uv)*(2.-abs(uv.y*2.));
    
    //rectangles
    float velX = -iTime/8.;
    float velY = iTime/10.;
    for(float i=0.; i<total; i++){
        float index = i/total;
        float rnd = random(vec2(index));
        vec3 pos = vec3(0, 0., 0.);
        pos.x = fract(velX*rnd+index)*4.-2.0;
        pos.y = sin(index*rnd*1000.+velY) * yDistribution;
        pos.z = maxSize*rnd+minSize;
        vec2 uvRot = uv - pos.xy + pos.z/2.;
    	uvRot = rotate2d( i+iTime/2. ) * uvRot;
        uvRot += pos.xy+pos.z/2.;
        float rect = rectangle(uvRot, pos.xy, pos.z, pos.z, (maxSize+minSize-pos.z)/2.);
	    color += rectColor * rect * pos.z/maxSize;
    }
    
	fragColor = vec4(color, 1.0);
}
	`;

	const fragmentShader = `
		uniform vec3 iResolution;
		uniform float iTime;
		uniform vec4 iMouse;

		${shaderToyCode}

		void main() {
			mainImage(gl_FragColor, gl_FragCoord.xy);
		}
	`;

	const vertexShader = `
		void main() {
			gl_Position = vec4(position, 1.0);
		}
	`;

	onMount(() => {
		let animationFrameId: number;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });

		renderer.setPixelRatio(1);

		const uniforms = {
			iTime: { value: 0 },
			iResolution: { value: new THREE.Vector3() },
			iMouse: { value: new THREE.Vector4() }
		};

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms
		});

		const geometry = new THREE.PlaneGeometry(2, 2);
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			uniforms.iResolution.value.set(width, height, 1);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		const clock = new THREE.Clock();
		const animate = () => {
			uniforms.iTime.value = clock.getElapsedTime();
			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
		};
	});
</script>

<canvas bind:this={canvas} class="shader-canvas"></canvas>

<style>
	.shader-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		pointer-events: none;
	}
</style>