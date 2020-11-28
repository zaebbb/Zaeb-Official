(() => {
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    let cw, ch, cx, cy;

    function resizeCanvas(){
        cw = cnv.width = innerWidth;
        ch = cnv.height = innerHeight;
        cx = cw / 2;
        cy = ch / 2;
    }
    resizeCanvas();

    window.addEventListener("resize",() => {
        resizeCanvas();
    });

    const cfg = {
        hue: 0,
        bgFillColor: 'rgba(50,50,50,0.05)',
        dirsCound: 6,
        stepsToTurn: 15,
        dotSize: 5,
        dotCount: 3000,
        dotVelocity: 4,
        dotDistance: 70,
        gradient: 1
    }

    function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco){
        ctx.globalCompositeOperation = gco;
        ctx.shadowColor = shadowColor || `black`;
        ctx.shadowBlur = shadowBlur || 1;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    class Dot{
        constructor(){
            this.pos = {x: cx, y: cy};
            this.dir = (Math.random() * 3 | 0) * 2;
            this.step = 0;
        }

        redrawDot(){
            let xy = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
            let makeHue = (cfg.hue + xy / cfg.gradient) % 360;
            let blur = cfg.dotSize - Math.sin(xy / 1) * 7;
            let color = `hsl(${makeHue}, 100%,50%)`;
            let size = cfg.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
            let x = this.pos.x - size / 2;
            let y = this.pos.y - size / 2;

            drawRect(color, x, y, size, size, color, blur, `lighter`);
        }

        moveDor(){
            this.step++;
            this.pos.x += dirsList[this.dir].x * cfg.dotVelocity;
            this.pos.y += dirsList[this.dir].y * cfg.dotVelocity;
        }

        changeDir(){
            if(this.step % cfg.stepsToTurn === 0){
                this.dir = Math.random() > .5 ? (this.dir + 1) % cfg.dirsCound : (this.dir + cfg.dirsCound - 1) % cfg.dirsCound;
            }
        }

        killDot(id){
            let percent = Math.random() * Math.exp(this.step / cfg.dotDistance);
            if(percent > 500){
                dotList.splice(id, 1)
            }
        }
    }

    let dirsList = [];

    function createDirs(){
        for(let i = 0; i < 360;i += 360 / cfg.dirsCound){
            let x = Math.cos(i * Math.PI / 180);
            let y = Math.sin(i * Math.PI / 180);
            dirsList.push({x: x, y: y});
        }
    }
    createDirs();
    let dotList = [];

    function addDot(){
        if(dotList.length < cfg.dotCount && Math.random() > .8);
        dotList.push(new Dot());
        cfg.hue = (cfg.hue + 1) % 360;
    }

    function refreshDot(){
        dotList.forEach((i, id) => {
            i.moveDor();
            i.redrawDot();
            i.changeDir();
            i.killDot(id);
        })
    }

    function loop(){
        drawRect(cfg.bgFillColor, 0, 0,cw, ch, 0 ,0 , `normal`);

        addDot();
        refreshDot();

        requestAnimationFrame(loop);
    }
    loop();
    
})()