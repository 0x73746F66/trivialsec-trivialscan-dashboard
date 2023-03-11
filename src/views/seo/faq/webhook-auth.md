A webhook is an endpoint on your server that receives requests from Trivial
Security, notifying you about events that happen on your account. The nature of
a webhook in non-interactive, therefore it cannot interact with challenges
issued by your servers to authenticate, instead a webhook is made as a
'signed-request'.

Using a signature for each request provides you verifiable proof the request
came from Trivial Security, and the signed data has not been modified since we
generated the data and signed the request.
