//2 recursos principais: Composição apertando nos botões do teclado e composição adicionando as letras na text-box



///////////EVENTOS
//Reonhecer quando uma tecla é pressionada (no site inteiro)

//pegando td site          //soltar tecla
document.body.addEventListener('keyup', (event) => {

    //usar event.code para pegar a tecla pressionada e o toLower para que o retorno seja td minúsculo e dê match com os ID´s setados no html
    playSound(event.code.toLowerCase()); //chama função que toca o som da tecla pressionada
} );

//Fazer evento click no botão de tocar, para que dispare a função de tocar o que está dentro do input
document.querySelector('.composer button').addEventListener('click',() => {
    //Pegar o que foi digitado no input
    let song = document.querySelector('#input').value; //pega o conteúdo do elemento
    //verificar se algo foi digitado
    if(song !== ''){
    //transformar a string do input em uma lista (trasnformar em array) separando cada letra em um item de array
        let songArray = song.split(''); //gera um array sendo dividido por '', o que transforma cada letra em um item do array
      
        //criar função que irá executar a sequência do array. OBS: espaços add no input serão lidos como pausa
        playComposition(songArray);
    
    
    }
    
    

} );




//////////////////////FUNÇÕES
function playSound(sound){
    
    //identificar qual tag audio nós precisamos usar
let audioElement = document.querySelector(`#s_${sound}`); //sound = event.code.toLowerCase()
let keyElement = document.querySelector(`div[data-key="${sound}"]`); //procura uma div com data-key = sound

        //se o audioElement capturou alguma tecla válida para um som, ele dá play
    if (audioElement){
    //Até aqui o audio precisa TERMINAR para ser tocado novamente. O que gera problemas. Por isso, ao apertar o mesmo botão, deve-se começar o audio de novo do 0 e parar a execução do audio corrente

        audioElement.currentTime = 0; //resetando audio para que ele toque novamente
        //tocar
        audioElement.play();
         
    }

//estilizar o campo que está sendo tocado baseado no data-key informado no HTML
    //se existir uma tecla válida sendo apertada, ele estiliza a mesma
    if(keyElement){
        keyElement.classList.add('active');

        //tempo para que a estilização pare, já que a tecla já foi pressionada e soltada
        setTimeout(()=>{
            keyElement.classList.remove('active');
        },300);
    }


};

function playComposition(songArray){

    //Já temos uma função que toca o som, então preciso pegar o array, dar um loop nele e executar o playsong para cada item
   
 
 //problema: como o JS executa muito rápido, ao loopar ele toca todas as teclas ao mesmo tempo. Para arrumar isso iremos setar timeOuts para rodar os itens em uma certa cadência
 let wait = 0; //variável criada para alimentar a cadência do setTimeOUt
 
//criar var songItem q irá receber o item na posição atual
 for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`); //usa o template do nome keya,keyb para juntar com o valor da tecla digitada na posição atual do loop
        },wait);
      
        wait += 250; //adicionando cadência de 250 (primeiro loop, roda imediato (wait = 0), segundo 250ms, terceiro 500ms e assim sucetivamente) Ou seja, todos rodarão a cada 250ms, respeitando o anterior

    }

};