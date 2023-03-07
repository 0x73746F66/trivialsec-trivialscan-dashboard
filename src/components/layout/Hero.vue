<template>
    <div class="hero">
        <div
            class="d-flex flex-column align-items-center hero-content hero-icon padding-right-xl padding-left-xl w-100"
        >
            <IconTrivialSecurity
                width="150"
                class="margin-bottom-md margin-top-md"
            />
            <h1
                class="font-header-lg-b text-center font-color-primary margin-bottom-sm"
            >
                Trivial Security
            </h1>
            <div class="font-color-light text-center margin-bottom-md">
                <h2 class="font-base-b">
                    Stay informed of your attack surface. We track the hacker
                    exploits so you don't have to.
                </h2>
                <h3 class="font-sm">
                    Free service to identify your trivial to exploit
                    vulnerabilities, raising the Cybersecurity poverty line.
                </h3>
            </div>
        </div>
        <canvas
            id="canv"
            height="100"
            width="100"
            style="object-fit: contain"
        ></canvas>
    </div>
</template>
<script>
import IconTrivialSecurity from '@/components/icons/IconTrivialSecurity.vue'

export default {
    components: { IconTrivialSecurity },
    data() {
        return {
            canvas: null,
            ctx: null,
            objects: [],
            color: 'rgba(26, 187, 156, 0.4)',
            fonts: ['Georgia', 'Courier New'],
            totalObjects: 25,
            fontSizeMax: 120,
            maxSpeed: 0.005,
            directionMax: 0.5,
            directionMin: -0.5
        }
    },
    mounted() {
        this.canvas = document.getElementById('canv')
        const dpr = window.devicePixelRatio || 1
        this.canvas.style.width = '100vw'
        this.canvas.style.height = '100vh'
        this.canvas.width = this.canvas.offsetWidth
        this.canvas.height = this.canvas.offsetHeight

        const originalHeight = this.canvas.height
        const originalWidth = this.canvas.width
        const ratio = Math.min(
            this.canvas.clientWidth / originalWidth,
            this.canvas.clientHeight / originalHeight
        )
        this.ctx = this.canvas.getContext('2d')
        this.ctx.scale(ratio * dpr, ratio * dpr)
        for (let i = 0; i < this.totalObjects; i++) {
            this.objects.push(this.makeObject())
        }
        for (const object of this.objects) {
            this.drawRandom(object.x, object.y, object.fs, object.content)
        }
        window.requestAnimationFrame(this.main)
    },
    methods: {
        main() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.changeDisplay()
            this.update()
            window.requestAnimationFrame(this.main)
        },
        update() {
            for (let x = 0; x < this.objects.length - 1; x++) {
                let object = this.objects[x]
                object.x += object.dx
                object.y += object.dy
                object.fs -= object.spd
                if (
                    Math.floor(object.fs) === 0 ||
                    object.x > this.canvas.width ||
                    object.x < 0 ||
                    object.y > this.canvas.height ||
                    object.x < 0
                ) {
                    this.objects.splice(x, 1)
                    this.objects.push(this.makeObject())
                }
                this.drawRandom(object.x, object.y, object.fs, object.content)
            }
        },
        makeObject() {
            const display = ['0', '1']
            const cw = this.canvas.width / 5
            const ch = this.canvas.height / 5
            const cw100 = cw * 10
            const ch100 = ch * 10
            return {
                x: Math.random() * cw100 + cw,
                y: Math.random() * ch100 + ch + this.fontSizeMax,
                fs: Math.floor(Math.random() * this.fontSizeMax),
                spd: Math.random() * this.maxSpeed,
                dx:
                    Math.random() * (this.directionMax - this.directionMin) +
                    this.directionMin,
                dy:
                    Math.random() * (this.directionMax - this.directionMin) +
                    this.directionMin,
                content: display[Math.round(Math.random())]
            }
        },
        drawRandom(w, h, fs, content) {
            this.ctx.fillStyle = this.color
            this.ctx.font = `${fs.toString()}px ${
                this.fonts[Math.round(Math.random())]
            }`
            this.ctx.fillText(content, w, h)
        },
        changeDisplay() {
            let object =
                this.objects[Math.floor(Math.random() * this.objects.length)]
            if (Math.round(Math.random()) === 0) return
            object.content = object.content === '1' ? '0' : '1'
        }
    }
}
</script>

<style lang="scss">
.hero {
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    overflow: hidden;

    &-icon {
        position: absolute;
        filter: drop-shadow(0px 0px 4px color('dark-40'));
        z-index: 2;
    }

    &-scrolled {
        @media (min-width: breakpoints('lg')) {
            width: calc(breakpoints('lg') - 60px);
        }
        @media (min-width: breakpoints('xxl')) {
            width: calc(breakpoints('xxl') - 60px);
        }
    }
    .hero-content {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color('dark-60');
    }
}
</style>
