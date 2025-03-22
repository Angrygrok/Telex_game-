const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Gravity effect
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load the images for the game
    this.load.image('background', 'https://via.placeholder.com/800x600.png?text=Background');
    this.load.image('slingshot', 'https://via.placeholder.com/100x100.png?text=Slingshot');
    this.load.image('bird', 'https://via.placeholder.com/40x40.png?text=Bird');
}

function create() {
    // Add background
    this.add.image(400, 300, 'background');

    // Create slingshot (the launcher)
    this.slingshot = this.add.sprite(150, 450, 'slingshot');

    // Create bird that will be launched
    this.bird = this.physics.add.sprite(150, 450, 'bird');
    this.bird.setCollideWorldBounds(true);
    this.bird.setBounce(0.8);
    this.bird.setDrag(0.98); // Bird's drag, it will slow down over time

    // Add events for dragging and launching
    this.input.on('pointerdown', startDrag, this);
    this.input.on('pointermove', dragBird, this);
    this.input.on('pointerup', launchBird, this);
}

function update() {
    // Reset bird if it goes off screen
    if (this.bird.x < 0 || this.bird.x > 800 || this.bird.y > 600) {
        this.bird.setPosition(150, 450);
        this.bird.setVelocity(0, 0);
    }
}

let isDragging = false;

function startDrag(pointer) {
    isDragging = true;
}

function dragBird(pointer) {
    if (isDragging) {
        // Drag the bird inside the slingshot limits
        this.bird.x = Phaser.Math.Clamp(pointer.x, 100, 200);
        this.bird.y = Phaser.Math.Clamp(pointer.y, 400, 500);
    }
}

function launchBird() {
    if (isDragging) {
        isDragging = false;
        // Launch the bird by setting its velocity based on the drag distance
        let dx = 150 - this.bird.x;
        let dy = 450 - this.bird.y;
        this.bird.setVelocity(dx * 5, dy * 5); // Adjust the multiplier for more power
    }
}
