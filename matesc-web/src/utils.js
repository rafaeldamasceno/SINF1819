export const API_URL = 'http://localhost:2018/WebApi';

export function makeRequestBody(body) {
    let formData = new URLSearchParams();

    for (var key in body) {
      formData.append(key, body[key]);
    }

    return formData;
};

export function authenticate() {
    return fetch(`${API_URL}/token`, {
        method: 'POST',
        body: makeRequestBody(
            {
                username: 'FEUP',
                password: 'qualquer1',
                company: 'MATESC',
                instance: 'DEFAULT',
                line: 'professional',
                grant_type: 'password'
            }
        ),
    });
}

/*export function makeHeaders(authentication) {
    return {
        'Authorization' : `Bearer ${authentication['access_token']}`,
        'Accept': 'application/json'
    };
}*/

export function makeHeaders(authentication) {
    return {
        'Authorization' : `Bearer ${authentication['access_token']}`,
        'Content-Type': 'application/json'
    };
}

export function unprocessedClientOrdersFetch(authentication){
    return fetch(`${API_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body:JSON.stringify("SELECT CONCAT(CD.Serie, CD.NumDoc) as OrderId, CD.Entidade, CD.Nome, CD.Data, CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id AND CD.TipoDoc = 'ECL' AND CDS.Anulado = 'false' AND CDS.Fechado = 'false' AND CDS.Estado = 'P'")
    });
}

export function  compareStatesData(prevData, newData){
    if(prevData.length != newData.length){
        return false;
    }else{
        for (let i = 0; i < prevData.length; i++) {
            for (let j = 0; j < prevData[i].length; j++) {
                //continuar esta funçao
                
            }
            
        }
    }
}

export function loadItems(authentication) {
    return fetch(`${API_URL}/Base/Artigos/LstArtigos`, {
        headers: makeHeaders(authentication)
    });
}


export function query(authentication, query) {
    return fetch(`${API_URL}/Administrador/Consulta`, {
        method:'POST',
        headers: makeHeaders(authentication),
        body: `${query}`
    });
}