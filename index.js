const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('views'));

app.get('/', (req, res) => {
    fs.readFile('./views/index.html', 'utf8', (err, data) => 
    {
        if (err) {
            console.error('Error al leer el archivo HTML:', err);
            return res.status(500).send('Error interno del servidor');
        }
        res.send(data);
    });
});

app.get('/convert', (req, res) => {

    const { type, value, inputUnit, outputUnit } = req.query;
    let result;

    switch (type) 
    {
        case 'temperature':
            result = convertTemperature(parseFloat(value), inputUnit, outputUnit);
            break;
        case 'weight':
            result = convertWeight(parseFloat(value), inputUnit, outputUnit);
            break;
        case 'length':
            result = convertLength(parseFloat(value), inputUnit, outputUnit);
            break;
    }
    if (result.startsWith('Unidad')) 
    {
        return res.status(400).send(result);
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado de la Conversión</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f3f3f3;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
    
            p {
                text-align: center;
                font-size: 24px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Resultado de la Conversión</h1>
            
            <p id="result">Resultado de la conversión: ${result} </p>
        </div>
    </body>
    </html>
     `);
});

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

function convertWeight(value, inputUnit, outputUnit) {
    let result;
    let grams;
    switch (inputUnit) {
        case 'gram':
        case 'grams':
            grams = value;
            break;
        case 'kilogram':
        case 'kilograms':
            grams = value * 1000;
            break;
        case 'miligram':
        case 'miligrams':
            grams = value / 1000;
            break;
        case 'ton':
        case 'tons':
            grams = value * 1000000;
            break;
        case 'pound':
        case 'pounds':
            grams = value * 453.592;
            break;
        default:
            return 'Unidad o Tipo de entrada no válida';
    }
    switch (outputUnit) {
        case 'gram':
        case 'grams':
            result = grams +'_'+ outputUnit;
            break;
        case 'kilogram':
        case 'kilograms':
            result = grams / 1000 +'_'+ outputUnit;
            break;
        case 'miligram':
        case 'miligrams':
            result = grams * 1000 +'_'+ outputUnit;
            break;
        case 'ton':
        case 'tons':
            result = grams / 1000000 +'_'+ outputUnit;
            break;
        case 'pound':
        case 'pounds':
            result = grams / 453.592 +'_'+ outputUnit;
            break;
        default:
            return 'Unidad de salida no válida';
    }
    return result;
}

function convertLength(value, inputUnit, outputUnit) {
    let result;
    let milimeters;
    switch (inputUnit) {
        case 'milimeter':
        case 'milimeters':
            milimeters = value;
            break;
        case 'centimeter':
        case 'centimeters':
            milimeters = value * 10;
            break;
        case 'meter':
        case 'meters':
            milimeters = value * 1000;
            break;
        case 'kilometer':
        case 'kilometers':
            milimeters = value * 1000000;
            break;
        case 'feet':
        case 'foot':
            milimeters = value * 304.8;
            break;
        case 'inch':
        case 'inches':
            milimeters = value * 25.4;
            break;
        case 'yard':
        case 'yards':
            milimeters = value * 914.4;
            break;
        default:
            return 'Unidad o Tipo de entrada no válida';
    }
    switch (outputUnit) {
        case 'milimeter':
        case 'milimeters':
            result = milimeters +'_'+ outputUnit;
            break;
        case 'centimeter':
        case 'centimeters':
            result = milimeters / 10 +'_'+ outputUnit;
            break;
        case 'meter':
        case 'meters':
            result = milimeters / 1000 +'_'+ outputUnit;
            break;
        case 'kilometer':
        case 'kilometers':
            result = milimeters / 1000000 +'_'+ outputUnit;
            break;
        case 'feet':
        case 'feets':
            result = milimeters / 304.8 +'_'+ outputUnit;
            break;
        case 'inch':
        case 'inchs':
            result = milimeters / 25.4 +'_'+ outputUnit;
            break;
        case 'yard':
        case 'yards':
            result = milimeters / 914.4 +'_'+ outputUnit;
            break;
        default:
            return 'Unidad de salida no válida';
    }
    return result;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});