/*-
 * #%L
 * HttpTest
 * %%
 * Copyright (C) 2021 None
 * %%
 * TODO: Define header text
 * #L%
 */

import { RESTHost, RESTOperation } from "../UpdateCMDBBase";

/**
 * Run a REST request against a vRO to get RESThost and RESTOperations objects for a given target
 * @param {string} restHostName
 * @param {string} action
 */

export class getvRoRestHost {
    public getRestHostInstance(restHostName: string, 
                      action: string) {

        let requestHost: RESTHost;
        let requestHostOperation: RESTOperation;

        System.log("DEBUG: restHostName [" + restHostName + "] action [" + action + "]");
                        
        // Retrieve the RESTHost instance from vRO inventory
        requestHost = this.getRESTHost(restHostName); 

        // Validate the RESTHost object
        if(!requestHost || System.getObjectType(requestHost) !== "REST:RESTHost") {
            System.log("DEBUG: runRequest: Incorrect RESTHost object for " + restHostName );
            throw new Error("getRESTHost: RESTHost object for " + restHostName + " not found");
        }

        // Now retrieve the RESTOperation for the RESHost
        requestHostOperation = this.getRESTOperation(restHostName, requestHost, action);

        // Validate the RESTOperation object
        if(!requestHostOperation || System.getObjectType(requestHostOperation) !== "REST:RESTOperation") {
            System.log("DEBUG: runRequest: Incorrect RESTOperation object for " + restHostName );
            throw new Error("getRESTHost: RESTOperation object for " + restHostName + " not found");
        }

        return requestHostOperation;

    }

    /**
    * Get RESTHost object
    * @param {string} hostname
    */
    private getRESTHost(hostName: string) {

        /** ToDo: can we create a type mapping to avoid using "any" here to keep Typescript happy? Or how else to fix? */
        let allHosts: RESTHost[] = Server.findAllForType("REST:RESTHost", null);

        for( let targetHost of allHosts ) {
            if ( targetHost.name === hostName ) {
                System.log("DEBUG: getRESTHost: We found REST host " + hostName + " and will call URL: " + targetHost.url + " ID: " + targetHost.id );
                return targetHost;
            }
        }
    }
    
    /**
    * Get RESTOperation object for a RESTHost object
    * @param {string} hostname
    * @param {any} requestHost
    * @param {string} httpMethod
    */
    private getRESTOperation(hostname: string, requestHost: any, httpMethod: string) {

        let allHostOperation: RESTOperation[] = Server.findAllForType("REST:RESTOperation", null);

        for( let targetOperation of allHostOperation ) {
            if ( requestHost.id === targetOperation.host.id && targetOperation.name === httpMethod ) {
                System.log("DEBUG: getRESTOperation: Host[" + hostname + "] RESTHost ID[" + requestHost.id + "] RESTOperation object[" + targetOperation +"]");
                return targetOperation;
            }
        }
    }

}

