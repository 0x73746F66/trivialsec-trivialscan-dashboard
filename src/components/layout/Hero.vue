<template>
  <div class="hero">
    <div
      class="d-flex flex-column align-items-center hero-content hero-icon padding-right-xl padding-left-xl w-100"
    >
      <IconTrivialSecurity width="150" class="margin-bottom-md margin-top-md" />
      <h1
        class="font-header-lg-b text-center font-color-primary margin-bottom-sm"
      >
        Trivial Security
      </h1>
      <div class="font-color-light text-center margin-bottom-md">
        <h2 class="font-base-b">
          Stay informed of your attack surface. We track the hacker exploits so you don't
          have to.
        </h2>
        <h3 class="font-sm">
          Free service to identify your trivial to exploit vulnerabilities, raising the
          Cybersecurity poverty line.
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
import IconTrivialSecurity from "../icons/IconTrivialSecurity.vue";

export default {
  components: { IconTrivialSecurity },
  mounted() {
    let canvas = document.getElementById("canv");
    var cw = canvas.width / 10;
    var ch = canvas.height / 10;
    var cw100 = cw * 10;
    var ch100 = ch * 10;

    let ctx = canvas.getContext("2d");

    let numArr = [];
    let num = 20;
    let fontSizeMax = 25;
    let maxSpeed = 0.05;
    let directionMax = 0.05;
    let directionMin = -0.05;
    let display = ["0", "1"];

    let color = "rgba(26, 187, 156, 0.6)";

    const originalHeight = canvas.height;
    const originalWidth = canvas.width;

    render();
    function render() {
      let dimensions = getObjectFitSize(
        true,
        canvas.clientWidth,
        canvas.clientHeight,
        canvas.width,
        canvas.height
      );
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      let ratio = Math.min(
        canvas.clientWidth / originalWidth,
        canvas.clientHeight / originalHeight
      );
      ctx.scale(ratio * dpr, ratio * dpr);
    }

    function getObjectFitSize(
      contains /* true = contain, false = cover */,
      containerWidth,
      containerHeight,
      width,
      height
    ) {
      var doRatio = width / height;
      var cRatio = containerWidth / containerHeight;
      var targetWidth = 0;
      var targetHeight = 0;
      var test = contains ? doRatio > cRatio : doRatio < cRatio;

      if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
      } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
      }

      return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2,
      };
    }

    for (var i = 0; i < num; i++) {
      numArr.push({
        x: Math.random() * cw100 + cw,
        y: Math.random() * ch100 + ch + fontSizeMax,
        fs: Math.floor(Math.random() * fontSizeMax),
        spd: Math.random() * maxSpeed,
        dx: Math.random() * (directionMax - directionMin) + directionMin,
        dy: Math.random() * (directionMax - directionMin) + directionMin,
        content: "0",
      });
    }

    for (var i = 0; i < numArr.length - 1; i++) {
      let num = numArr[i];
      drawRandom(num.x, num.y, num.fs, num.content);
    }

    function updateNums() {
      for (var x = 0; x < numArr.length - 1; x++) {
        let num = numArr[x];
        num.x += num.dx;
        num.y += num.dy;
        num.fs -= num.spd;
        if (
          Math.floor(num.fs) === 0 ||
          num.x > canvas.width ||
          num.x < 0 ||
          num.y > canvas.height ||
          num.x < 0
        ) {
          numArr.splice(x, 1);
          numArr.push({
            x: Math.random() * cw100 + cw,
            y: Math.random() * ch100 + ch + fontSizeMax,
            fs: Math.floor(Math.random() * fontSizeMax),
            spd: Math.random() * maxSpeed,
            dx: Math.random() * (directionMax - directionMin) + directionMin,
            dy: Math.random() * (directionMax - directionMin) + directionMin,
            content: "0",
          });
        }
        drawRandom(num.x, num.y, num.fs, num.content);
      }
    }

    function changeDisplay() {
      let randomNum = Math.floor(Math.random() * numArr.length);
      let num = numArr[randomNum];
      num.content = display[Math.round(Math.random())];
    }

    function drawRandom(w, h, fs = fontSizeMax, content) {
      ctx.fillStyle = color;
      ctx.font = fs.toString() + "px Arial";
      ctx.fillText(content, w, h);
    }

    function main() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      changeDisplay();
      updateNums();
      drawRandom();
      window.requestAnimationFrame(main);
    }

    window.requestAnimationFrame(main);
  },
};
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
    filter: drop-shadow(0px 0px 4px color("dark-40"));
    z-index: 2;
  }

  &-scrolled {
    @media (min-width: $breakpoint-lg) {
      width: calc($breakpoint-lg - 60px);
    }
    @media (min-width: $breakpoint-xxl) {
      width: calc($breakpoint-xxl - 60px);
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
    background: color("dark-60");
  }
}
</style>
