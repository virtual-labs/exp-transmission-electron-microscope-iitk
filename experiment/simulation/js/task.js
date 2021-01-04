function randEx(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var timerId, typeTarget = $("#typer"),
    tWrapperr = $("#toast-wrapperr");


    function showToastt(msg, type = 0) {
        tWrapperr.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${type == 1 ? '#ff0000' : (type == 2 ? '#31a66a' : '#007aff')}" /></svg>
            <strong class="mr-auto">Notification</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${msg}
    </div>
    </div>`);
        $(`#t${ti - 1}`).toast({
            delay: 5500
        });
        $(`#t${ti - 1}`).toast('show');
    }

    

var correct = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];
$(function() {
    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
});

$("#setvac").click(function () {
    const tempVac = parseInt($("#vslider").slider("option", "value"));
    if (tempVac == 0)
      return;
    if ( tempVac != 2)
      showToast("Vacuum should be in HV state for cermaics.", 1);
    else if (tempVac == 2){
        $("#setav").prop("disabled", false);
       $("#avslider").slider("option", "disabled", false);
       showToast("Vacuum has been set successfully.", 0); 
    }
    vac = tempVac; 
    
  });

  
function chk() {
    var sortedIDs = $("#sortable2").sortable("toArray");
    console.log("hi", sortedIDs, correct);
    if (sortedIDs.length !== correct.length) {
        showToastt("First move all parts.", 0);
    } else {
        for (var i = 0; i < sortedIDs.length; i++) {
            if (sortedIDs[i] !== correct[i]) {
                showToastt("Not correctly aligned", 1);
                return;
            }
        }
        showToastt("VALID", 2);
    }
}



// task2
// wavelength calculator--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function calc() {
    var M0 = 9.1091E-31;
    var Q = 1.602E-19;
    var C = 299790000;
    var E0 = M0 * C * C;
    var E1 = 1.602E-19;
    var H = 6.6256E-34;
    var MC = 8.1900E-14;

    var KV = document.electron.HV.value;
    var E = KV * E1 * 1000;
    var NV = Math.sqrt(2 * E / M0);
    var Temp = 1 / (1 + E / E0);
    var V = C * Math.sqrt(1 - Temp * Temp);
    var Diff = V - NV;

    format(NV);
    document.electron.NV.value = document.electron.Dummy.value;
    format(V);
    document.electron.EV.value = document.electron.Dummy.value;
    format(Diff);
    document.electron.VDiff.value = document.electron.Dummy.value;
    percent(NV / C);
    document.electron.NVPt.value = document.electron.Dummy.value;
    percent(V / C);
    document.electron.EVPt.value = document.electron.Dummy.value;
    percent(V / C - NV / C);
    document.electron.VDiffPt.value = document.electron.Dummy.value;

    format(M0);
    document.electron.NMa.value = document.electron.Dummy.value;
    var EMa = "" + M0 * (1 + (E / E0));
    var Diff = "" + M0 * (1 + (E / E0)) - M0;
    format(EMa);
    document.electron.EMa.value = document.electron.Dummy.value;
    format(Diff);
    document.electron.MaDiff.value = document.electron.Dummy.value;
    fixed(M0 / M0);
    document.electron.NEU.value = document.electron.Dummy.value;
    var EEU = "" + (M0 * (1 + (E / E0))) / M0;
    var Diff = "" + (M0 * (1 + (E / E0))) / M0 - 1;
    fixed(EEU);
    document.electron.EEU.value = document.electron.Dummy.value;
    fixed(Diff);
    document.electron.EUDiff.value = document.electron.Dummy.value;

    var NEn = "" + E1 * KV * 1000;
    format(NEn);
    document.electron.NEn.value = document.electron.Dummy.value;
    var EEn = "" + ((E1 * KV * 1000) + MC);
    var EEn = "" + (NEn * EEU);
    format(EEn);
    document.electron.EEn.value = document.electron.Dummy.value;
    var Diff = "" + EEn - NEn;
    format(Diff);
    document.electron.EnDiff.value = document.electron.Dummy.value;

    var NMo = "" + M0 * NV;
    format(NMo);
    document.electron.NMo.value = document.electron.Dummy.value;
    var EMo = "" + ((MC + E1 * KV * 1000) / (C * C)) * V;
    var Diff = "" + NMo - EMo;
    format(EMo);
    document.electron.EMo.value = document.electron.Dummy.value;
    format(Diff);
    document.electron.MoDiff.value = document.electron.Dummy.value;

    var NWa = "" + H / (M0 * NV);
    var EWa = "" + H * C / Math.sqrt(2 * E * E0 + E * E);
    var Diff = "" + EWa - NWa;
    if (EWa == Infinity) {
        Diff = " ";
    }
    format(NWa);
    document.electron.NWa.value = document.electron.Dummy.value;
    format(EWa);
    document.electron.EWa.value = document.electron.Dummy.value;
    format(Diff);
    document.electron.WaDiff.value = document.electron.Dummy.value;
    format(NWa * 1e+9);
    document.electron.NWan.value = document.electron.Dummy.value;
    format(EWa * 1e+9);
    document.electron.EWan.value = document.electron.Dummy.value;
    format(Diff * 1e+9);
    document.electron.WanDiff.value = document.electron.Dummy.value;

    Diff = EWa * 61.2 - NWa * 61.2;
    if (EWa == Infinity) {
        Diff = " ";
    }
    format(NWa * 61.2);
    document.electron.NRe.value = document.electron.Dummy.value;
    format(EWa * 61.2);
    document.electron.ERe.value = document.electron.Dummy.value;
    format(Diff);
    document.electron.ReDiff.value = document.electron.Dummy.value;
    format(NWa * 61200000000);
    document.electron.NRen.value = document.electron.Dummy.value;
    format(EWa * 61200000000);
    document.electron.ERen.value = document.electron.Dummy.value;
    format(Diff * 1e+9);
    document.electron.RenDiff.value = document.electron.Dummy.value;
    fixed(NWa * 612000000000);
    document.electron.NReA.value = document.electron.Dummy.value;
    fixed(EWa * 612000000000);
    document.electron.EReA.value = document.electron.Dummy.value;
    fixed(Diff * 1e+10);
    document.electron.ReADiff.value = document.electron.Dummy.value;
}
// End script -->