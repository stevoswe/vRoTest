# vRo test code

This vRO workflow will first retrieve the RESTHost objects according to the workflow input parameters.

It will first resolve the HTTP-REST host in the vRO inventory.
Secondly, it will iterate through the configured vRO HTTP-REST Operations and match the required RESTOperation to the input parameters.
Thereafter it will execute the REST request.

Branched for review
