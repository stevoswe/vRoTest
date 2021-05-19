/*-
 * #%L
 * HttpTest
 * %%
 * Copyright (C) 2021 None
 * %%
 * TODO: Define header text
 * #L%
 */
import { Workflow} from "vrotsc-annotations";
import { UpdateCMDBFactory } from "../actions/UpdateCMDB/UpdateCMDBFactory";

@Workflow({
    name: "Update CMDB",
    path: "CGI/UpdateCMDB"
})
export class UpdateCMDB {
    public updateCMDB(cmdbname: string, action: string, ciName: string, ciValue: string) {
        let factory = new UpdateCMDBFactory();
        let factoryInst = factory.doUpdateCMDB(cmdbname);
        System.log(factoryInst.makeRESTRequest(cmdbname, action, ciName, ciValue));
    }
}
