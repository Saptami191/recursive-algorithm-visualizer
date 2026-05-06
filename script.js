class HanoiApp {
    constructor() {
        this.pegs = {
            'A': [],
            'B': [],
            'C': []
        };
        this.numDisks = 4;
        this.moveCount = 0;
        this.recursionDepth = 0;
        this.maxDepthReached = 0;
        this.isSolving = false;
        this.speed = 500;
        this.moveQueue = [];
        this.diskSlider = document.getElementById('disk-slider');
        this.diskVal = document.getElementById('disk-val');
        this.speedSlider = document.getElementById('speed-slider');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.moveDisplay = document.getElementById('move-count');
        this.depthDisplay = document.getElementById('depth-count');
        this.maxDepthDisplay = document.getElementById('max-depth');
        this.traceLog = document.getElementById('trace-log');

        this.init();
    }

    init() {
        this.diskSlider.addEventListener('input', (e) => {
            this.numDisks = parseInt(e.target.value);
            this.diskVal.innerText = this.numDisks;
            this.reset();
        });

        this.speedSlider.addEventListener('input', (e) => {
            this.speed = 1100 - parseInt(e.target.value);
        });

        this.startBtn.addEventListener('click', () => this.start());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.reset();
    }

    reset() {
        this.isSolving = false;
        this.moveCount = 0;
        this.recursionDepth = 0;
        this.maxDepthReached = 0;
        this.moveQueue = [];
        this.pegs = { 'A': [], 'B': [], 'C': [] };
        
        for (let i = this.numDisks; i > 0; i--) {
            this.pegs['A'].push(i);
        }

        this.updateStats();
        this.render();
        this.traceLog.innerHTML = '<p class="placeholder">Waiting for start...</p>';
        this.startBtn.disabled = false;
    }

    updateStats() {
        this.moveDisplay.innerText = this.moveCount;
        this.depthDisplay.innerText = this.recursionDepth;
        this.maxDepthDisplay.innerText = this.maxDepthReached;
    }

    render() {
        const pegIds = ['A', 'B', 'C'];
        pegIds.forEach(id => {
            const container = document.querySelector(`#peg-${id} .disks`);
            container.innerHTML = '';
            this.pegs[id].forEach(diskSize => {
                const disk = document.createElement('div');
                disk.className = 'disk';
                disk.style.width = `${(diskSize / this.numDisks) * 100}%`;
                disk.style.backgroundColor = `var(--disk-${diskSize})`;
                disk.innerText = diskSize;
                container.appendChild(disk);
            });
        });
    }

    log(message, type = 'move') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerText = message;
        this.traceLog.prepend(entry);
    }

    async start() {
        if (this.isSolving) return;
        this.isSolving = true;
        this.startBtn.disabled = true;
        this.diskSlider.disabled = true;

        this.traceLog.innerHTML = '';
        this.log('>>> Starting Recursive Solver', 'recursion');
        
       
        await this.solveHanoi(this.numDisks, 'A', 'C', 'B');
        
        this.log('>>> Solution Complete', 'recursion');
        this.isSolving = false;
        this.diskSlider.disabled = false;
    }

    async solveHanoi(n, source, target, auxiliary) {
        
        this.recursionDepth++;
        if (this.recursionDepth > this.maxDepthReached) {
            this.maxDepthReached = this.recursionDepth;
        }
        this.updateStats();
        this.log(`Entering Depth ${this.recursionDepth}: Moving ${n} disks ${source} -> ${target}`, 'recursion');

        if (n === 1) {
            await this.performMove(source, target);
            this.recursionDepth--;
            this.updateStats();
            return;
        }

       
        await this.solveHanoi(n - 1, source, auxiliary, target);

        await this.performMove(source, target);

        await this.solveHanoi(n - 1, auxiliary, target, source);

        this.recursionDepth--;
        this.updateStats();
    }

    async performMove(source, target) {
        if (!this.isSolving) return;
        
        const disk = this.pegs[source].pop();
        this.pegs[target].push(disk);
        this.moveCount++;
        
        this.log(`Move ${this.moveCount}: Disk ${disk} from ${source} to ${target}`);
        this.updateStats();
        this.render();
        
        await new Promise(resolve => setTimeout(resolve, this.speed));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new HanoiApp();
});
