namespace SpriteKind {
    export const oxygen = SpriteKind.create()
}
namespace StatusBarKind {
    export const oxygen = StatusBarKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index < 5; index++) {
        dartboard_enemy_2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        dartboard_enemy_2 = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 7 7 7 7 7 7 7 . . . . . 
            . . . . 7 4 4 4 4 4 7 . . . . . 
            . . . . 7 4 8 8 8 4 7 . . . . . 
            . . . . 7 4 8 2 8 4 7 . . . . . 
            . . . . 7 4 8 8 8 4 7 . . . . . 
            . . . . 7 4 4 4 4 4 7 . . . . . 
            . . . . 7 7 7 7 7 7 7 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, randint(5, 155), randint(5, 155))
        projectile.follow(dart_shooter)
        statusbar.value = 100
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . f f . . . . 
        . . . 1 e e e e e e f f . . . . 
        . . 1 1 e e e e e e . . . . . . 
        . . . 1 e e e e e e f f . . . . 
        . . . . . . . . . . f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, dart_shooter, -150, 0)
    projectile2.setKind(SpriteKind.Projectile)
})
statusbars.onZero(StatusBarKind.oxygen, function (status) {
    game.splash("You ran out of oxygen")
    game.over(false)
})
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    game.splash("Do not hold Button B")
    game.over(false)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    game.splash("Do not hold button A ")
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.oxygen, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.oxygen, function (sprite, otherSprite) {
    statusbar.value += 100
    projectile3.destroy()
})
let projectile3: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let dartboard_enemy_2: Sprite = null
let statusbar: StatusBarSprite = null
let dart_shooter: Sprite = null
game.splash("Instructions: WASD or arrow keys to move. Your oxygen bar will go down overtime, if it reaches 0 you will die. Collect oxygen tanks to bring it up. Button A to shoot arrows at enemy dartboards, if touched will kill. Button B will reset your oxygen bar but will release fake clones of dartboard enemy's. Please do not spam or hold button A or B. It may result in lag or death.")
dart_shooter = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 1 1 1 1 1 1 1 1 1 1 . 
    . . . . 1 1 1 2 2 1 1 1 1 1 1 . 
    . . . . 2 2 2 2 2 2 2 2 2 2 1 . 
    . . . . . . . . . . . . . 2 1 . 
    . . . . 2 2 2 2 2 2 2 2 2 2 1 . 
    . . . . 1 1 1 2 2 1 1 1 1 1 1 . 
    . . . . 1 1 1 1 1 1 1 1 1 1 1 . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(dart_shooter)
dart_shooter.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.oxygen)
statusbar.attachToSprite(dart_shooter, -20, 0)
game.onUpdateInterval(1000, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . . 7 4 4 4 4 4 7 . . . . . 
        . . . . 7 4 8 8 8 4 7 . . . . . 
        . . . . 7 4 8 2 8 4 7 . . . . . 
        . . . . 7 4 8 8 8 4 7 . . . . . 
        . . . . 7 4 4 4 4 4 7 . . . . . 
        . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, randint(5, 155), randint(5, 155))
    projectile.setKind(SpriteKind.Enemy)
    projectile.follow(dart_shooter)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -2
})
game.onUpdateInterval(10000, function () {
    projectile3 = sprites.createProjectileFromSide(img`
        ..............................
        ............6666..............
        ...........66..661111111111111
        ....66666666....66...........1
        .................66..222222..1
        ..................6..2....2..1
        ..................6..2....2..1
        ..................6..2....2..1
        ..................6.22....2..1
        ..................6.2222222..1
        ..................6..222.....1
        ..................6..........1
        ..................6.2....2...1
        ..................6..2..2...1.
        ..................6...22....1.
        ..................6...22....1.
        .............666666..2..2...1.
        .........6666.......2....2..1.
        .......666..................1.
        ......66.............2...2..1.
        .....66...............2.2....1
        .....11................2.....1
        ......1...2222........2......1
        ......1...2..........2.......1
        .......1..2......22.2.2..2...1
        .......11.2..222.2....2.2.2..1
        ........1.2...2..22...22...2.1
        ........1122222..2....2....2.1
        .........11......22...2....2.1
        ...........1111111111111111111
        `, 50, 50)
    projectile3.setKind(SpriteKind.oxygen)
})
