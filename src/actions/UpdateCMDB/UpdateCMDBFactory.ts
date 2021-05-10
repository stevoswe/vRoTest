/*-
 * #%L
 * HttpTest
 * %%
 * Copyright (C) 2021 None
 * %%
 * TODO: Define header text
 * #L%
 */
import { UpdateCMDBBase } from "./UpdateCMDBBase";
import { UpdateCI } from "./UpdateCI/UpdateCI";



export class UpdateCMDBFactory {
    public doUpdateCMDB(cmdbname: string): UpdateCMDBBase {

        System.log("UpdateCMDBFactory: Looking for " + cmdbname);

        return new UpdateCI();
    
    }
}
