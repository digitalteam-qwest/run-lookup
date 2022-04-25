# run-lookup
Essential code to run the Firmstep integrations using JavaScript

## How to run Firmstep integrations in JS

To import the functions, add this code in the HTML field:
```
$(document).ready(function () {
    $.getScript("https://gitcdn.link/cdn/digitalteam-Qwest/run-lookup/main/app.js")
});
```

To run a lookup:
```
//lookupID - string - mandatory - ID of the integration
//payload - object - non mandatory - contents of the tokens
runLookup(integrationID, payload)

//Example:
const payload = {
    "postcode_search": {
        "name": "postcode_search",
        "value": 'CW7 1AH'
    }
}

Id for LLPG 1 of 2 integration
const integrationID = '580f214c7f5b5'

runLookup(integrationID, payload).then((response) => {
    //Prints the list of addresses in the console
    console.log(response)
})
```

To temporarily save the integration that you've run:
```
//integrationName - string - mandatory - Name of the integration
cacheIntRun(integrationName)
```

To perminately save the integrations that are saved temporarily in the database:
```
logIntRun()
```
