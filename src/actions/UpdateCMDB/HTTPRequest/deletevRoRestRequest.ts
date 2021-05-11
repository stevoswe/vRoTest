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

export interface JsonBodyId {
    id: number
}

export interface JsonBodyTranaction {
    transactionId: number
}

/**
 * Build and create a REST request object for DeleteCI
 * @param {any} targetRESTObject
 * @param {number} ciID
 * @param {number} transaction
 */
export class deletevRoRestRequest extends UpdateCMDBBase{
    public deleteRESTRequest(targetRESTObject: any, ciId: number, transaction: number ) {

        let jsonBodyId: JsonBodyId;
        let jsonBodyTranaction: JsonBodyTranaction;
        let body: string = "";
        
        let request: any;
    
        System.log("DEBUG deleteRESTRequest: name: " + targetRESTObject.name);
        System.log("DEBUG deleteRESTRequest: urlTemplate: " + targetRESTObject.urlTemplate);
        System.log("DEBUG deleteRESTRequest: method: " + targetRESTObject.method);
        System.log("DEBUG deleteRESTRequest: defaultContentType: " + targetRESTObject.defaultContentType);

        // Determine the operation type and build the json body accordingly
        if( targetRESTObject.defaultContentType === "application/json" ) {
            if( transaction === 0 && targetRESTObject.method === "POST" ) {
                jsonBodyId = {
                    "id": ciId
                };

                body = JSON.stringify(jsonBodyId);
            }

            // If we got a transactionId for POST then we need to execute commit
            if( transaction > 0 && targetRESTObject.method === "POST" ) {
                jsonBodyTranaction = {
                    "transactionId": transaction
                };

                body = JSON.stringify(jsonBodyTranaction);
            }
        }

        System.log("DEBUG deleteRESTRequest: body: " + body);

        // Determine the operation type and build the MXL body accordingly
        if( targetRESTObject.defaultContentType === "application/xml" ) {
            throw new Error("deleteRESTRequest: xml payload not supported yet ")
        }

        // Now run create the REST request
        if( targetRESTObject.method === "DELETE" ) {
            request = targetRESTObject.createRequest(ciId);   
        } else {
            request = targetRESTObject.createRequest([], body);
        }

        //return request;
        return request;

    }
}
