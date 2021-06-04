//@ts-check
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
function missionFailed() {
    alert('yow have died. work on your communication skills dipshit.')
    clearInterval(moduleList[0].timer)
}
function createWireModule(x) {
    let wireList = []
    let i = 0
    while (i < randomNum(4, 6)) {
        wireList.push(new Wire(wireColorList[Math.floor(wireColorList.length * Math.random())]))
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
    if(yellow[0] === blue[0] && yellow[1] === blue[1]) {
        blue = [randomNum(0, 3), randomNum(0, 3)]
        console.log('what.')
    }
    moduleList.push(new ColorPaneModule(yellow, blue, x))
}

function jumbleWord(string, pattern) {
    let jumbled = []
    pattern.forEach(index => {
        jumbled.push(string.charAt(index))
    })
    return jumbled.join('')
}

function placeCircle(table,pos, color) {
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