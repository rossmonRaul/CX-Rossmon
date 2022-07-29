export const ProcesarDatosApi = async (method, url, data) => {
    const myInit = {
        method: method,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            'Accept': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    };
    const myRequest = new Request(url, myInit);
    try {
        const response = await fetch(myRequest);
        if (response.ok) {
            return await response.json();
        } else {
            return {indicador: 500, mensaje: 'Ocurrio un error en el proceso!'}
        }
    } catch (error) {
        console.log(error);
    }
    
}