// Phaser.js initial configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create a new game instance using the configuration
const game = new Phaser.Game(config);

let rocket, station;

function preload() {
    // Load game images
    this.load.image('rocket', 'https://via.placeholder.com/60x30.png?text=ElonRocket');
    this.load.image('station', 'https://via.placeholder.com/40x40.png?text=Station');
}

function create() {
    // Add background
    this.add.rectangle(400, 300, 800, 600, 0x000033); // Game background

    // Create rocket
    rocket = this.physics.add.sprite(100, 300, 'rocket').setCollideWorldBounds(true);

    // Create station
    station = this.physics.add.staticGroup();
    station.create(600, 500, 'station');

    // Collide rocket with station
    this.physics.add.collider(rocket, station, hitStation, null, this);

    // Rocket movement controls
    this.input.on('pointerdown', startDrag, this);
    this.input.on('pointermove', dragRocket, this);
    this.input.on('pointerup', launchRocket, this);
}

// Start dragging the rocket on mouse down
function startDrag(pointer) {
    if (!rocket.body.enable) return;
    rocket.setPosition(pointer.x, pointer.y);
}

// Drag rocket to new position
function dragRocket(pointer) {
    rocket.setPosition(pointer.x, pointer.y);
}

// Launch rocket towards the station
function launchRocket() {
    let dx = 600 - rocket.x;
    let dy = 500 - rocket.y;
    rocket.setVelocity(dx * 0.1, dy * 0.1);
}

// When rocket hits the station
function hitStation(rocket, station) {
    rocket.setPosition(100, 300);
    station.destroy();
    console.log("Station hit!");
}

// Update function (reset rocket if it goes off-screen)
function update() {
    if (rocket.y > 600 || rocket.x > 800 || rocket.x < 0) {
        rocket.setPosition(100, 300);
    }
}