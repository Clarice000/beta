function pushIfPossible (direction: number) {
    locationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    pushedLocationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0] * 2, DIRECTION_VECTORS[direction][1] * 2)
    if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile0`) || tiles.tileAtLocationEquals(locationInDirection, sprites.dungeon.stairLadder)) {
        if (!(tiles.tileAtLocationIsWall(pushedLocationInDirection))) {
            if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile0`)) {
                tiles.setTileAt(locationInDirection, sprites.dungeon.floorDarkDiamond)
            } else {
                tiles.setTileAt(locationInDirection, sprites.dungeon.floorDark2)
            }
            tiles.setWallAt(locationInDirection, false)
            if (tiles.tileAtLocationEquals(pushedLocationInDirection, sprites.dungeon.floorDarkDiamond)) {
                tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile0`)
            } else {
                tiles.setTileAt(pushedLocationInDirection, sprites.dungeon.stairLadder)
            }
            tiles.setWallAt(pushedLocationInDirection, true)
            return true
        }
    }
    return false
}
function checkWin () {
    if (tiles.getTilesByType(sprites.dungeon.floorDarkDiamond).length == 0) {
        canMove = false
        playerSprite.sayText("Yay~")
        pause(1000)
        game.over(true)
    }
}
function onDirectionButtonDown (direction: number, spriteImage: Image) {
    if (canMove) {
        playerSprite.setImage(spriteImage)
        if (checkWall(direction)) {
            if (checkBox(direction)) {
                if (pushIfPossible(direction)) {
                    info.changeScoreBy(1)
                    grid.move(playerSprite, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
                    checkWin()
                }
            }
        } else {
            info.changeScoreBy(1)
            grid.move(playerSprite, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
        }
    }
}
function initConstants () {
    UP = [0, -1]
    RIGHT = [1, 0]
    DOWN = [0, 1]
    LEFT = [-1, 0]
    DIRECTION_VECTORS = [
    UP,
    RIGHT,
    DOWN,
    LEFT
    ]
}
// 0 - up
// 1 - right
// 2 - down 
// 3 - left
function checkBox (direction: number) {
    return tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), assets.tile`myTile0`) || tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), sprites.dungeon.stairLadder)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(3, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f f . . . . f f . . . 
        . . . . f . . . . . . . f . . . 
        . . . f . . f . . . . f f . . . 
        . . . f . . f . . . . f . . . . 
        . . . f f f . . . f f . . . . . 
        . . . f f f f f f . . . . . . . 
        . . . . . . f . . . f f . . . . 
        . . . . . . f . f f f . . . . . 
        . f f f f f f f f . . . . . . . 
        . . . . . . f f . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f . . f f . . . . . 
        . . f f f . . . . . f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(0, img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f f . . . 
        . . . . f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . f . . f f . . . 
        . . . . . f f f f f f f . . . . 
        . . f f f f . . f . . . . . . . 
        . . . . . . . . f f f . . . . . 
        . . . . . . . f f . f f . . . . 
        . . . . . . f f . . . f f f . . 
        . . . . . . f . . . . . . . . . 
        `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(1, img`
        . . . . . . . f f f f . . . . . 
        . . . . . f f f . . . f . . . . 
        . . . . f f . . . . f . f . . . 
        . . . f f . . . . . . . f . . . 
        . . . f . . . . . f f f f . . . 
        . . . f . . . . . . . . f . . . 
        . . . f f . . . . . . f f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . . f . . . . f f . . 
        . . . . . . f f . f f f f . . . 
        . . f f f f . f f f . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f . f f f . . . . . 
        . . . . . f . . . . f f . . . . 
        . . . f f . . . . . . . . . . . 
        `)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(2, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f f . . . . f f . . . 
        . . . f f . . . . . . . f . . . 
        . . . f . f . . . f . . f . . . 
        . . f f . f . . . f . . f . . . 
        . . . f . . . . . . . . f . . . 
        . . . f . . f f . . . f f . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . . . f . . . f f . . . 
        . . f f f f f f f f f f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f f . f f f f . . . . 
        . . . . f f . . . . . . . . . . 
        `)
})
// 0 - up
// 1 - right
// 2 - down 
// 3 - left
function checkWall (direction: number) {
    return tiles.tileAtLocationIsWall(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]))
}
let LEFT: number[] = []
let DOWN: number[] = []
let RIGHT: number[] = []
let UP: number[] = []
let pushedLocationInDirection: tiles.Location = null
let DIRECTION_VECTORS: number[][] = []
let locationInDirection: tiles.Location = null
let canMove = false
let playerSprite: Sprite = null
initConstants()
tiles.setCurrentTilemap(tilemap`level3`)
playerSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f f f . . . . 
    . . . . f f f . . . . f f . . . 
    . . . f f . . . . . . . f . . . 
    . . . f . f . . . f . . f . . . 
    . . f f . f . . . f . . f . . . 
    . . . f . . . . . . . . f . . . 
    . . . f . . f f . . . f f . . . 
    . . . . f f f f f f f . . . . . 
    . . . . . . . f . . . f f . . . 
    . . f f f f f f f f f f . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . f f f . . . . . . . 
    . . . . . f f . f f f f . . . . 
    . . . . f f . . . . . . . . . . 
    `, SpriteKind.Player)
grid.place(playerSprite, tiles.getTileLocation(6, 4))
canMove = true
info.setScore(0)
