/*-
 * #%L
 * HttpTest
 * %%
 * Copyright (C) 2021 None
 * %%
 * TODO: Define header text
 * #L%
 */

import { UpdateCMDBBase } from "../UpdateCMDBBase";

export interface JsonBody {
    name: string,
    size: number
}

export interface JsonBodyTranaction {
    transactionId: number
}

/**
 * Build and create a REST request object for CreateCI
 * @param {any} targetRESTObject
 * @param {string} ciName
 * @param {number} size
 * @param {number} transaction
 */
export class createvRoRestRequest extends UpdateCMDBBase{
    public createRESTRequest(targetRESTObject: any, ciName: string, size: number, transaction: number ) {

        let jsonBody: JsonBody;
        let jsonBodyTranaction: JsonBodyTranaction;
        let body: string = "";
        
        let request: any;
    
        System.log("DEBUG createRESTRequest: name: " + targetRESTObject.name);
        System.log("DEBUG createRESTRequest: urlTemplate: " + targetRESTObject.urlTemplate);
        System.log("DEBUG createRESTRequest: method: " + targetRESTObject.method);
        System.log("DEBUG createRESTRequest: defaultContentType: " + targetRESTObject.defaultContentType);

        // Determine the operation type and build the json body accordingly
        if( targetRESTObject.defaultContentType === "application/json" ) {
            if( targetRESTObject.method === "PUT" || targetRESTObject.method === "POST" ) {
                jsonBody = {
                    "name": ciName,
                    "size": size
                };

                body = JSON.stringify(jsonBody);
            }

            // If we got a transactionId for POST then we need to execute commit
            if( transaction > 0 && targetRESTObject.method === "POST" ) {
                jsonBodyTranaction = {
                    "transactionId": transaction
                };

                body = JSON.stringify(jsonBodyTranaction);
            }
        }

        System.log("DEBUG createRESTRequest: body: " + body);

        // Determine the operation type and build the MXL body accordingly
        if( targetRESTObject.defaultContentType === "application/xml" ) {
            throw new Error("createRESTRequest: xml payload not supported yet ")
        }

        // Now run create the REST request
        // ToDo: determine exactly how to pass the required parameters
        //request = targetRESTObject.createRequest(body);

        //return request;
        return "ToDo: return the REST request";

    }
}
