//Saves the ran integration in a list
const cacheIntRun = (integration) => {
    intRunCache.push(integration)
}

//Takes the log of integrations that have run and adds them to the db
const logIntRun = () => {
    const payload = {
        "caseReference": {
            "name": "caseReference",
            "value": getTokenValue('caseReference')
        },
        "integrationName": {
            "name": "integrationName",
            "value": intRunCache.join(',')
        },
        "processName": {
            "name": "processName",
            "value": getTokenValue('processName')
        },
        "formName": {
            "name": "formName",
            "value": getTokenValue('formName')
        }
    }
    
    runLookup('611e0a754e66e', payload)

    intRunCache = []
}

//If a token exists on the form, it retrieve it's value, otherwise, it return ''
const getTokenValue = (name) => {
    let value = ''
    try {
        value = $(`input[name="${name}"]`)[0].value
    } catch (error) {
        value = ''
    }
    return value
}

//Takes the lookup ID and data, runs the integration and returns the data
const runLookup = (lookupId, data = {}) => {
    return new Promise((resolve, reject) => {
        var vurl = '/apibroker/?api=RunLookup&id=' + lookupId + '&repeat_against=&noRetry=false&getOnlyTokens=undefined&app_name=AF-Renderer::Self&_=' + randoms + '&sid=' + sessions;
        var vdata = {
            "formValues": {
                "Section 1": data
            },
            "usePHPIntegrations": true,
            "formName": getTokenValue('formName'),
            "processId": getTokenValue('processID'),
            "tokens": {
                "port": ""
            },
            "env_tokens": {},
            "processName": getTokenValue('processName'),
            "created": "",
            "reference": "AJAX",
            "formUri": ""
        };
        $.ajax({
            url: vurl,
            dataType: 'json',
            method: 'POST',
            data: JSON.stringify(vdata),
            contentType: 'text/json',
            processData: false,
            error: function(e) {
                console.log(e)
                lookupStatus = false
                reject(e)
            },
            success: function(doc) {
                lookupStatus = true
                resolve(doc.integration.transformed.rows_data)
            }
        })
    })
}

const randomString = (e) => {
    var t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
        var t, n;
        return t = 16 * Math.random() | 0,
            n = "x" === e ? t : 3 & t | 8,
            n.toString(16)
    });
    return e ? t.replace(/\-/g, "").substring(0, e) : t
}

const retrieveSessionId = new Promise((resolve, reject) => {
    let url = '/authapi/isauthenticated?uri=' + location.href + '&hostname=' + location.hostname + '&withCredentials=true'
    $.ajax({
        url: url,
        dataType: 'json',
        method: 'GET',
        contentType: 'text/json',
        processData: false,
        error: function(e) {
            console.log(e);
            alert('there was an error while fetching');
            reject(e)
        },
        success: function(doc) {
            resolve(doc['auth-session'])
        }
    });
})

let randoms = randomString(13);
let sessions = ''
let intRunCache = []

retrieveSessionId.then((value) => {
    sessions = value
})
