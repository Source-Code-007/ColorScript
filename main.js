let toastDiv = null
let customColorArr = []

//default color
function defaultColor(){
    return {
        randomColor1: 255,
        randomColor2: 102,
        randomColor3: 102
    }
}
window.addEventListener('load', () => {
    let color = defaultColor()
    randomColorApplyAll(color)
    main()
})

// DOM related function 
function main() {
    let hexInput = document.getElementById('hexInput')

    //Random Color Button event handler
    document.getElementById('randomColorBtn').addEventListener('click', () => {
        let color = generateColor()
        randomColorApplyAll(color)
    })

    // hexInput keyup event handler
    hexInput.addEventListener('keyup', (e) => {
        let currentHex = e.target.value
        let color = hexToDecimal(currentHex)
        hexInput.value = currentHex.toUpperCase()
        if (validateHex(currentHex)) {
            randomColorApplyAll(color)
        }
    })

    // random color change by range Event handler
    document.getElementById('randomColor1Range').addEventListener('change', randomColorGenerateByRange)
    document.getElementById('randomColor2Range').addEventListener('change', randomColorGenerateByRange)
    document.getElementById('randomColor3Range').addEventListener('change', randomColorGenerateByRange)

}

function randomColorGenerateByRange() {
    let randomColor1Range = document.getElementById('randomColor1Range').value
    let randomColor2Range = document.getElementById('randomColor2Range').value
    let randomColor3Range = document.getElementById('randomColor3Range').value
    let color = {
        randomColor1: parseInt(randomColor1Range),
        randomColor2: parseInt(randomColor2Range),
        randomColor3: parseInt(randomColor3Range),
    }
    randomColorApplyAll(color)
}

//copy color mode
function copyModeChecked(radioArr){
    let selectMode = null
    radioArr.forEach((v)=>{
        if(v.checked){
            selectMode = v.value
        }
    })
    return selectMode
}
document.getElementById('hexRgbCopyBtn').addEventListener('click', ()=>{
    let radioArr = document.getElementsByName('copyColorMode')
    if(toastDiv!=null){
        toastDiv.remove()
        toastDiv = null
    }
    if(copyModeChecked(radioArr) == 'hex'){
        if(validateHex(hexInput.value)){
            navigator.clipboard.writeText(`#${hexInput.value}`);
            toastMessage(`#${hexInput.value} copied!!`)
        } else{
            toastMessage(`#${hexInput.value} is invalid hex code!!`)
            toastDiv.style.backgroundColor = 'red'
        }
    }
    if(copyModeChecked(radioArr) == 'rgb'){
        navigator.clipboard.writeText(rgbInput.value)
        toastMessage(`${rgbInput.value} copied!!`)
    }
})


// color apply all in one function
function randomColorApplyAll(colorObj) {
    let hex = generateHex(colorObj)
    let rgb = generateRgb(colorObj)
    document.getElementById('bgDisplay').style.backgroundColor = hex
    document.getElementById('hexInput').value = hex.slice(1).toUpperCase()
    document.getElementById('rgbInput').value = rgb
    document.getElementById('randomColor1RangeLabel').innerText = colorObj.randomColor1
    document.getElementById('randomColor2RangeLabel').innerText = colorObj.randomColor2
    document.getElementById('randomColor3RangeLabel').innerText = colorObj.randomColor3
    document.getElementById('randomColor1Range').value = colorObj.randomColor1
    document.getElementById('randomColor2Range').value = colorObj.randomColor2
    document.getElementById('randomColor3Range').value = colorObj.randomColor3
}

//utility function
function generateColor() {
    let randomColor1 = Math.round(Math.random() * 250)
    let randomColor2 = Math.round(Math.random() * 250)
    let randomColor3 = Math.round(Math.random() * 250)
    return {
        randomColor1, randomColor2, randomColor3
    }
}

function generateRgb(colorObj) {
    return `rgb(${colorObj.randomColor1}, ${colorObj.randomColor2}, ${colorObj.randomColor3})`
}

function generateHex(colorObj) {
    function hexFix(value) {
        let hex = value.toString(16)
        return hex.length == 1 ? `0${hex}` : hex
    }
    return `#${hexFix(colorObj.randomColor1)}${hexFix(colorObj.randomColor2)}${hexFix(colorObj.randomColor3)}`
}

function hexToDecimal(hex) {
    let randomColor1 = parseInt(hex.slice(0, 2), 16)
    let randomColor2 = parseInt(hex.slice(2, 4), 16)
    let randomColor3 = parseInt(hex.slice(4), 16)
    return {
        randomColor1, randomColor2, randomColor3
    }
}

function toastMessage(message) {
    toastDiv = document.createElement('div')
    toastDiv.innerText = message
    toastDiv.classList = ('my-toast animation-in')
    document.body.appendChild(toastDiv)
    toastDiv.addEventListener('animationend', () => {
        toastDiv.classList.add('animation-out')
        toastDiv.addEventListener('animationend', () => {
            toastDiv.remove()
            toastDiv = null
        })
    })
}

// validate for Hex code (Regular Expression)
function validateHex(hex) {
    if (hex.length != 6) return false
    return /^[0-9A-F]{6}$/i.test(hex)
}



// Preset Color
const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',
];
function setPreset(){
    let presetAudio = new Audio('./copy-sound.wav')
    let presetContainer = document.querySelector('.preset-boxes')
    for(let i = 0; i<defaultPresetColors.length; i++){
                let div = document.createElement('div')
                div.className = 'preset-box h-10 bg-red-300 rounded-md cursor-pointer'
                div.setAttribute('data-color', defaultPresetColors[i])
                div.style.background = defaultPresetColors[i]
                presetContainer.appendChild(div)
    }
    presetContainer.addEventListener('click', e =>{
        if(e.target.classList.contains('preset-box')){
            presetAudio.play() //play beep audio
            presetAudio.volume = .3
            // console.log(e.target.getAttribute('data-color'))
            let colorHex = e.target.getAttribute('data-color')
            let colorObj = hexToDecimal(colorHex.slice(1))
            randomColorApplyAll(colorObj)
        }
    })
}
setPreset()




// Custom color  ***//***
document.getElementById('saveColorBtn').addEventListener('click', customColor)
function customColor(){
    let hexInp = document.getElementById('hexInput')

    //  add item to localStorage via customColorArr and UI could be allows maximum 10 items
if(JSON.parse(localStorage.getItem('customColor'))){
        // maximum 12 item could be added on UI
        if(JSON.parse(localStorage.getItem('customColor')).length >= 12){
            alert('You added maximum of custom color')
            return
        }
        // existing color check
        if(!(JSON.parse(localStorage.getItem('customColor')).includes(`#${hexInp.value}`))){       
            customColorArr = JSON.parse(localStorage.getItem('customColor'))
            customColorArr.unshift(`#${hexInp.value}`)
            localStorage.setItem('customColor', JSON.stringify(customColorArr))
        } else{
            alert('This color is already exist!')
            return
        }
    } else{    
        customColorArr.unshift(`#${hexInp.value}`)
        localStorage.setItem('customColor', JSON.stringify(customColorArr))
    }
    // Display custom color
    customColorDisplay()
}

// Display Custom Color Func ***
function customColorDisplay(){
    let customBoxes = document.querySelector('.custom-boxes')
    customBoxes.innerHTML = ''
  if(JSON.parse(localStorage.getItem('customColor'))){
    for(customColor of JSON.parse(localStorage.getItem('customColor'))){
        customBoxes.innerHTML += `
            <div class='h-10 bg-red-300 rounded-md cursor-pointer customBox' style='background:${customColor}'>
            </div>`
    }  
  }  
}
customColorDisplay()