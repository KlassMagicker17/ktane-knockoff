//@ts-check
const colorList = ['red', 'yellow', 'green', 'cyan', 'blue', 'violet', 'white']
const shapeList = ['square-shape','circle-shape','triangle-shape','hexagon-shape','pentagon-shape']
const blueLookUpTable = [
    [1, 2, 1, 0],
    [0, 0, 2, 1],
    [2, 0, 1, 2],
    [0, 1, 2, 0]
]
const yellowLookUpTable = [
    [2, 0, 0, 1],
    [0, 1, 0, 2],
    [2, 1, 1, 2],
    [1, 2, 1, 0]
]
const patterns = [
    [
        ['A1', 'A3', 'A4', 'C1', 'C2', 'D4'],
        ['A4', 'B2', 'C2', 'C3', 'D1', 'D4'],
        ['A1', 'A4', 'B3', 'C2', 'C3', 'D1']
    ],
    [
        ['A3', 'A4', 'B1', 'B4', 'C2', 'D3'],
        ['A3', 'B3', 'C1', 'C2', 'C4', 'D3'],
        ['A2', 'A4', 'B1', 'C2', 'D3', 'D4']
    ],
    [
        ['A2', 'A4', 'B3', 'C2', 'D1', 'D3'],
        ['A1', 'B1', 'B2', 'C3', 'D1', 'D4'],
        ['A3', 'B2', 'B3', 'C1', 'C2', 'D4']
    ]
]
var moduleList = [];
const setting = JSON.parse(localStorage.getItem('ktaneSettings'))
var moduleCount = parseInt(setting.moduleNum)
console.log(setting)
var moduleFinished = 0
addEventListener('load', () => {
    makeModule(moduleCount)
    moduleList.push(new Timer(parseInt(setting.minute), parseInt(setting.second), 'timer'))
    for(let x = 0; x < moduleCount; x++) {
        let moduleRandom = randomNum(0,4)
        switch(moduleRandom) {
            case 0:
                createWireModule(x)
                break
            case 1:
                createSymbolModule(x)
                break
            case 2:
                createJumbleModule(x)
                break
            case 3:
                createColorModule(x)
                break
            case 4:
                createButtonModule(x)
        }
    }
})