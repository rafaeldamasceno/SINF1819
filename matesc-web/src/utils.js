import React from 'react';
import {
    Alert,
} from 'reactstrap';

export const PRIMAVERA_URL = 'http://localhost:2018/WebApi';
export const MATESC_URL = 'http://localhost:3001';

export function makeRequestBody(body) {
    let formData = new URLSearchParams();

    for (var key in body) {
        formData.append(key, body[key]);
    }

    return formData;
};

export function authenticate(username, password) {
    return fetch(`${PRIMAVERA_URL}/token`, {
        method: 'POST',
        body: makeRequestBody(
            {
                username: username,
                password: password,
                company: 'MATESC',
                instance: 'DEFAULT',
                line: 'professional',
                grant_type: 'password'
            }
        ),
    });
}

export function makeHeaders(authentication) {
    return {
        'Authorization': `Bearer ${authentication['access_token']}`,
        'Content-Type': 'application/json'
    };
}

export function unprocessedClientOrdersFetch(authentication) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT CONCAT(CD.Serie, CD.NumDoc) as OrderId, CD.Entidade, CD.Nome, CD.Data, CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id AND CD.TipoDoc = 'ECL' AND CDS.Anulado = 'false' AND CDS.Fechado = 'false' AND CDS.Estado = 'P'"`
    });
}

export function unprocessedSuppliersOrdersFetch(authentication) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT CONCAT(CC.Serie, CC.NumDoc) as OrderId, CC.Entidade, CC.Nome, CC.DataDoc, CCS.Estado FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id AND CC.TipoDoc = 'ECF' AND CCS.Anulado = 'false' AND CCS.Fechado = 'false' AND CCS.Estado = 'P'"`
    });
}

export async function supplierOrderInfoContent(authentication, Doc_Serie, Doc_Number) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT CONCAT(CC.Serie, CC.NumDoc) as OrderId, CC.DataDoc, CC.Nome, CC.Entidade, SUM(LC.PrecUnit*LC.Quantidade + LC.TotalIva) as PrecoTotal FROM LinhasCompras LC INNER JOIN CabecCompras CC ON LC.IdCabecCompras = CC.Id WHERE CC.Serie = '${Doc_Serie}' AND CC.NumDoc = ${Doc_Number} AND CC.TipoDoc = 'ECF' GROUP BY CC.DataDoc, CC.Nome, CC.Entidade, CC.Id, CC.Serie, CC.NumDoc"`
    });
}

export function supplierOrderContent(authentication, Doc_Serie, Doc_Number) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, Artigos.* FROM ArmazemLocalizacoes INNER JOIN (SELECT ArtigosLinhas.*, (Artigo.Peso * ArtigosLinhas.Quantidade) as PesoTotal, (Artigo.Volume * ArtigosLinhas.Quantidade) as VolumeTotal, Artigo.Peso as PesoUnit, Artigo.Volume as VolumeUnit FROM Artigo INNER JOIN (SELECT LC.Artigo, LC.Descricao, LC.Localizacao, LC.Quantidade FROM LinhasCompras LC INNER JOIN CabecCompras CC ON LC.IdCabecCompras = CC.Id WHERE CC.Serie = '${Doc_Serie}' AND CC.NumDoc = ${Doc_Number} AND CC.TipoDoc = 'ECF') as ArtigosLinhas ON ArtigosLinhas.Artigo = Artigo.Artigo) as Artigos ON ArmazemLocalizacoes.Localizacao = Artigos.Localizacao"`
    });
}

export async function clientOrderInfoContent(authentication, Doc_Serie, Doc_Number) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT CONCAT(CD.Serie, CD.NumDoc) as OrderId, CD.Data, CD.Nome, CD.Entidade, SUM(LD.PrecUnit*LD.Quantidade + LD.TotalIva) as PrecoTotal FROM LinhasDoc LD INNER JOIN CabecDoc CD ON LD.IdCabecDoc = CD.Id WHERE CD.Serie = '${Doc_Serie}' AND CD.NumDoc = ${Doc_Number} AND CD.TipoDoc = 'ECL' GROUP BY CD.Data, CD.Nome, CD.Entidade, CD.Id, CD.Serie, CD.NumDoc"`
    });
}

export function clientOrderContent(authentication, Doc_Serie, Doc_Number) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, Artigos.* FROM ArmazemLocalizacoes INNER JOIN (SELECT ArtigosLinhas.*, (Artigo.Peso * ArtigosLinhas.Quantidade) as PesoTotal, (Artigo.Volume * ArtigosLinhas.Quantidade) as VolumeTotal, Artigo.Peso as PesoUnit, Artigo.Volume as VolumeUnit FROM Artigo INNER JOIN (SELECT LD.Artigo, LD.Descricao, LD.Localizacao, LD.Quantidade FROM LinhasDoc LD INNER JOIN CabecDoc CD ON LD.IdCabecDoc = CD.Id WHERE CD.Serie = '${Doc_Serie}' AND CD.NumDoc = ${Doc_Number} AND CD.TipoDoc = 'ECL') as ArtigosLinhas ON ArtigosLinhas.Artigo = Artigo.Artigo) as Artigos ON ArmazemLocalizacoes.Localizacao = Artigos.Localizacao"`
    });
}

export function itemsInStock(authentication) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, ArtigoArmazem.* FROM ArmazemLocalizacoes INNER JOIN (SELECT Inv.Artigo, A.Descricao as Nome, Inv.Localizacao as Localizacao, ISNULL(Inv.StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem Inv INNER JOIN Artigo A ON Inv.Artigo = A.Artigo WHERE Inv.StkActual IS NOT NULL AND Inv.StkActual > 0) as ArtigoArmazem ON ArmazemLocalizacoes.Localizacao = ArtigoArmazem.Localizacao"`
    });
}

export function itemsOutOfStock(authentication) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, ArtigoArmazem.* FROM ArmazemLocalizacoes INNER JOIN (SELECT Inv.Artigo, A.Descricao as Nome, Inv.Localizacao as Localizacao, ISNULL(Inv.StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem Inv INNER JOIN Artigo A ON Inv.Artigo = A.Artigo WHERE Inv.StkActual IS NULL OR Inv.StkActual = 0) as ArtigoArmazem ON ArmazemLocalizacoes.Localizacao = ArtigoArmazem.Localizacao"`
    });
}

export function itemsToStore(authentication){
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT Armazem, Artigos.*, ISNULL(V_INV_ArtigoArmazem.StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem INNER JOIN (SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, Artigo.Artigo , Artigo.Descricao FROM Artigo INNER JOIN ArmazemLocalizacoes ON ArmazemLocalizacoes.Localizacao = Artigo.LocalizacaoSugestao) AS Artigos ON V_INV_ArtigoArmazem.Artigo=Artigos.Artigo AND V_INV_ArtigoArmazem.Armazem='A2'"`
    });
}

export function getItem(authentication, item, warehouse){
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `"SELECT Armazem, Artigos.*, ISNULL(V_INV_ArtigoArmazem.StkActual, 0) AS StkActual, (PesoUnit * StkActual) as PesoTotal, (VolumeUnit * StkActual) as VolumeTotal FROM V_INV_ArtigoArmazem INNER JOIN (SELECT ArmazemLocalizacoes.Descricao as DescricaoLocalizacao, Artigo.Artigo , Artigo.Descricao, ArmazemLocalizacoes.Localizacao, Artigo.Peso as PesoUnit, Artigo.Volume as VolumeUnit FROM Artigo INNER JOIN ArmazemLocalizacoes ON ArmazemLocalizacoes.Localizacao = Artigo.LocalizacaoSugestao) AS Artigos ON V_INV_ArtigoArmazem.Artigo=Artigos.Artigo AND V_INV_ArtigoArmazem.Armazem='${warehouse}' AND Artigos.Artigo='${item}'"`
    });
}

export function createPickingWave(orders) {
    return fetch(`${MATESC_URL}/picking-wave`, {
        method: 'POST',
        body: JSON.stringify(orders),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function createReplenishmentWave(orders) {
    return fetch(`${MATESC_URL}/resupply-wave`, {
        method: 'POST',
        body: JSON.stringify(orders),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getPickingWaves() {
    return fetch(`${MATESC_URL}/picking-wave/unfinished`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getReplenishmentWaves() {
    return fetch(`${MATESC_URL}/resupply-wave`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getPickingWave(id){
    return fetch(`${MATESC_URL}/picking-wave/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function putFinishedPickingList(id){
    return fetch(`${MATESC_URL}/picking-wave/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function errorMessage(error) {
    if (error) {
        return (
            <Alert color="danger"> Erro do Primavera</Alert>
        )
    }
}


export function loadItems(authentication) {
    return fetch(`${PRIMAVERA_URL}/Base/Artigos/LstArtigos`, {
        headers: makeHeaders(authentication)
    });
}


export function query(authentication, query) {
    return fetch(`${PRIMAVERA_URL}/Administrador/Consulta`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: `${query}`
    });
}

export function createVGR(authentication, Doc_Serie, Doc_Number, entity) {
    let body = {};
    body.Tipodoc = "VGR";
    body.Serie = "A";
    body.Entidade = entity;
    body.TipoEntidade = "F";
    body.DataDoc = date();
    body.DataIntroducao = date(); 

    return fetch(`${PRIMAVERA_URL}/Compras/Docs/TransformDocument/ECF/${Doc_Serie}/${Doc_Number}/000/true`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: JSON.stringify(body)
    })
}

export function createGR(authentication, Doc_Serie, Doc_Number, entity) {
    let body = {};
    body.Tipodoc = "GR";
    body.Serie = "A";
    body.Entidade = entity;
    body.TipoEntidade = "C";
    body.DataDoc = date();
    body.DataVenc = date(); 

    return fetch(`${PRIMAVERA_URL}/Vendas/Docs/TransformDocument/ECL/${Doc_Serie}/${Doc_Number}/000/true`, {
        method: 'POST',
        headers: makeHeaders(authentication),
        body: JSON.stringify(body)
    })
}

export function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}