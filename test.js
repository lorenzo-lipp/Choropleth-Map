function it(msg, fn) { console.assert(fn(), msg); }

window.addEventListener("load", async () => {
    await sleep(500);

    it("should have a title with a corresponding id=\"title\"", () => {
        return document.querySelector("#title") !== undefined;
    });

    it("should have a description element with a corresponding id=\"description\"", () => {
        return document.querySelector("#description") !== undefined;
    });

    it("should have counties with a corresponding class=\"county\" that represent the data", () => {
        return document.querySelector(".county") !== undefined;
    });

    it("should have at least 4 different fill colors used for the counties", () => {
        let set = new Set();

        for (let county of document.querySelectorAll(".county")) set.add(county.getAttribute("fill"));
        
        return set.size >= 4;
    });

    it("should have data-fips and data-education properties containing their corresponding fips and education values for each county", () => {
        for (let county of document.querySelectorAll(".county")) {
            if (!("fips" in county.dataset) || !("education" in county.dataset)) return false;
        }

        return true;
    });

    it("should have a county for each provided data point", () => {
        return document.querySelectorAll(".county").length === globalData.length;
    });

    it("should have data-fips and data-education values that match the sample data", () => {
        let counties = document.querySelectorAll(".county");

        for (let i = 0; i < counties.length; i++) {
            if (!(counties[i].dataset.fips !== globalData[i].fips) || !(counties[i].dataset.education !== globalData[i].education)) 
                return false;
        }

        return true;
    });

    it("should have a legend with a corresponding id=\"legend\"", () => {
        return document.querySelector("#legend") !== undefined;
    });

    it("should have at least 4 different fill colors used for the legend", () => {
        let set = new Set();

        for (let rect of document.querySelectorAll("#legend rect")) {
            set.add(rect.getAttribute("fill"));
        }

        return set.size >= 4;
    });

    let county = document.querySelectorAll(".county")[0];
    let mOver = new MouseEvent("mouseover");
    let mLeave = new MouseEvent("mouseleave");
    mOver.fromTarget = mLeave.fromTarget = county;
    county.dispatchEvent(mOver);

    it("I can mouse over an area and see a tooltip with a corresponding id=\"tooltip\" which displays more information about the area", () => {
        let tooltip = document.querySelector("#tooltip");

        if (!tooltip || tooltip.style.display === "none") return false;

        return true;
    });

    it("should have in the tooltip a data-education property that corresponds to the data-education of the active area", () => {
        let tooltip = document.querySelector("#tooltip");
        
        return tooltip.dataset.education === county.dataset.education;
    });

    county.dispatchEvent(mLeave);
});

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }