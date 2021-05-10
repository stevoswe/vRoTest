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
import { getvRoRestHost } from "../HTTPRequest/getvRoRestHost";
import { createvRoRestRequest} from "../HTTPRequest/createvRoRestRequest";
import { deletevRoRestRequest} from "../HTTPRequest/deletevRoRestRequest";
import { executevRoRestRequest } from "../HTTPRequest/executevRoRestRequest";

/**
 * Update a CMDB for a CI by calling a vRO RESThost object
 * @param {string} restHostName
 * @param {string} action
 * @param {string} ciName
 * @param {string} ciValue
 */
export class UpdateCI extends UpdateCMDBBase{
    public makeRESTRequest(targetCMDB: string, action: string, ciName: string, ciValue: string) {

        let value: number;
        let request: any;
        let transactionID: number = 0;

        const allowedCMDBs: string[] = ["KangarooCMDB","WombatCMDB","PlatypusCMDB","MyCMDB"];

        // Validate in parameters
        if( allowedCMDBs.indexOf(targetCMDB) < 0 ) {
            throw new Error("makeRESTRequest: REST host " + targetCMDB + " not supported")
        }

        if( action === "CreateCI" && ciName.length === 0 )
        {
            throw new Error("makeRESTRequest: invalid parameters ciName: " + ciName )
        }

        value = Number(ciValue);
        if( isNaN(value) || ciName.length === 0 )
        {
            throw new Error("makeRESTRequest: invalid parameters ciValue: " + ciValue )
        }

        // Get a vRO RESTOperation instance
        let targetRESTObject: any = new getvRoRestHost().getRestHostInstance(targetCMDB, action);

        // Create the REST request
        if( targetRESTObject.name === "CreateCI" ) {
            request = new createvRoRestRequest().createRESTRequest(targetRESTObject, ciName, value, 0 );
        } else if ( targetRESTObject.name === "DeleteCI" ) {
            request = new deletevRoRestRequest().deleteRESTRequest(targetRESTObject, value, 0 );
        } else {
            throw new Error("makeRESTRequest: invalid REST operation " + targetRESTObject.name )
        }

        // Execute the REST request
        let restResponce = new executevRoRestRequest().executeRESTRequest(request);

        // Handle the responce, and if this is transaction based run the commit
        let httpResponse: string = restResponce.contentAsString;
        let httpStatusCode: number = restResponce.statusCode;

        if( httpStatusCode >= 400) {
            throw new Error("Workflow failed " + httpResponse )
        }

        if( restResponce.indexOf("transationID") >= 0 ) {
            transactionID = Number(restResponce.transactionID);

            if(!isNaN(transactionID)){
                if( targetRESTObject.name === "CreateCI" ) {
                    request = new createvRoRestRequest().createRESTRequest(targetRESTObject, ciName, value, transactionID );
                } else if ( targetRESTObject.name === "DeleteCI" ) {
                    request = new deletevRoRestRequest().deleteRESTRequest(targetRESTObject, value, transactionID );
                } else {
                    throw new Error("makeRESTRequest: invalid REST operation " + targetRESTObject.name )
                } 

                // Execute the commit REST request
                let restResponce = new executevRoRestRequest().executeRESTRequest(request);
                
                // ToDo: handle http response from commit calls
                httpResponse = restResponce.contentAsString;
                httpStatusCode = restResponce.statusCode;
            }

            

        }

        return "ToDo: fix valid REST status";

    }

}
