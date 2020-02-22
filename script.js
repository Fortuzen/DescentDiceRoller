let g_diceids = [];

function loadApp() {

    loadDice();

    $("#buttonRoll").click(e=>{
        console.log("Rolling dice")
        rollDice();
    });

    $("#buttonAttributeCheck").click(e=>{
        attributeCheck();
    });

    $("#buttonReset").click(e=>{
        resetDice();
    });
}

function loadDice() {
    console.log(dices);

    for(dice in dices) {
        g_diceids.push(dice);
        addDice(dice, dices[dice][0].url, diceTypes[dice]);
    }
}

function addDice(id,url, type) {
    let html = "";

    html += 
    `
    
        <div id="${id}" class="die my-1">
            <form>
                <div class="row no-gutters align-items-center">
                    <div class="col-2 mx-2">                 
                        <input class="form-control mx-1 px-0 text-center" type="text" value="0">
                    </div>
                    <div class="col">
                        <img src="${url}" width=64 height=64>                              
                        <button type="button" class="btn btn-primary btn-sm" id="${id}_RemoveButton"><i class="fas fa-minus"></i></button>
                        <button type="button" class="btn btn-primary btn-sm" id="${id}_AddButton"><i class="fas fa-plus"></i></button>    
                    </div>
                </div>
            </form>          
        </div>
    
    `;

    $(`#${type}Dice`).append(html);

    $(`#${id}_AddButton`).click(e=>{
        let val = parseInt($("#"+id).find("input").val());

        val += 1;
        $("#"+id).find("input").val(val);
    });
    $(`#${id}_RemoveButton`).click(e=>{
        let val = parseInt($("#"+id).find("input").val());
        val -= 1;
        $("#"+id).find("input").val(val);
    });
}

// Roll dice
function rollDice() {

    let resultDice = [];
    // Check all dice
    for(let i = 0; i< g_diceids.length;i++) {
        let id = g_diceids[i];
        let val = $("#"+id).find("input").val();
        console.log("Rolling:" + id + " times "+val);
        //Roll dice val times
        let sidesCount = dices[id].length;
        for(let j = 0; j<val;j++) {
            let side = Math.floor(Math.random()*sidesCount);
            console.log(side);
            resultDice.push(dices[id][side]);
        }
    }
    console.log(resultDice);

    handleResults(resultDice);
}
// Show results
function handleResults(resultDice) {
    $("#resultArea").empty();
    let results = {};
    let html = "";

    html += `<div id="resultArea_dice">`
    for(i in resultDice) {
        html += 
        `
        <img src="${resultDice[i].url}" width=50 height=50 class="m-1">
        `;
        for(key in resultDice[i]) {
            if(key === "url") continue;
            if(!results[key]) results[key] = 0;
            results[key] += resultDice[i][key];
        }

    }
    html += `</div>`
    $("#resultArea").append(html);

    console.log(results);

    html = "";
    html += 
    `
    <div id="resultArea_numbers">
        <p>
        Range: ${results.range} Surges: ${results.surges} Hearts: ${results.hearts} Shields: ${results.shields}
        </p>
    </div>
    `;

    $("#resultArea").append(html);

}

// Throw gray and black dice
function attributeCheck() {
    let resultDice = [];
    let sidesCount = dices["gray"].length;
    let side;
    side = Math.floor(Math.random()*sidesCount);
    resultDice.push(dices["gray"][side]);

    side = Math.floor(Math.random()*sidesCount);
    resultDice.push(dices["black"][side]);
    handleResults(resultDice);
}

function resetDice() {
    $("#resultArea").empty();

    for(let i = 0; i< g_diceids.length;i++) {
        let id = g_diceids[i];
        $("#"+id).find("input").val(0);

    }
}

