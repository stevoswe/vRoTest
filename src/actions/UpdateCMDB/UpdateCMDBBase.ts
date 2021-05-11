/*-
 * #%L
 * HttpTest
 * %%
 * Copyright (C) 2021 None
 * %%
 * TODO: Define header text
 * #L%
 */

export interface RESTHost {
	id: string;
	name: string;
	url: string;
	authentication: RESTAuthentication;
	proxyAuthentication: RESTAuthentication;
	connectionTimeout: number;
	operationTimeout: number;
	hostVerification: boolean;
	proxyHost: string;
	proxyPort: number;
	privateKeyId: string;
}

export interface RESTOperation {
	id: string;
	name: string;
	host: RESTHost;
	inParametersCount: number;
	method: string;
	urlTemplate: string;
	defaultContentType: string;
}

export class UpdateCMDBBase {
    public makeRESTRequest(target: string, action: string, ciName: string, ciValue: string): string {
        throw new Error("Not implmented");
    }

}



