let constructiontype = document.getElementById('constructiontype');
let ratepersqft = document.getElementById('ratepersq');
let length =  document.getElementById('length');
let width = document.getElementById('width');
let areaofplot = document.getElementById('areaofplot');
let constructioncost = document.getElementById('constructioncost');

let cementqty = document.getElementById('cementqty');
let cementamt = document.getElementById('cementamt');
let cementrate = document.getElementById('cementrate');
let steelqty = document.getElementById('steelqty');
let steelamt = document.getElementById('steelamt');
let steelrate = document.getElementById('steelrate');
let sandqty = document.getElementById('sandqty');
let sandamt = document.getElementById('sandamt');
let sandrate = document.getElementById('sandrate');
let gravelqty = document.getElementById('gravelqty');
let gravelamt = document.getElementById('gravelamt');
let gravelrate = document.getElementById('gravelrate');
let bricksqty = document.getElementById('bricksqty');
let bricksamt = document.getElementById('bricksamt');
let brickrate = document.getElementById('brickrate');
let tilesqty = document.getElementById('tilesqty');
let tilesamt = document.getElementById('tilesamt');
let tilesrate = document.getElementById('tilesrate');
let colorqty = document.getElementById('colorqty');
let coloramt = document.getElementById('coloramt');
let colorrate = document.getElementById('colorrate');
let buildmaterialcost = document.getElementById('buildmaterialcost');

let cementpercent = document.getElementById('cementpercent');
let steelpercent = document.getElementById('steelpercent');
let sandpercent = document.getElementById('sandpercent');
let gravelpercent = document.getElementById('gravelpercent');
let finishingpercent = document.getElementById('finishingpercent');
let fittingpercent = document.getElementById('fittingpercent');

let cementbccamt = document.getElementById('cementbccamt');
let steelbccamt = document.getElementById('steelbccamt');
let sandbccamt = document.getElementById('sandbccamt');
let gravelbccamt = document.getElementById('gravelbccamt');
let finishingbccamt = document.getElementById('finishingbccamt');
let fittingbccamt = document.getElementById('fittingbccamt');

let totalmaterialcostpercent = document.getElementById('totalmaterialcostpercent');
let totalmaterialcostamt = document.getElementById('totalmaterialcostamt');
let labourcostpercent = document.getElementById('labourcostpercent');
let labourcostamt = document.getElementById('labourcostamt');

let totalconstructioncost = document.getElementById('totalconstructioncost');

// Construction material basic constants.
const cementpersqft = 0.4;
const steelpersqft = 4;
const sandpersqft = 1.8;
const gravelpersqft = 1.35;
const brickspersqft = 10.15;
const tilespersqft = 1.3;
const colorpersqft = 0.18;

// Construction rate per sq ft as per the construction type.
ratepersqft.value = constructiontype.value;
constructiontype.addEventListener('change', () => {
    ratepersqft.value = constructiontype.value;
    calculateEverything();
});

// To be removed.
calculateEverything();

length.addEventListener('keyup', () => {
    calculateEverything();
});

width.addEventListener('keyup', () => {
    calculateEverything();
});

ratepersqft.addEventListener('keyup', () => {
    calculateEverything();
});

cementrate.addEventListener('keyup', () => {
    calculateEverything();
});

steelrate.addEventListener('keyup', () => {
    calculateEverything();
});

sandrate.addEventListener('keyup', () => {
    calculateEverything();
});

gravelrate.addEventListener('keyup', () => {
    calculateEverything();
});

bricksrate.addEventListener('keyup', () => {
    calculateEverything();
});

tilesrate.addEventListener('keyup', () => {
    calculateEverything();
});

colorrate.addEventListener('keyup', () => {
    calculateEverything();
});

function calculateEverything() {
    // Area calculation.
    let lengthvalue = parseInt(length.value);
    let widthvalue = parseInt(width.value);
    let area = calculateArea(lengthvalue, widthvalue);
    areaofplot.value = area;

    // Construction cost.
    let ratepersqftvalue = parseInt(ratepersqft.value);
    let areaofplotvalue = parseInt(areaofplot.value);
    let constructioncostvalue = constructioncost.value = getConstructionCost(ratepersqftvalue, areaofplotvalue);

    calculateTableData(constructioncostvalue, area);
}

function calculateTableData (constructioncostvalue, area) {
    /** Building construction material calculations **/
    let cementqtyvalue = cementqty.innerHTML = Math.ceil(cementpersqft * area);
    let steelqtyvalue = steelqty.innerHTML = Math.ceil(steelpersqft * area);
    let sandqtyvalue = sandqty.innerHTML = Math.ceil(sandpersqft * area);
    let gravelqtyvalue = gravelqty.innerHTML = Math.ceil(gravelpersqft * area);
    let bricksqtyvalue = bricksqty.innerHTML = Math.ceil(brickspersqft * area);
    let tilesqtyvalue = tilesqty.innerHTML = Math.ceil(tilespersqft * area);
    let colorqtyvalue = colorqty.innerHTML = Math.ceil(colorpersqft * area);

    // Getting rates.
    cementratevalue = parseInt(cementrate.innerHTML);
    steelratevalue = parseInt(steelrate.innerHTML);
    sandratevalue = parseInt(sandrate.innerHTML);
    gravelratevalue = parseInt(gravelrate.innerHTML);
    bricksratevalue = parseInt(bricksrate.innerHTML);
    tilesratevalue = parseInt(tilesrate.innerHTML);
    colorratevalue = parseInt(colorrate.innerHTML);

    // Construction material amount calculation.
    let cementamtvalue = cementamt.innerHTML = getConstructionMaterialAmt(cementqtyvalue, cementratevalue);
    let steelamtvalue = steelamt.innerHTML = getConstructionMaterialAmt(steelqtyvalue, steelratevalue);
    let sandamtvalue = sandamt.innerHTML = getConstructionMaterialAmt(sandqtyvalue, sandratevalue);
    let gravelamtvalue = gravelamt.innerHTML = getConstructionMaterialAmt(gravelqtyvalue, gravelratevalue);
    let bricksamtvalue = bricksamt.innerHTML = getConstructionMaterialAmt(bricksqtyvalue, bricksratevalue);
    let tilesamtvalue = tilesamt.innerHTML = getConstructionMaterialAmt(tilesqtyvalue, tilesratevalue);
    let coloramtvalue = coloramt.innerHTML = getConstructionMaterialAmt(colorqtyvalue, colorratevalue);

    let entireMaterials = [cementamtvalue, steelamtvalue, sandamtvalue, gravelamtvalue, bricksamtvalue, tilesamtvalue, coloramtvalue];

    // Total Building Construction Material cost.
    buildmaterialcost.innerHTML = entireMaterials.reduce(function(a, b){
        return a + b;
    }, 0);

    /** Building construction material calculations */
    // Percentage calculation.
    let forfinishingpercentvalues = bricksamtvalue + tilesamtvalue + coloramtvalue;
    let cementpercentvalue = cementpercent.innerHTML = Math.round((cementamtvalue / constructioncostvalue) * 100);
    let steelpercentvalue = steelpercent.innerHTML = Math.round((steelamtvalue / constructioncostvalue) * 100);
    let sandpercentvalue = sandpercent.innerHTML = Math.round((sandamtvalue / constructioncostvalue) * 100);
    let gravelpercentvalue = gravelpercent.innerHTML = Math.round((gravelamtvalue / constructioncostvalue) * 100);
    let finishingpercentvalue = finishingpercent.innerHTML = Math.round((forfinishingpercentvalues / constructioncostvalue) * 100);
    let fittingpercentvalue = parseInt(fittingpercent.innerHTML);

    let totalmaterialpercent = [cementpercentvalue, steelpercentvalue, sandpercentvalue, gravelpercentvalue, finishingpercentvalue, fittingpercentvalue];

    let cementbccamtvalue = cementbccamt.innerHTML = Math.round(constructioncostvalue * (cementpercentvalue / 100));
    let steelbccamtvalue = steelbccamt.innerHTML = Math.round(constructioncostvalue * (steelpercentvalue / 100));
    let sandbccamtvalue = sandbccamt.innerHTML = Math.round(constructioncostvalue * (sandpercentvalue / 100));
    let gravelbccamtvalue = gravelbccamt.innerHTML = Math.round(constructioncostvalue * (gravelpercentvalue / 100));
    let finishingbccamtvalue = finishingbccamt.innerHTML = Math.round(constructioncostvalue * (finishingpercentvalue / 100));
    let fittingbccamtvalue = fittingbccamt.innerHTML = Math.round(constructioncostvalue * (fittingpercentvalue / 100));

    let totalmaterialamt = [cementbccamtvalue, steelbccamtvalue, sandbccamtvalue, gravelbccamtvalue, finishingbccamtvalue, fittingbccamtvalue];

    // Total Material cost percent.
    let totalmaterialcostpercentvalue = totalmaterialcostpercent.innerHTML = totalmaterialpercent.reduce(function(a, b){
        return a + b;
    }, 0);
    let totalmaterialcostamtvalue = totalmaterialcostamt.innerHTML = totalmaterialamt.reduce(function(a, b){
        return a + b;
    }, 0);

    // Labour cost percent.
    let labourcostpercentvalue = labourcostpercent.innerHTML = 100 - totalmaterialcostpercentvalue;
    let labourcostamtvalue = labourcostamt.innerHTML = constructioncostvalue * (labourcostpercentvalue / 100);

    // Total Construction Cost.
    totalconstructioncost.innerHTML = totalmaterialcostamtvalue + labourcostamtvalue;
}

function calculateArea (length, width) {
    let area = length * width;
    if (isNaN(area)) {
        return 0;
    }
    return area;
}

// Calculate Construction cost.
function getConstructionCost (rate, area) {
    let cc = rate * area;
    if (isNaN(cc)) {
        return 0;
    }
    return cc;
}

// Calculate Construction material amount.
function getConstructionMaterialAmt (quantity, rate) {
    let amount = quantity * rate;
    if (isNaN(amount)) {
        return 0;
    }
    return amount;
}