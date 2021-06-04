//@ts-check
// timer
class Timer {
    constructor(minute, second, moduleNum) {
        this.timerDom = document.getElementsByClassName('module')[moduleNum]
        this.timerDom.classList.add('timer')
        this.minute = minute
        this.second = second
        this.incrementTime()
    }
    incrementTime() {
        this.timer = setInterval(() => {
            this.second -= 0.01
            if (this.minute === 0 && this.second <= 0) {
                missionFailed()
            } else if (this.second <= 0) {
                this.minute--
                this.second = 60
            }
            let minuteText = '00' + this.minute
            let secondText = '00' + this.second.toFixed(2)
            this.timerDom.innerHTML = `${minuteText.substr(minuteText.length - 2)}:${secondText.substr(secondText.length - 5)}`
        }, 10)
    }
}
// indicator
class Indicator {
    constructor(moduleNum, classType) {
        this.indiDom = document.createElement('div')
        this.indiDom.classList.add('indi')
        this.deactivate = false
        this.moduleDom = document.getElementsByClassName('module')[moduleNum]
        this.moduleDom.classList.add(classType)
        this.moduleDom.append(this.indiDom)
    }
    finished() {
        this.indiDom.classList.add('deactivated')
        this.moduleDom.classList.add('module-deactivate')
        this.deactivate = true
        clearInterval(moduleList[0].timer)
    }
}
// wires
class BasicWireModule extends Indicator {
    constructor(wires, moduleNum) {
        super(moduleNum, 'basic-wire')
        this.wires = wires
        this.colorCount = {
            red: attributeCounter(this.wires, 'color', 'red'),
            green: attributeCounter(this.wires, 'color', 'green'),
            blue: attributeCounter(this.wires, 'color', 'blue'),
            yellow: attributeCounter(this.wires, 'color', 'yellow'),
            violet: attributeCounter(this.wires, 'color', 'violet'),
            cyan: attributeCounter(this.wires, 'color', 'cyan'),
            white: attributeCounter(this.wires, 'color', 'white')
        }
        this.correctWireIndex = this.correctWire()
        this.buildModule()
    }
    correctWire() {
        let last = this.wires.length - 1
        if (this.wires[3].color === 'red') return 1
        if (this.colorCount.green >= 2) return 0
        if (this.wires[0].color === 'violet') return last
        if (this.wires[last].color === 'yellow') return 3
        if (this.colorCount.white === 0) return 2

        switch (this.wires.length) {
            case 4:
                switch (this.wires[2].color) {
                    case 'red': return 0
                    case 'green': return 1
                    case 'blue': return 2
                    case 'yellow': return 0
                    case 'violet': return 1
                    case 'cyan': return 3
                    case 'white': return 2
                }
            case 5:
                switch (this.wires[4].color) {
                    case 'red': return 4
                    case 'green': return 2
                    case 'blue': return 1
                    case 'yellow': return 3
                    case 'violet': return 0
                    case 'cyan': return 0
                    case 'white': return 2
                }
            case 6:
                switch (this.wires[0].color) {
                    case 'red': return 4
                    case 'green': return 3
                    case 'blue': return 0
                    case 'yellow': return 5
                    case 'violet': return 1
                    case 'cyan': return 2
                    case 'white': return 4
                }
            default:
                return 1
        }
    }
    cutWire(wireIndex) {
        this.wires[wireIndex].cut()
        if (wireIndex === this.correctWireIndex) {
            this.finished()
        }
        else missionFailed()
    }
    buildModule() {
        for (let i = 0; i < this.wires.length; i++) {
            let wire = this.wires[i].wireDom
            wire.onclick = () => this.cutWire(i)
            this.moduleDom.appendChild(wire)
        }
    }
}
class Wire {
    constructor(color) {
        this.color = color
        this.wireDom = document.createElement('div')
        this.wireDom.classList.add('wire')
        this.wireDom.style.backgroundColor = this.color
    }
    cut() {
        let gap = document.createElement('div')
        gap.classList.add('wire-cut')
        this.wireDom.appendChild(gap)
    }
}
// symbol
class SymbolSequenceModule extends Indicator {
    constructor(sequence, moduleNum) {
        super(moduleNum, 'symbol-seq')
        this.direction = sequence.direction
        this.index = sequence.index
        this.sequence = this.sequenceParser()
        this.shownSequence = []
        this.currSymbol = 0
        this.buildModule()


    }
    checkSequence(symbolPressed) {
        if (this.sequence[this.currSymbol] === symbolPressed.symbol) {
            symbolPressed.press()
            this.currSymbol++
        } else {
            missionFailed()
        }
        if (this.currSymbol === this.shownSequence.length) {
            this.finished()
        }
    }
    buildModule() {
        let i = 0
        let tempSequence = this.sequence.slice()
        while (i < 4) {
            let r = Math.floor(Math.random() * tempSequence.length)
            this.shownSequence.push(new SymbolButton(tempSequence[r]))
            let currSymbol = this.shownSequence[this.shownSequence.length - 1]
            this.moduleDom.appendChild(currSymbol.symbolDom)
            currSymbol.symbolDom.onclick = () => this.checkSequence(currSymbol)
            tempSequence.splice(r, 1)
            i++
        }
        tempSequence.forEach(symbol => {
            let i = this.sequence.indexOf(symbol)
            this.sequence.splice(i, 1)
        })

    }
    sequenceParser() {
        let sequence = []
        if (this.direction === 'row') {
            let i = 0
            while (i < 5) {
                sequence.push(`${this.index}${i}`)
                i++
            }
            return sequence
        }
        if (this.direction === 'column') {
            let i = 0
            while (i < 5) {
                sequence.push(`${i}${this.index}`)
                i++
            }
            return sequence
        }
        return null
    }
}
class SymbolButton {
    constructor(symbol) {
        this.symbol = symbol
        this.symbolDom = document.createElement('div')
        this.symbolDom.classList.add('symbol')
        this.symbolImage = document.createElement('img')
        this.symbolImage.src = `assests/${this.symbol}.png`
        this.symbolDom.appendChild(this.symbolImage)
    }
    press() {
        this.symbolDom.classList.add('pressed')
    }
}

// word jubmel
class WordJumbleModule extends Indicator {
    constructor(word, moduleNum) {
        super(moduleNum, 'word-jumble')
        this.word = word
        this.input
        this.buildModule()
        this.correctString = this.correctStringFinder()
    }
    buildModule() {
        let wordHeading = document.createElement('h1')
        wordHeading.innerHTML = this.word
        this.moduleDom.appendChild(wordHeading)
        this.input = document.createElement('input')
        this.input.type = 'text'
        this.input.onchange = () => this.checkString()
        this.moduleDom.appendChild(this.input)
    }
    correctStringFinder() {
        const regex = new RegExp('[aeiou]');
        let correctWord = this.word
        const lastLetter = this.word.charAt(this.word.length - 1).toLowerCase()
        if (lastLetter === 'a' || lastLetter === 'e' || lastLetter === 'i' || lastLetter === 'o' || lastLetter === 'u') {
            correctWord = correctWord.split("").reverse().join("")
            console.log(correctWord)
        }
        switch (correctWord.charAt(0)) {
            case 'A':
            case 'K':
            case 'X':
                correctWord = jumbleWord(correctWord, [2, 3, 1, 0])
                break;
            case 'C':
            case 'M':
            case 'F':
                correctWord = jumbleWord(correctWord, [3, 2, 1, 0])
                break;
            case 'G':
            case 'J':
            case 'N':
                correctWord = jumbleWord(correctWord, [1, 0, 3, 2])
                break;
            case 'I':
            case 'R':
            case 'Q':
                correctWord = jumbleWord(correctWord, [3, 2, 0, 1])
                break;
            case 'D':
            case 'H':
            case 'O':
                correctWord = jumbleWord(correctWord, [2, 0, 3, 1])
                break;
            case 'L':
            case 'V':
            case 'Y':
                correctWord = jumbleWord(correctWord, [1, 2, 3, 0])
                break;
            case 'S':
            case 'W':
            case 'P':
                correctWord = jumbleWord(correctWord, [2, 3, 0, 1])
                break;
            case 'E':
            case 'U':
            case 'Z':
                correctWord = jumbleWord(correctWord, [1, 3, 0, 2])
                break;
            case 'B':
            case 'T':
                correctWord = jumbleWord(correctWord, [3, 0, 1, 2])
                break;
            default:
                console.log('ulol')
        }
        return correctWord
    }
    checkString() {
        console.log(this.input.value)
        if (this.input.value.toUpperCase() === this.correctString) {
            this.finished()
        } else {
            this.input.value = ''
            missionFailed()
        }
    }
}

// color pane
class ColorPaneModule extends Indicator {
    constructor(yellow, blue, moduleNum) {
        super(moduleNum, 'color-pane')
        this.yellowCircle = yellow
        this.blueCircle = blue
        this.buildModule()
        this.pattern = this.correctPattern()
        this.pressedTimes = 0
    }
    buildModule() {
        let table = buildTable(4, 4)
        placeCircle(table, this.blueCircle, 'blue')
        placeCircle(table, this.yellowCircle, 'yellow')
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                let row;
                switch (i) {
                    case 0:
                        row = 'A'
                        break;
                    case 1:
                        row = 'B'
                        break;
                    case 2:
                        row = 'C'
                        break;
                    case 3:
                        row = 'D'
                        break;
                    default:
                        console.log('something broke dude. color panel.')
                }

                table.rows[i].cells[j].onclick = () => {
                    table.rows[i].cells[j].classList.add('pattern')
                    this.cellPress(row + (j + 1))
                }
            }
        }
        this.moduleDom.appendChild(table)
    }
    correctPattern() {
        let row = blueLookUpTable[this.blueCircle[0]][this.blueCircle[1]]
        let column = yellowLookUpTable[this.yellowCircle[0]][this.yellowCircle[1]]
        return patterns[row][column]
    }
    cellPress(cell) {
        let correct = false
        this.pattern.forEach(spot => {
            if (cell === spot) {
                correct = true
            this.pressedTimes++

                return
            }
        })
        if(this.pressedTimes === this.pattern.length) {
            console.log('you won')
            this.finished()
        }
        if (correct) {
            return
        }
        missionFailed()
    }
}