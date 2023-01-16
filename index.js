// Activitat 1

function createScoreBoard() {
    const board = {
        "The Best Ever": 1000000
    }
    return board;
}

function addPlayer(scoreBoard, player, score) {
    scoreBoard[player] = score;
    return scoreBoard;
}

function removePlayer(scoreBoard, player) {
    delete scoreBoard[player];
    return scoreBoard;
}

function updateScore(scoreBoard, player, points) {
    scoreBoard[player] += points;
    return scoreBoard;
}

function applyMondayBonus(scoreBoard) {
    for (let i in scoreBoard) {
        scoreBoard[i] += 100;

    }
    return scoreBoard;
}

function normalizeScore(params) {
    return params.normalizeFunction(params.score);
}

// Activitat 2


class Size {

    constructor(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }

    resize(newWidth, newHeight) {
        newWidth && this.setWidth(newWidth);
        newHeight && this.setHeight(newHeight);
    }

    setWidth(width = 80) {
        this.width = Math.max(width, 1);
    }
    setHeight(height = 60) {
        this.height = Math.max(height, 1);
    }

}

const size = new Size(1080, 764);

size.width;
size.height;

size.resize(1920, 1000);
size.width;
size.height;


class Position {
    constructor(x, y) {
        this.setX(x);
        this.setY(y)
    }
    setX(x = 0) {
        this.x = Math.max(x, 0);
    }
    setY(y = 0) {
        this.y = Math.max(y, 0);
    }
    move(newX, newY) {
        this.setX(newX);
        this.setY(newY)
    }
}

const point = new Position();
point.x;
point.y;

point.move(100, 200);
point.x;
point.y;


class ProgramWindow {

    constructor() {
        this.screenSize = new Size(800, 600);
        this.size = new Size();
        this.position = new Position();
    }
    resize(size) {
        const { width, height } = size;
        const x = this.checkResizeWidth(width);
        const y = this.checkResizeHeight(height);
        this.size.resize(x, y);
    }
    checkResizeWidth(width) {
        const screenWidth = this.screenSize.width;
        const positionX = this.position.x;
        const isOvershot = positionX + width > screenWidth;

        return isOvershot ? screenWidth - positionX : width;
    }
    checkResizeHeight(height) {
        const screenHeight = this.screenSize.height;
        const positionY = this.position.y;
        const isOvershot = positionY + height > screenHeight;

        return isOvershot ? screenHeight - positionY : height;
    }
    move(position) {
        const { x, y } = position;
        const newX = this.checkMoveX(x)
        const newY = this.checkMoveY(y);
        this.position.move(newX, newY);
    }
    checkMoveX(x) {
        const screenWidth = this.screenSize.width;
        const width = this.size.width;
        const isOvershot = width + x > screenWidth;
        return isOvershot ? screenWidth - width : x;
    }
    checkMoveY(y) {
        const screenHeight = this.screenSize.height;
        const height = this.size.height;
        const isOvershot = height + y > screenHeight;
        return isOvershot ? screenHeight - height : y;
    }
}

const programWindow = new ProgramWindow();
programWindow.screenSize.width;


function changeWindow(programWindow) {
    const size = new Size(400, 300);
    const position = new Position(100, 150);
    programWindow.resize(size);
    programWindow.move(position);

    return programWindow;
}

// Activitat 3

class ArgumentError extends Error {
    constructor() {
        super("El argumento está vacío!");
    }
}

class OverheatingError extends Error {
    constructor(temperature) {
        super("La temperatura es " + temperature + ". Sobrecalentamiento !");
        this.temperature = temperature;
    }
}

function checkHumidityLevel(humidityPercentage) {
    if (humidityPercentage > 70) { throw new Error('Error') }
    return "undefined"
    throw new Error('Implementar la función checkHumidity.');
}

function reportOverheating(temperature) {
    if (temperature) {
        if (temperature > 500) {
            throw new OverheatingError(temperature)
        }
        return "undefined"
    }
    throw new ArgumentError()
    throw new Error('Implementar la función reportOverheating.');
}

function monitorTheMachine(actions) {
    try {
        actions.check();
    } catch (error) {
        if (error instanceof ArgumentError) {
            actions.alertDeadSensor()
        } else if (error instanceof OverheatingError) {
            error.temperature >= 600 ? actions.shutdown() : actions.alertOverheating()
        } else {
            throw error
        }
    }

}