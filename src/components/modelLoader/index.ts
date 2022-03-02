import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default class ThreeJS {
  scene: THREE.Scene | null = null
  camera: THREE.PerspectiveCamera | null = null
  renderer: THREE.WebGLRenderer | null = null
  ambientLight: THREE.AmbientLight | null = null
  type: string = ''

  constructor() {
    this.init()
  }

  init(): void {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#1ab7ea')
    // var axis = new THREE.AxesHelper(10) // 3表示轴的长度
    // this.scene.add(axis)
    // let point = new THREE.AmbientLight(0xffffff, 2)
    var spotLight = new THREE.SpotLight(0xffffff, 1, 100)
    spotLight.position.set(0, 5, 0)
    this.scene.add(spotLight)
    var ambient = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambient) //将环境光添加到场景中
    this.setCamera()
    this.setRenderer()
    if (this.camera) {
      const controls = new OrbitControls(this.camera, this.renderer?.domElement)
      controls.update()
    }
    const loader = new GLTFLoader()
    loader.load(
      '/src/components/modelLoader/3Dmodel/scene.gltf',
      (gltf) => {
        this.scene?.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error(error)
      }
    )
    this.animate()
  }

  //   新建透视相机
  setCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 10
  }

  //   设置渲染器
  setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer()
    // 设置画布的大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    //这里 其实就是canvas 画布  renderer.domElement
    this.renderer.setClearColor(0xb9d3ff, 1)
    document.body.appendChild(this.renderer.domElement)
  }

  // 设置环境光
  setLight(): void {
    if (this.scene) {
      const skyColor = 0xb1e1ff // 蓝色
      const groundColor = 0xffffff // 白色
      const intensity = 1
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
      this.scene.add(light)
    }
  }

  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  animate(): void {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
  }
}
