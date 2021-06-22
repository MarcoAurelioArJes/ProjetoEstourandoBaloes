var timeId = null;//Variável que armazena a chamada da função setTimeout

function inicia_jogo(){
	//window = objeo
	//location = atributo
	//search = atributo
	var url = window.location.search;

	//Aqui criamos uma variavel chamada nivel_jogo, recebendo a variavel url (que antes recebeu o objeto window com os atributos location e search)
	//com a função replace('?', ''); que faz replace('quem voce quer trocar', 'pelo que voce troca');
	var nivel_jogo = url.replace('?', '');

	var tempo_segundos = 0;

	if(nivel_jogo == 1){//nivel 1 fácil -> 120segundos
		tempo_segundos = 120;
	}
	
	if(nivel_jogo == 2){//nivel 2 normal -> 60segundos
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3){//nivel 3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;//innerHTML altera o valor do elemento em HTML através do Javascript

	//definindo quantidades de balões
	var qtde_baloes = 80;

	cria_baloes(qtde_baloes);

	//Imprimir quantidade e baloes inteiros
	document.getElementById("baloes_inteiros").innerHTML = qtde_baloes;

	//Imprimir quantidade e baloes estourados
	document.getElementById("baloes_estourados").innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);//Váriavel que irá passar o valor pro parâmetro
}

function contagem_tempo(segundos){//Parâmetro criado

	segundos--;

	if(segundos == -1){
		clearTimeout(timerId);//Para a execução da função setTimeout();
		game_over();
		return false;
	}

	document.getElementById("cronometro").innerHTML = segundos;
	
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);//A cada 1000ms = 1s irá chamar a função contagem_tempo() passando o parâmetro (segundos)

}

function game_over(){
	remove_eventos_baloes();
	alert("Fim de jogo, você não conseguiu estourar todos os balões a tempo");
}situacao_jogo:

function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){
		var balao = document.createElement("img");//criamos uma variavel balao e criamos um metodo com o objeto document e a funcao createElement(""), para criar um elemento do html
		balao.src = "imagens/balao_azul_pequeno.png";//adicionamos a imagem dos baloes a variavel balao
		balao.style.margin = '10px';//adiciona um estilo css no javascript com a propriedade margin com 10px
		balao.id = 'b' + i;//criando id's diferentes para cada balao (imagem)
		balao.onclick = function(){ estourar(this); };//chamando a função estourar() para o evento onclick, >this< define que é o próprio elemento (faz referência)

		document.getElementById("cenario").appendChild(balao);//adicionando baloes ao cenário com a função appendChild() que cria uma imagem como filha sem sobrepor a de outra
	}

}

function estourar(e){//o elemento passado por parâmetro é igual a ele mesmo por conta do (this)
	var id_balao = e.id;//como passamos (this) para o parâmetro essa linha irá recuperar ele mesmo, no caso o id que foi definido em balao.id acima

	//Para evento onclick após clicar no balão  
	document.getElementById(id_balao).setAttribute('onclick', '');

	//Na linha de código abaixo eu digo que id_balao que está guardando uma imagem do balão não estourado, ao ser clicado no evento (onclick), irá trocar a imagem para o balão que está estourado
	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";//recuperando a referência do elemento

	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	//Alteramos o valor que está no elemento <span> fazendo receber o novo valor das variáveis a cada clique, com o innerHTML
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){

	if(baloes_inteiros == 0){
		alert('Parabéns, você conseguiu estourar todos os balões a tempo');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes(){
	var i = 1;//contado para recuperar balões por id

	//percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
	while(document.getElementById('b' + i)){

		//retira o evento onclick do elemnto
		document.getElementById('b'+i).onclick = '';
		i++;//faz a iteração da variávei i
	}
}