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
        "MANGABA", "MANGA", "MARACUJÁ", "MURICI", "PEQUI",
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

    verificadorErros(){
        if(this.erros == 6){
            this.btnEnviar.disabled = true;
            this.campoChute.disabled = true;
            let txt = document.getElementById("textoF");

            for(let i = 0; i < this.palavraSorteada.length; i++){
                let quadro = document.getElementById(i);
                quadro.style.display = "none";
            }

            txt.style.display = "block";
            txt.innerText = "Infelizmente acabou as suas chances, tente de novo!";
            txt.style.color = "red";
        }
    }

    verificador(){
        let txtChute = this.campoChute.value.toUpperCase();
        let ehValido = false;

        for(let i = 0; i < this.palavraSorteada.length; i++){
            
            if(txtChute == this.palavraSorteada[i]){
                let quadro = document.getElementById(i);
                ehValido = true;
                quadro.value = txtChute;
                this.campoChute.value = "";
            }
        }

        if(ehValido == false){
            this.campoChute.value = "";
            this.alteradorImg();
            this.erros++;
            console.log(this.erros)
            this.verificadorErros();
        }
    }
}

window.addEventListener("load", () => new JogoForca());