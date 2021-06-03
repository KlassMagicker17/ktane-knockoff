//@ts-check
var wireColorList = ['red', 'yellow', 'green', 'cyan', 'blue', 'violet', 'white']
var symbolList = []
{
    let i = 0
    while (i < 5) {
        let j = 0
        let row = []
        while (j < 5) {
            row.push(`${i}${j}`)
            j++
        }
        symbolList.push(row)
        i++
    }
}
var moduleList = [];
var moduleCount = 4
addEventListener('load', () => {
    makeModule(moduleCount)
    moduleList.push(new Timer(5,0,0))
    for(let x = 1; x < moduleCount; x++) {
        let moduleRandom = randomNum(0,2)
        switch(moduleRandom) {
            case 0:
                createWireModule(x)
                break;
            case 1:
                createSymbolModule(x)
                break;
            case 2:
                createJumbleModule(x)
                break;
        }
    }

})