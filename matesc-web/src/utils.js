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

export function unprocessedSuppliersOrdersFetch(authentication){
    return fetch(`${API_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body:JSON.stringify("SELECT CONCAT(CC.Serie, CC.NumDoc) as OrderId, CC.Entidade, CC.Nome, CC.DataDoc, CCS.Estado FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id AND CC.TipoDoc = 'ECF' AND CCS.Anulado = 'false' AND CCS.Fechado = 'false' AND CCS.Estado = 'P'"
        )
    });
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