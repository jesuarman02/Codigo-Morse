const codigoMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', 
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', 
    '7': '--...', '8': '---..', '9': '----.', ' ': ' '  // Cambio: uso de espacio simple en lugar de '/'
};

const textoMorse = (text) => {
    return text.toUpperCase().split('').map(char => codigoMorse[char] || '').join(' ');
};

const textoMorse1 = (morse) => {
    const morseInverse = Object.fromEntries(Object.entries(codigoMorse).map(([key, value]) => [value, key]));
    
    // Cambio: manejo de espacios triples para separar palabras
    return morse.split('   ').map(
        word => word.split(' ').map(code => morseInverse[code] || '').join('')
    ).join(' ');
};

const validacion = (text) => {
    const valid = /^[A-Za-z\s]+$/;
    return valid.test(text);
};

document.getElementById('convertirTexto').addEventListener('click', () => {
    const texto = document.getElementById('texto').value.trim();
    if (!texto) {
        Swal.fire('Error', 'Por favor, ingresa un texto para convertir a morse.', 'error');
        return;
    }
    if (!validacion(texto)) {
        Swal.fire('Error', 'El texto contiene caracteres inválidos. Solo se permiten letras.', 'error');
        return;
    }
    const resultado = textoMorse(texto);
    document.getElementById('morse').value = resultado;
});

document.getElementById('convertirMorse').addEventListener('click', () => {
    const morse = document.getElementById('morseInput').value.trim();
    if (!morse) {
        Swal.fire('Error', 'Por favor, ingresa código Morse.', 'error');
        return;
    }
    
    // Cambio: ya que eliminamos el '/', ahora se maneja usando espacios triples
    const resultado = textoMorse1(morse);
    document.getElementById('textoResultado').value = resultado;
});

document.getElementById('limpiarCampos').addEventListener('click', () => {
    document.getElementById('texto').value = '';
    document.getElementById('morse').value = '';
    document.getElementById('morseInput').value = '';
    document.getElementById('textoResultado').value = '';
});
