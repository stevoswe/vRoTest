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

/**
 * Execute the REST request on a RESTOperation object
 * @param {any} targetRESTRequest
 */
export class executevRoRestRequest extends UpdateCMDBBase{
    public executeRESTRequest(targetRESTRequest: any) {

        // ToDo: determine which parameters we should send here
        // Need to solve the following (but not necessarily just here!):
        // 1. For transaction we need to retrieve the CommitCI RESTOperation
        // 2. For DELETE we need to add the {id} as a parameter
        let restResponse: any = targetRESTRequest.execute();

        return restResponse;
    }
}
