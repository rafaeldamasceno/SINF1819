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
                company: 'demo',
                instance: 'DEFAULT',
                line: 'professional',
                grant_type: 'password'
            }
        ),
    });
}

export function makeHeaders(authentication) {
    return {
        'Authorization' : `Bearer ${authentication['access_token']}`,
        'Accept': 'application/json'
    };
}

export function loadItems(authentication) {
    return fetch(`${API_URL}/Base/Artigos/LstArtigos`, {
        headers: makeHeaders(authentication)
    });
}

export function query(authentication, query) {
    return fetch(`${API_URL}/Administrador/Consulta`, {
        headers: makeHeaders(authentication),
        body: `"${query}"`
    });
}