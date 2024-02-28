function convertTemperature(value, inputUnit, outputUnit) {
    let result;
    let celsius;
    switch (inputUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
        default:
            return 'Unidad o Tipo de entrada no válida';
    }
    switch (outputUnit) {
        case 'celsius':
            result = celsius +'_'+ outputUnit;
            break;
        case 'fahrenheit':
            result = celsius * 9/5 + 32 +'_'+ outputUnit;
            break;
        case 'kelvin':
            result = celsius + 273.15 +'_'+ outputUnit;
            break;
        default:
            return 'Unidad de salida no válida';
    }
    return result;
}
module.exports = {convertTemperature};