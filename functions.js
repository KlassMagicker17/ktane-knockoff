function attributeCounter(array,attrName,attrValue) {
    count = 0
    for(let i = 0; i < array.length; i++) {
        if(array[i][attrName] === attrValue) count++
    }
    return count
}
function randomNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function makeModule(moduleCount=1) {
    i=0
    while(i < moduleCount) {
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
    while(i<randomNum(4,6)) {
        wireList.push(new Wire(wireColorList[Math.floor(wireColorList.length*Math.random())]))
        i++
    }
    moduleList.push(new BasicWireModule(wireList,x))
}
function createSymbolModule(x) {
    let r
    if(Math.random() > 0.5) r = 'row'
    else r = 'column'
    moduleList.push(new SymbolSequenceModule({direction:r,index:randomNum(0,4)},x))
}
function createJumbleModule(x) {
    const alphabeth = 'abcdefghijklmnopqrstuvwxyz'
    let tempString = ''
    let i = 0
    while(i<4) {
        tempString += alphabeth[Math.floor(Math.random()*alphabeth.length)]
        i++
    }
    moduleList.push(new WordJumbleModule(tempString.toUpperCase(),x))
}
function createColorModule(x) {
    
    moduleList.push(new ColorPaneModule([0,1],[1,0],x))
}

function jumbleWord(string,pattern) {
    let jumbled = []
    pattern.forEach(index => {
        jumbled.push(string.charAt(index))
    })
    return jumbled.join('')
}

function removeElem(id) {
    elem = document.getElementById(id)
    if(elem) elem.remove()
}
//for making the table
function writeCell(row, text) {
    let cell = document.createElement("td");
    let cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}
function writeTable(rowNum, columnNum) {
    let tbl = document.createElement("table")
    let tblBody = document.createElement("tbody")
    // creating all cells
    i=0
    while(i<rowNum) {
        let row = document.createElement('tr')
        j=0
        while(j<columnNum) {
            let column =document.createElement('td')
            // column.innerHTML = `${i}, ${j}`
            row.appendChild(column)
            j++
        }
        tblBody.appendChild(row)
        i++
    }
    tbl.appendChild(tblBody)
    return tbl
}