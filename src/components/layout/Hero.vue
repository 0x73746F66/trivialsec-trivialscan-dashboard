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
    mounted() {
        let canvas = document.getElementById('canv')
        let cw = canvas.width / 7
        let ch = canvas.height / 20
        let cw100 = cw * 10
        let ch100 = ch * 10

        let ctx = canvas.getContext('2d')

        let numArr = []
        let num = 25
        let fontSizeMax = 15
        let maxSpeed = 0.005
        let directionMax = 0.15
        let directionMin = -0.15
        let display = ['0', '1']
        let fonts = ['Georgia', 'Courier New']

        let color = 'rgba(26, 187, 156, 0.4)'

        const originalHeight = canvas.height
        const originalWidth = canvas.width

        render()
        function render() {
            const dpr = window.devicePixelRatio || 1
            canvas.style.width = '100vw'
            canvas.style.height = '100vh'
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight

            let ratio = Math.min(
                canvas.clientWidth / originalWidth,
                canvas.clientHeight / originalHeight
            )
            ctx.scale(ratio * dpr, ratio * dpr)
        }

        for (let i = 0; i < num; i++) {
            numArr.push({
                x: Math.random() * cw100 + cw,
                y: Math.random() * ch100 + ch + fontSizeMax,
                fs: Math.floor(Math.random() * fontSizeMax),
                spd: Math.random() * maxSpeed,
                dx:
                    Math.random() * (directionMax - directionMin) +
                    directionMin,
                dy:
                    Math.random() * (directionMax - directionMin) +
                    directionMin,
                content: display[Math.round(Math.random())]
            })
        }

        for (let i = 0; i < numArr.length - 1; i++) {
            let num = numArr[i]
            drawRandom(num.x, num.y, num.fs, num.content)
        }

        function updateNums() {
            for (let x = 0; x < numArr.length - 1; x++) {
                let num = numArr[x]
                num.x += num.dx
                num.y += num.dy
                num.fs -= num.spd
                if (
                    Math.floor(num.fs) === 0 ||
                    num.x > canvas.width ||
                    num.x < 0 ||
                    num.y > canvas.height ||
                    num.x < 0
                ) {
                    numArr.splice(x, 1)
                    numArr.push({
                        x: Math.random() * cw100 + cw,
                        y: Math.random() * ch100 + ch + fontSizeMax,
                        fs: Math.floor(Math.random() * fontSizeMax),
                        spd: Math.random() * maxSpeed,
                        dx:
                            Math.random() * (directionMax - directionMin) +
                            directionMin,
                        dy:
                            Math.random() * (directionMax - directionMin) +
                            directionMin,
                        content: display[Math.round(Math.random())]
                    })
                }
                drawRandom(num.x, num.y, num.fs, num.content)
            }
        }

        function changeDisplay() {
            let randomNum = Math.floor(Math.random() * numArr.length)
            let num = numArr[randomNum]
            if (Math.round(Math.random()) === 0) return
            num.content = display[Math.round(Math.random())]
        }

        function drawRandom(w, h, fs, content) {
            ctx.fillStyle = color
            ctx.font = `${fs.toString()}px ${fonts[Math.round(Math.random())]}`
            ctx.fillText(content, w, h)
        }

        function main() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            changeDisplay()
            updateNums()
            window.requestAnimationFrame(main)
        }

        window.requestAnimationFrame(main)
        setInterval(() => {
            const displays = [
                ['0', '1'],
                ['🪲', '🪲']
            ]
            display = displays[Math.round(Math.random())]
        }, 3000)
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
