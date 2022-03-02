import * as THREE from 'three'

export default class ThreeJS {
  scene: THREE.Scene | null = null
  camera: THREE.PerspectiveCamera | null = null
  renderer: THREE.WebGLRenderer | null = null
  ambientLight: THREE.AmbientLight | null = null
  mesh: THREE.Mesh | null = null
  line: THREE.Line | null = null
  type: string = ''

  constructor(type: string) {
    this.type = type
    this.init()
  }

  init(): void {
    this.scene = new THREE.Scene()
    this.setCamera()
    this.setRenderer()
    if (this.type === 'cube') {
      this.setCube()
    } else {
      this.setLine()
    }
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
    document.body.appendChild(this.renderer.domElement)
  }

  // 设置环境光
  setLight(): void {
    if (this.scene) {
      this.ambientLight = new THREE.AmbientLight(0xff0f1f) // 环境光
      this.scene.add(this.ambientLight)
    }
  }
  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.BoxGeometry() //创建一个立方体几何对象Geometry
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) //材质对象Material
      this.mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
      this.scene.add(this.mesh) //网格模型添加到场景中
      this.render()
    }
  }

  // 创建线条
  setLine(): void {
    if (this.scene) {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      const points = []
      points.push(new THREE.Vector3(-2, 0, 0))
      points.push(new THREE.Vector3(0, 2, 0))
      points.push(new THREE.Vector3(2, 0, 0))
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      this.line = new THREE.Line(geometry, material)
      this.scene.add(this.line) //网格模型添加到场景中
      this.render()
    }
  }

  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  animate(): void {
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this))
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.render()
    } else if (this.line) {
      requestAnimationFrame(this.animate.bind(this))
      this.line.rotation.z += 0.01
      //   this.line.rotation.y += 0.01
      this.render()
    }
  }
}
