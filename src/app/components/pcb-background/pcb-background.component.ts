import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'app-pcb-background',
  templateUrl: './pcb-background.component.html',
  styleUrls: ['./pcb-background.component.scss']
})
export class PcbBackgroundComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('canvasHost', { static: true })
  canvasHost!: ElementRef<HTMLDivElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private frameId = 0;

  private mouseX = 0;
  private mouseY = 0;

  private prefersReducedMotion = false;

  // Flowing circuit lines
  private lines: Array<{
    points: THREE.Vector3[];
    geometry: THREE.BufferGeometry;
    position: Float32Array;
    phase: number;
    speed: number;
    baseY: number;
    baseZ: number;
    amplitude: number;
  }> = [];

  // Floating signal particles
  private particles!: THREE.Points;
  private particlePositions!: Float32Array;
  private particleData: Array<{
    x: number;
    y: number;
    z: number;
    speed: number;
    phase: number;
    size: number;
  }> = [];


  // ============================================================
  // INITIALIZE
  // ============================================================

  ngAfterViewInit(): void {

    this.prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    this.initScene();

    this.createCircuitField();

    this.createParticles();

    this.createBackgroundGrid();

    this.animate();
  }


  // ============================================================
  // DESTROY
  // ============================================================

  ngOnDestroy(): void {

    cancelAnimationFrame(this.frameId);

    if (this.renderer) {
      this.renderer.dispose();
    }
  }


  // ============================================================
  // RESIZE
  // ============================================================

  @HostListener('window:resize')
  onResize(): void {

    if (!this.renderer || !this.camera) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect =
      width / height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      width,
      height
    );
  }


  // ============================================================
  // MOUSE
  // ============================================================

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    this.mouseX =
      (event.clientX / window.innerWidth) * 2 - 1;

    this.mouseY =
      (event.clientY / window.innerHeight) * 2 - 1;
  }


  // ============================================================
  // SCENE
  // ============================================================

  private initScene(): void {

    const host =
      this.canvasHost.nativeElement;


    // ----------------------------------------------------------
    // SCENE
    // ----------------------------------------------------------

    this.scene =
      new THREE.Scene();

    this.scene.background =
      new THREE.Color(0x01050c);


    // ----------------------------------------------------------
    // FOG
    // ----------------------------------------------------------

    this.scene.fog =
      new THREE.FogExp2(
        0x01050c,
        0.018
      );


    // ----------------------------------------------------------
    // CAMERA
    // ----------------------------------------------------------

    this.camera =
      new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
      );

    this.camera.position.set(
      0,
      3.2,
      13
    );

    this.camera.lookAt(
      0,
      0,
      0
    );


    // ----------------------------------------------------------
    // RENDERER
    // ----------------------------------------------------------

    this.renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });

    this.renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    host.appendChild(
      this.renderer.domElement
    );
  }


  // ============================================================
  // MAIN 3D CIRCUIT FIELD
  // ============================================================

  private createCircuitField(): void {

    /*
     * Large number of flowing blue circuit/data lines.
     *
     * The reference image has a very dense center and
     * lines disappearing into the distance.
     */

    const lineCount = 170;

    for (
      let i = 0;
      i < lineCount;
      i++
    ) {

      const points: THREE.Vector3[] = [];

      const pointCount = 75;

      const baseZ =
        THREE.MathUtils.randFloat(
          -5.5,
          5.5
        );

      const baseY =
        THREE.MathUtils.randFloat(
          -1.9,
          2.0
        );

      const amplitude =
        THREE.MathUtils.randFloat(
          0.15,
          0.75
        );

      const phase =
        Math.random() *
        Math.PI *
        2;

      const speed =
        THREE.MathUtils.randFloat(
          0.3,
          0.8
        );


      // --------------------------------------------------------
      // CREATE LINE POINTS
      // --------------------------------------------------------

      for (
        let j = 0;
        j < pointCount;
        j++
      ) {

        const t =
          j /
          (pointCount - 1);

        const x =
          -16 +
          t * 32;


        /*
         * Wave shape.
         *
         * This produces the flowing "digital ocean"
         * effect visible in your reference.
         */

        const wave =
          Math.sin(
            t * Math.PI * 4 +
            phase
          ) * amplitude;


        const secondWave =
          Math.sin(
            t * Math.PI * 9 +
            phase * 0.5
          ) * 0.12;


        /*
         * Stronger wave in the center.
         */

        const center =
          Math.exp(
            -Math.pow(
              (x / 8),
              2
            )
          );


        const y =
          baseY +
          wave * center +
          secondWave;


        /*
         * Depth movement.
         */

        const z =
          baseZ +
          Math.sin(
            t * Math.PI * 3 +
            phase
          ) *
          amplitude *
          0.8;


        points.push(
          new THREE.Vector3(
            x,
            y,
            z
          )
        );
      }


      // --------------------------------------------------------
      // GEOMETRY
      // --------------------------------------------------------

      const positions =
        new Float32Array(
          pointCount * 3
        );


      points.forEach(
        (point, index) => {

          positions[
            index * 3
          ] = point.x;

          positions[
            index * 3 + 1
          ] = point.y;

          positions[
            index * 3 + 2
          ] = point.z;
        }
      );


      const geometry =
        new THREE.BufferGeometry();


      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          positions,
          3
        )
      );


      // --------------------------------------------------------
      // LINE COLOR
      // --------------------------------------------------------

      const brightness =
        Math.random();


      let color: THREE.Color;


      if (brightness > 0.86) {

        color =
          new THREE.Color(
            0x159dff
          );

      } else if (brightness > 0.45) {

        color =
          new THREE.Color(
            0x075ca8
          );

      } else {

        color =
          new THREE.Color(
            0x06315f
          );
      }


      const material =
        new THREE.LineBasicMaterial({

          color,

          transparent: true,

          opacity:
            THREE.MathUtils.randFloat(
              0.15,
              0.55
            ),

          depthWrite: false
        });


      const line =
        new THREE.Line(
          geometry,
          material
        );


      this.scene.add(
        line
      );


      this.lines.push({

        points,

        geometry,

        position: positions,

        phase,

        speed,

        baseY,

        baseZ,

        amplitude
      });
    }
  }


  // ============================================================
  // PARTICLES
  // ============================================================

  private createParticles(): void {

    /*
     * These are the bright white/blue points from your
     * reference image.
     */

    const particleCount = 2800;

    this.particlePositions =
      new Float32Array(
        particleCount * 3
      );


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      const x =
        THREE.MathUtils.randFloat(
          -15,
          15
        );


      /*
       * Most particles stay around the center.
       */

      const centerStrength =
        Math.exp(
          -Math.pow(
            x / 12,
            2
          )
        );


      const y =
        THREE.MathUtils.randFloat(
          -2.5,
          2.5
        ) *
        (0.4 + centerStrength);


      const z =
        THREE.MathUtils.randFloat(
          -5,
          5
        );


      this.particlePositions[
        i * 3
      ] = x;

      this.particlePositions[
        i * 3 + 1
      ] = y;

      this.particlePositions[
        i * 3 + 2
      ] = z;


      this.particleData.push({

        x,

        y,

        z,

        speed:
          THREE.MathUtils.randFloat(
            0.002,
            0.009
          ),

        phase:
          Math.random() *
          Math.PI *
          2,

        size:
          THREE.MathUtils.randFloat(
            0.5,
            2.0
          )
      });
    }


    // ----------------------------------------------------------
    // GEOMETRY
    // ----------------------------------------------------------

    const geometry =
      new THREE.BufferGeometry();


    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        this.particlePositions,
        3
      )
    );


    // ----------------------------------------------------------
    // PARTICLE MATERIAL
    // ----------------------------------------------------------

    const material =
      new THREE.PointsMaterial({

        color: 0xdcecff,

        size: 0.075,

        transparent: true,

        opacity: 0.78,

        sizeAttenuation: true,

        depthWrite: false,

        blending:
          THREE.AdditiveBlending
      });


    this.particles =
      new THREE.Points(
        geometry,
        material
      );


    this.scene.add(
      this.particles
    );
  }


  // ============================================================
  // BACKGROUND CIRCUIT GRID
  // ============================================================

  private createBackgroundGrid(): void {

    /*
     * Very faint vertical/depth circuit lines.
     *
     * These make the background feel much deeper than
     * a normal particle animation.
     */

    const material =
      new THREE.LineBasicMaterial({

        color: 0x063263,

        transparent: true,

        opacity: 0.16,

        depthWrite: false
      });


    for (
      let i = 0;
      i < 70;
      i++
    ) {

      const x =
        THREE.MathUtils.randFloat(
          -17,
          17
        );


      const points = [

        new THREE.Vector3(
          x,
          -4,
          THREE.MathUtils.randFloat(
            -7,
            5
          )
        ),

        new THREE.Vector3(
          x,
          4,
          THREE.MathUtils.randFloat(
            -7,
            5
          )
        )
      ];


      const geometry =
        new THREE.BufferGeometry()
          .setFromPoints(
            points
          );


      const line =
        new THREE.Line(
          geometry,
          material
        );


      this.scene.add(
        line
      );
    }


    // ----------------------------------------------------------
    // HORIZONTAL DEPTH LINES
    // ----------------------------------------------------------

    for (
      let i = 0;
      i < 90;
      i++
    ) {

      const z =
        THREE.MathUtils.randFloat(
          -7,
          7
        );


      const geometry =
        new THREE.BufferGeometry()
          .setFromPoints([

            new THREE.Vector3(
              -18,
              THREE.MathUtils.randFloat(
                -3,
                3
              ),
              z
            ),

            new THREE.Vector3(
              18,
              THREE.MathUtils.randFloat(
                -3,
                3
              ),
              z
            )

          ]);


      const line =
        new THREE.Line(
          geometry,
          material
        );


      this.scene.add(
        line
      );
    }
  }


  // ============================================================
  // ANIMATION
  // ============================================================

  private animate = (): void => {

    this.frameId =
      requestAnimationFrame(
        this.animate
      );


    if (
      !this.prefersReducedMotion
    ) {

      // --------------------------------------------------------
      // MOVE CIRCUIT LINES
      // --------------------------------------------------------

      this.lines.forEach(
        (lineData) => {

          const positions =
            lineData.position;

          const pointCount =
            positions.length / 3;


          for (
            let i = 0;
            i < pointCount;
            i++
          ) {

            const t =
              i /
              (pointCount - 1);


            const x =
              -16 +
              t * 32;


            const wave =
              Math.sin(
                t * Math.PI * 4 +
                lineData.phase +
                performance.now() *
                0.00015 *
                lineData.speed
              ) *
              lineData.amplitude;


            const center =
              Math.exp(
                -Math.pow(
                  x / 8,
                  2
                )
              );


            const secondWave =
              Math.sin(
                t * Math.PI * 9 +
                lineData.phase
              ) * 0.12;


            positions[
              i * 3 + 1
            ] =
              lineData.baseY +
              wave * center +
              secondWave;


            positions[
              i * 3 + 2
            ] =
              lineData.baseZ +
              Math.sin(
                t * Math.PI * 3 +
                lineData.phase
              ) *
              lineData.amplitude *
              0.8;
          }


          lineData.geometry
            .attributes['position']
            .needsUpdate = true;
        }
      );


      // --------------------------------------------------------
      // MOVE PARTICLES
      // --------------------------------------------------------

      const now =
        performance.now() *
        0.001;


      for (
        let i = 0;
        i < this.particleData.length;
        i++
      ) {

        const data =
          this.particleData[i];


        let x =
          data.x +
          now *
          data.speed *
          5;


        /*
         * Loop particles around.
         */

        if (x > 16) {

          x = -16;
        }


        const wave =
          Math.sin(
            x * 0.7 +
            data.phase +
            now * 0.5
          );


        const center =
          Math.exp(
            -Math.pow(
              x / 8,
              2
            )
          );


        const y =
          data.y +
          wave *
          center *
          0.5;


        const z =
          data.z +
          Math.sin(
            x * 0.3 +
            data.phase
          ) *
          0.3;


        this.particlePositions[
          i * 3
        ] = x;

        this.particlePositions[
          i * 3 + 1
        ] = y;

        this.particlePositions[
          i * 3 + 2
        ] = z;
      }


      this.particles.geometry
        .attributes['position']
        .needsUpdate = true;


      // --------------------------------------------------------
      // CAMERA PARALLAX
      // --------------------------------------------------------

      this.camera.position.x =
        THREE.MathUtils.lerp(
          this.camera.position.x,
          this.mouseX * 1.1,
          0.025
        );


      this.camera.position.y =
        THREE.MathUtils.lerp(
          this.camera.position.y,
          3.2 -
          this.mouseY * 0.8,
          0.025
        );


      this.camera.lookAt(
        0,
        0,
        0
      );
    }


    this.renderer.render(
      this.scene,
      this.camera
    );
  };
}