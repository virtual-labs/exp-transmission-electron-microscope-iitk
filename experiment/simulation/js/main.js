var text;
const typeSpeed = 60,
    materials = [
        "green",
        "red",
        "blue",
        "yellow"
    ],
    parts = [{
            img: "./images/parts/1.png",
            desc: "Description for part 1 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/2.png",
            desc: "Description for part 2 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/3.png",
            desc: "Description for part 3 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/4.png",
            desc: "Description for part 4 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/5.png",
            desc: "Description for part 4 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/6.png",
            desc: "Description for part 4 ok Description for part 1 ok Description for part 1 ok"
        },
        {
            img: "./images/parts/7.png",
            desc: "Description for part 4 ok Description for part 1 ok Description for part 1 ok"
        }
    ];
    var   matSelected = 1 ;
var timerId, typeTarget = $("#typer"),
    tWrapper = $("#toast-wrapper"),
    ti = 0,
    currentStep = 0,
    contrast = 0,
    brightness = 0,
    vac = 0,
    av = 0,
    on = false,
    dropped = false,
    imgs = [],
    mode = 1;
var beamCanvas = document.getElementById("beam");
var ctx = beamCanvas.getContext('2d');
var beamy = 0,
    beamx = parseInt(beamCanvas.width / 2),
    beamWidth, beamTimer = -1;
var beamCanvas2 = document.getElementById("beam2");
var ctx2 = beamCanvas2.getContext('2d');
var beam2H = beamCanvas2.height,
    beam2W = beamCanvas2.width,
    beamx2 = parseInt(beamCanvas2.width / 2),
    beamTimer2 = -1;

function randEx(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function type(txt, cur = 0) {
    if (cur == txt.length) {
        timerId = -1;
        return;
    }
    if (cur == 0) {
        typeTarget.html("");
        clearTimeout(timerId);
    }
    typeTarget.append(txt.charAt(cur));
    timerId = setTimeout(type, typeSpeed, txt, cur + 1);
}



// switch on
function strt() {
    $('#dropzone').css('display', 'block');
    $('#st').css('backgroundColor', '#21e76e');
    $('#position').prop("disabled", false);
    // chng instr


    type("Now select the mode of operation and drag and drop the material, and place it into the machine");
    textToSpeech("Now select the mode of operation and place the material into the machine");

}

function showToast(msg, type = 0) {
    tWrapper.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
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

function preload(arrayOfImages) {
    $(arrayOfImages).each(function() {
        $('<img/>')[0].src = this;
    });
}

if (window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        textToSpeech(text);
    });
}

function textToSpeech(text) {
    var available_voices = window.speechSynthesis.getVoices();
    var english_voice = '';
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = text;
    utter.voice = english_voice;
    window.speechSynthesis.speak(utter);
}

function openPartModal(ele) {
    const i = parseInt($(ele).attr("data-id"));
    // console.log(i);
    $("#part-desc").html(parts[i - 1].desc);
    $("#part-img").attr("src", parts[i - 1].img);
    setTimeout(() => $('#part-modal').modal('show'), 100);
}

function taskSubmit() {
    if (parseInt($('input[name="task"]:checked').val()) == 2)
        showToast("Correct Answer!", 2);
    else
        showToast("Wrong Answer!", 1);
}
$(function() {
    type("Welcome, Get started by switching on the machine");
    textToSpeech("Welcome, Get started by switching on the machine");
    // setTimeout(() => {
    //     for (var i = 0; i < 41; i++) {
    //         imgs.push(`./images/Slide${i}.JPG`);
    //     }
    //     preload(imgs);
    // }, 3000);

    $(".material").draggable({
        helper: 'clone',
        cursor: "move",
        revert: "invalid",
        opacity: 0.5,
        zIndex: 100
    });
    $("#dropzone").droppable({
        tolerance: "touch",
        hoverClass: "drop-hover",
        accept: ".material",
        addClasses: false,
        drop: function(event, ui) {
            $("#dropzone").html(`<div style="background:${materials[parseInt((ui.draggable).attr("data-mid"))]}" class='material'></div>`);
            showToast("Material placed succesfully");
            dropped = true;
            $("#dropzone").removeClass("active");
            type("Now that the material has been placed, it is time to set the vaccum");
            textToSpeech("Now set the vaccum");

            // $("#setvac").attr("disabled", false);
            $("#vslider").slider("option", "disabled", false);
            $("#setvac").prop("disabled", false);
        }
    });
    var vhandle = $("#vslider").find(".custom-handle"),
        avhandle = $("#avslider").find(".custom-handle"),
        chandle = $("#cslider").find(".custom-handle"),
        bhandle = $("#bslider").find(".custom-handle");
    // $("#vslider").slider({
    //     min: 5,
    //     max: 20,
    //     animate: "slow",
    //     disabled: true,
    //     create: function() {
    //         vhandle.text($(this).slider("value"));
    //     },
    //     slide: function(event, ui) {
    //         vhandle.text(ui.value);
    //     }
    // });
    $("#vslider").slider({
        min: 0,
        max: 2,
        disabled: true,
        create: function () {
          vhandle.text("Off");
        },
        slide: function (event, ui) {
          var txt = "Off";
          switch (ui.value) {
            case 0:
              txt = "Off";
              break;
            case 1:
              txt = "LV";
              break;
            case 2:
              txt = "HV";
              break;
          }
          vhandle.text(txt);
        }
    });
  
   
    $("#avslider").slider({
        min: 100,
        max: 102,
        value: 100,
        animate: "slow",
        orientation: "horizontal",
        disabled: true,
        create: function() {
            avhandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            if (ui.value == 100) {
                avhandle.text("100");
            }
            if (ui.value == 101) {
                avhandle.text("120");
            }
            if (ui.value == 102) {
                avhandle.text("200");
            }
        }
    });
    $("#bslider").slider({
        create: function() {
            bhandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            bhandle.text(ui.value);
            brightness = ui.value;
            $("#outImage").css("filter", `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`)
        }
    });

    $("#on").one("click", function() {
        $('#on').css('backgroundColor', '#21e76e');
        // beam comes here
        clearInterval(beamTimer);
        clearInterval(beamTimer2);
        beamy = 0;
        ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
        ctx2.clearRect(0, 0, beam2W, beam2H);
        beamTimer = beamTimer2 = -1;
        beamTimer = setInterval(drawBeam, 10);
        // beam ends
        type("Now you can see the output image.");




        $("#avslider").slider("option", "disabled", false);

    });
    $("#task").click(function() {
        $("#output").fadeOut(600, () => $("#taskArea").delay(100).fadeIn());
    });
    $("#setvac").click(function() {
        type("Now set accelerating voltage");
        textToSpeech("Now set the accelerating voltage");


        vac = $("#vslider").slider("option", "value");

        // $("#setav").prop("disabled", false);
        // $("#avslider").slider("option", "disabled", false);

        $("#vacImg").animate({
            fontSize: 220
        }, {
            step: function(now, fx) {
                // console.log(now);
                $(this).css('clip', `rect(${Math.round(now)}px, 17rem, 300px, 0)`);
            },
            duration: 2500,
            easing: 'linear'

        });
    });
    $("#setav").click(function() {
        av = $("#avslider").slider("option", "value");
        type("Now switch on the beam.");
        textToSpeech("Try to switch on the beam now.");
        // removed beam from here
        $("#on").prop("disabled", false);
    });
    $(".scenes button").click(function() {
        mode = parseInt($(this).attr("data-mode"));
        $(".scenes button").removeClass("active");
        $(this).addClass("active");
    });

});

function drawBeam() {
    // ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.msImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = false;

    ctx.beginPath();
    // ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.msImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = false;

    beamWidth = Math.sin(beamy * 3.14 / 180) * 7;
    ctx.shadowBlur = 1;
    ctx.shadowColor = '#FEF1BAFF';
    ctx.strokeStyle = "#FFFFFFBB";
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = beamWidth;
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();


    ctx.shadowOffsetX = -beamWidth / 2;
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();

    ctx.shadowOffsetX = beamWidth / 2;
    ctx.moveTo(beamx, beamy);
    ctx.lineTo(beamx + 1, beamy);
    ctx.stroke();

    ctx.shadowOffsetX = -beamWidth;
    ctx.moveTo(beamx, beamy);
    beamy += 1;
    ctx.lineTo(beamx, beamy);
    ctx.stroke();
    if (beamy >= beamCanvas.height) {
        clearInterval(beamTimer);
        beamTimer = -1;
        beamTimer2 = setInterval(drawBeam2, 100);

        var inp = $("#position :selected").val();
        if (inp == 1) {
            $('#outImage2').hide();
            $('#outImage1').show(500);
        } else {
            $('#outImage1').hide();
            $('#outImage2').show(500);
        }

        // $("#outImage").attr("src", `./images/Slide${10 + av}.JPG`);
    }
}

function drawBeam2() {
    ctx2.beginPath();
    ctx2.clearRect(0, 0, beam2W, beam2H);
    ctx2.strokeStyle = "#FFFFFFBB";
    ctx2.moveTo(beamx2, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.moveTo(beamx2 - 6, 23);
    ctx2.lineTo(beamx2 + 60 + randEx(-5, 5), randEx(-10, 5));
    ctx2.stroke();
}

function showtsk() {
    $("#showsim").hide();
    $("#shtsk").show();
}


function supr() {
    $("#dbw").show();
}