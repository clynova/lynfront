const cortarTexto = (texto, longitud) => {
    if (texto.length <= longitud) return texto;
    return texto.slice(0, longitud) + '...';
}


export { cortarTexto}