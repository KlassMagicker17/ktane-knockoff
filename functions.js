//@ts-check
// utility functions
function attributeCounter(array, attrName, attrValue) {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i][attrName] === attrValue) count++
    }
    return count
}
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function makeModule(moduleCount = 1) {
    let i = 0
    while (i < moduleCount) {
        let module = document.createElement('div')
        module.classList.add('module')
        document.body.appendChild(module)
        i++
    }
}
function jumbleWord(string, pattern) {
    let jumbled = []
    pattern.forEach(index => {
        jumbled.push(string.charAt(index))
    })
    return jumbled.join('')
}
function placeCircle(table, pos, color) {
    let circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.borderColor = color
    table.rows[pos[0]].cells[pos[1]].appendChild(circle)
}
function buildTable(rowNum, columnNum) {
    let tbl = document.createElement("table")
    let tblBody = document.createElement("tbody")
    // creating all cells
    let i = 0
    while (i < rowNum) {
        let row = document.createElement('tr')
        let j = 0
        while (j < columnNum) {
            let cell = document.createElement('td')
            row.appendChild(cell)
            j++
        }
        tblBody.appendChild(row)
        i++
    }
    tbl.appendChild(tblBody)
    return tbl
}
// game conditions
function missionFailed() {
    alert('yow have died. work on your communication skills dipshit.')
    clearInterval(moduleList[0].timer)
}
function missionFinish() {
    let allDeactivated = true
    for (let i = 1; i < moduleList.length; i++) {
        if (!moduleList[i].deactivate) {
            allDeactivated = false
        }
    }
    if (allDeactivated) {
        clearInterval(moduleList[0].timer)
        alert('You won!')
    }
}
// module creation
function createWireModule(x) {
    let wireList = []
    let i = 0
    while (i < randomNum(3, 6)) {
        wireList.push(new Wire(colorList[Math.floor(colorList.length * Math.random())]))
        i++
    }
    moduleList.push(new BasicWireModule(wireList, x))
}
function createSymbolModule(x) {
    let r
    if (Math.random() > 0.5) r = 'row'
    else r = 'column'
    moduleList.push(new SymbolSequenceModule({ direction: r, index: randomNum(0, 4) }, x))
}
function createJumbleModule(x) {
    const alphabeth = 'abcdefghijklmnopqrstuvwxyz'
    let tempString = ''
    let i = 0
    while (i < 4) {
        tempString += alphabeth[Math.floor(Math.random() * alphabeth.length)]
        i++
    }
    moduleList.push(new WordJumbleModule(tempString.toUpperCase(), x))
}
function createColorModule(x) {
    let yellow = [randomNum(0, 3), randomNum(0, 3)]
    let blue = [randomNum(0, 3), randomNum(0, 3)]
    while (true) {
        if (yellow[0] === blue[0] && yellow[1] === blue[1]) {
            yellow = [randomNum(0, 3), randomNum(0, 3)]
            blue = [randomNum(0, 3), randomNum(0, 3)]
            console.log('same place')
        } else {
            break
        }
    }
    moduleList.push(new ColorPaneModule(yellow, blue, x))
}
function createButtonModule(x) {
    let symbolList = []
    for (let i = 0; i < randomNum(1,4); i++) {
        let shape = new SymbolShape(colorList[randomNum(0, colorList.length-1)],
         colorList[randomNum(0, colorList.length-1)],
          shapeList[randomNum(0,shapeList.length - 1)])
        symbolList.push(shape)
    }
    moduleList.push(new ButtonShapeModule(symbolList, x))
    console.log(symbolList)
}