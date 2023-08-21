class JogoForca{
    
    btnEnviar = document.getElementById("btnEnviar");
    campoChute = document.getElementById("txtChutado");
    btnR = document.getElementById("btnR");
    img = document.getElementById("imgForca");
    arrayImg = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
    palavraSorteada = " ";
    erros = 0;

    constructor(){
        this.sortearPalavra();
        this.adicionaQuadros();
        this.btnEnviar.addEventListener("click", () => this.verificador())
        this.btnR.addEventListener("click", () => this.atualizar())
    }

    atualizar(){
        window.location.reload();
    }

    sortearPalavra(){
        let palavras = [ "ABACATE", "ABACAXI","ACEROLA", "AÇAÍ", "ARAÇA", "BACABA", "BACURI", "BANANA", "CAJÁ",
        "CAJÚ", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA", "JENIPAPO" ,"MAÇÃ", 
        "MANGABA", "MANGA", "MARACUJÁ", "MURICI", "PEQUI", "TAMARINDO", "INGÁ", "ROMÃ", "CAQUI", "JACA",
        "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU", "UVA", "UVAIA"];

        let i = Math.floor(Math.random() * palavras.length);

        this.palavraSorteada = palavras[i];
        console.log(this.palavraSorteada)
    }

    adicionaQuadros(){
        for(let i = 0; i < this.palavraSorteada.length; i++){
            let quadro = document.getElementById("quadro");
            let novoInput = document.createElement("input");

            novoInput.id = i;
            novoInput.type = "text";
            novoInput.readOnly = true;   
            novoInput.style.borderRadius = "10px";
            novoInput.style.textAlign = "center";
            novoInput.style.width = `${50/this.palavraSorteada.length}%`

            quadro.appendChild(novoInput);
        }
    }

    alteradorImg(){
        this.img.src = `src/${this.arrayImg[this.erros]}`;
    }

    avaliadorPalavrasFinais(acertou){
        let txt = document.getElementById("textoF");
        txt.style.display = "block";

        if(acertou){
            txt.innerText = "Parabéns, você acertou a palavra " + this.palavraSorteada + ", jogue de novo!";
            txt.style.color = "green";
        }
        else{
            txt.innerText = "Infelizmente acabou as suas chances, tente de novo!";
            txt.style.color = "red";
        }
    }

    desabilitadorQuadros(acertou){
        this.btnEnviar.disabled = true;
        this.campoChute.disabled = true;

        for(let i = 0; i < this.palavraSorteada.length; i++){
            let quadro = document.getElementById(i);
            quadro.style.display = "none";
        }

        this.avaliadorPalavrasFinais(acertou);
    }

    verificadorAcertos(){
        let palavraChutada = "";
        const array = [];

        for(let i = 0; i < this.palavraSorteada.length; i++){
            let quadro = document.getElementById(i).value;
            array[i] = quadro;
        }

        console.log(array)

        for(let i = 0; i < this.palavraSorteada.length; i++){
            palavraChutada = palavraChutada + array[i];
        }

        if(palavraChutada == this.palavraSorteada){
            this.desabilitadorQuadros(true);
        }
    }

    verificadorErros(){
        this.campoChute.value = "";
        this.alteradorImg();
        this.erros++;

        if(this.erros == 6){
            this.desabilitadorQuadros(false);
        }
    }

    verificador(){
        let txtChute = this.campoChute.value.toUpperCase();
        let ehValido = false;
        let auxStr;

        for(let i = 0; i < this.palavraSorteada.length; i++){
            
            if(txtChute == this.palavraSorteada[i]){
                let quadro = document.getElementById(i);
                ehValido = true;
                quadro.value = txtChute;
                this.campoChute.value = "";
                
            }
        }

        if(ehValido){
        this.verificadorAcertos();
        }
        else if(ehValido == false){
            this.verificadorErros();
        }
    }
}
window.addEventListener("load", () => new JogoForca());
