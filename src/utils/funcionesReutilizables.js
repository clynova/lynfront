const cortarTexto = (texto, longitud) => {
    if (texto.length <= longitud) return texto;
    return texto.slice(0, longitud) + '...';
}

const formateoNombre = (firstName, lastName) => {
    const nombreCompleto = `${firstName} ${lastName}`
    return nombreCompleto
}


export { cortarTexto, formateoNombre }