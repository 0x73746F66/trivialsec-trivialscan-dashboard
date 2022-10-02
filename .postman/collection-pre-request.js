const moment = require('moment')
const url = require('url')
const time = moment().utc()
const EOL = "\n"
const pathParts = pm.environment.values.substitute(pm.request.url, null, false)
const pathurl = `${pathParts.host}/${pathParts.path.join("/")}?${pathParts.query}`
const hostname = url.parse(pathurl).hostname
const pathname = url.parse(pathurl).pathname
const port = url.parse(pathurl).port || 443
const ts = time.unix()
const id = pm.environment.get("CLIENT_NAME")

let canonical_string = request.method.toUpperCase() + EOL + hostname + EOL + port + EOL + pathname + EOL + ts
if(pm.request.body.raw){
    canonical_string += EOL + btoa(pm.request.body.raw)
}
console.log(canonical_string)
// https://cryptojs.gitbook.io/docs/
const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, pm.environment.get("TOKEN"))
hash.update(canonical_string)
const mac = hash.finalize()
const header = `HMAC id="${id}", mac="${mac}", ts="${ts}"`
console.log(header)
pm.request.headers.add({key: "Authorization", value: header})
