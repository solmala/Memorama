//Inicializacion de varibles
let uncoveredCards = 0;
let card1  = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let rights = 0;
let timer = false;
let countdown = 30;
let regresiveTimeId = null;
let winAudio = new Audio('./AUDIO/win.wav');
let loseAudio = new Audio('./AUDIO/lose.wav');
let selectAudio = new Audio('./AUDIO/select.wav');
let wrongAudio = new Audio('./AUDIO/wrong.wav');
let psyduckAudio = new Audio('./AUDIO/psyduck.mp3');
let pikachuAudio = new Audio('./AUDIO/pikachu.mp3');
let bulbasaurAudio = new Audio('./AUDIO/bulbasaur.mp3');
let dittoAudio = new Audio('./AUDIO/ditto.mp3');
let eeveeAudio = new Audio('./AUDIO/eevee.mp3');
let jigglypuffAudio = new Audio('./AUDIO/jigglypuff.mp3');
let meowthAudio = new Audio('./AUDIO/meowth.mp3');
let snorlaxAudio = new Audio('./AUDIO/snorlax.mp3');

//Point a HTML
let showMoves = document.getElementById("movements");
let showRights = document.getElementById("right-guess");
let showTime = document.getElementById("time-left")

//Generar numeros aleatorios
let images  = ["bullbasaur","bullbasaur","ditto","ditto","eevee","eevee","jigglypuff","jigglypuff","meowth","meowth","pikachu","pikachu","psyduck","psyduck","snorlax","snorlax"];
images = images.sort(()=>{return Math.random() -0.5});
console.log(images);

//funciones
function timeCount(){
    regresiveTimeId = setInterval(()=>{
        countdown--;
        showTime.innerHTML = `Tiempo: ${countdown} segundos`;
        if(countdown==0){
            clearInterval(regresiveTimeId);
            blockCards();
            loseAudio.play();
        }
    },1000);
}

function blockCards(){
    for (let i=0; i<=15; i++){
        let blockedCard = document.getElementById(i);
        blockedCard.innerHTML = `<img src="./IMG/${images[i]}.png" alt="">`;
        blockedCard.disabled = true;
    }
}


//funcion  principal
function uncover(id){

    if (!timer){
        timeCount();
        timer = true;
    }

    uncoveredCards++;
    console.log(uncoveredCards);
    if (uncoveredCards==1){
        //Mostrar el primer numero
        card1 = document.getElementById(id);
        firstResult = images[id];
        card1.innerHTML= `<img src="./IMG/${firstResult}.png" alt="">`;
        //Deshabilitar el boton presionado
        card1.disabled = true;
        selectAudio.play();
    }
    else if (uncoveredCards==2){
        //Mostrar segundo numero
        card2 = document.getElementById(id);
        secondResult = images[id];
        card2.innerHTML=`<img src="./IMG/${secondResult}.png" alt="">`;
        //Deshabilitar el segundo boton
        card2.disabled = true;
        //Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;
        if (firstResult==secondResult){
            switch(firstResult){
            case 'bullbasaur':
                bulbasaurAudio.play();
                break;            
            case 'ditto':
                dittoAudio.play();
                break;            
            case 'eevee':
                eeveeAudio.play();
                break;
            case 'jigglypuff':
                jigglypuffAudio.play();     
                break;       
            case 'meowth':
                meowthAudio.play();   
                break;         
            case 'pikachu':
                pikachuAudio.play();
                break;            
            case 'psyduck':
                psyduckAudio.play();    
                break;
            case 'snorlax':
                snorlaxAudio.play();
                break;            
            }
            //Vaciar tarjetas destapadas
            uncoveredCards=0;
            //Aumentar aciertos
            rights++;
            showRights.innerHTML = `Aciertos ${rights}`;
            if(rights == 8){
                clearInterval(regresiveTimeId);
                showRights.innerHTML= `Felicitaciones, llegaste a 8 aciertos!`;
                showMoves.innerHTML= `Movimientos totales: ${moves}`;
                showTime.innerHTML = `Tu tiempo fue ${30-countdown} segundos`;
                winAudio.play();
            }
        }
        else{
            //Mostrar valores y tapar
            wrongAudio.play();
            setTimeout(()=>{            
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards=0;
                }, 800);
            
        }
    }
    
}
