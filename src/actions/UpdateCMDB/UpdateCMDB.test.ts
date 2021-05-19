import { UpdateCI } from "./UpdateCI/UpdateCI";
import { getvRoRestHost } from "./HTTPRequest/getvRoRestHost";


describe("CMDB test", () => {

    let ciInst: UpdateCI;
    let ciInstCall: getvRoRestHost;
    let spyInst: any;

    beforeEach(() => {
        ciInst = new UpdateCI();
        ciInstCall = new getvRoRestHost();
    })

    afterEach(() => {
        ciInst = null;
        ciInstCall = null;
    })

    it("Test call to UpdateCI", () => {
        spyInst = spyOn( ciInst,"makeRESTRequest").and.returnValue("Test");
        expect(ciInst.makeRESTRequest("KangarooCMDB","CreateCI","server01","28")).toBe("Test");
        expect(ciInst.makeRESTRequest).toHaveBeenCalled();
    })


})