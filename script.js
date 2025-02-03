class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.isWorkMode = true;
        this.timer = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.workButton = document.getElementById('work');
        this.breakButton = document.getElementById('break');

        // Event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workButton.addEventListener('click', () => this.setWorkMode());
        this.breakButton.addEventListener('click', () => this.setBreakMode());
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => {
                this.currentTime--;
                this.updateDisplay();

                if (this.currentTime === 0) {
                    this.playAlarm();
                    this.reset();
                    if (this.isWorkMode) {
                        this.setBreakMode();
                    } else {
                        this.setWorkMode();
                    }
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
    }

    reset() {
        this.pause();
        this.currentTime = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    setWorkMode() {
        this.isWorkMode = true;
        this.workButton.classList.add('active');
        this.breakButton.classList.remove('active');
        this.currentTime = this.workTime;
        this.updateDisplay();
        this.pause();
    }

    setBreakMode() {
        this.isWorkMode = false;
        this.breakButton.classList.add('active');
        this.workButton.classList.remove('active');
        this.currentTime = this.breakTime;
        this.updateDisplay();
        this.pause();
    }

    playAlarm() {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play();
    }
}

// Initialize the timer
const pomodoro = new PomodoroTimer(); 