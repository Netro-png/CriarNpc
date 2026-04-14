const tst = document.getElementById("teste");
const info = document.getElementById("info");
const level = document.getElementById("level");
let random = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min;
}
const inv = document.getElementById("slots_inv");
const B1inv = document.getElementById("B1_inv");
const B2inv = document.getElementById("B2_inv");
const B3inv = document.getElementById("B3_inv");

let arrayAll = []
let resultAmbos = 0;
let NPCPego = []
let itensPego = []
let NPC = []
let itens = []

function gerarItem () {
    let i = random(1,100);
    let tier = up();
    let itemInfo = {
        'nome': tier.nome,
        'material': tier.tier,
        'raridade': tier.qual,
        'durabilidade': i,
        'uso': 1,
        'custo': i,
        'cor': tier.cor,
        'encantado': 'nao',
    }
    if (tier.qual === 'sem'){
        itemInfo.custo = i * 1;
        itemInfo.durabilidade = i;
    }
    else if (tier.qual === '|'){
        itemInfo.custo = i + 2;
        itemInfo.durabilidade = i + 5;
        if (itemInfo.custo >= 100 && itemInfo.durabilidade >= 100){
            itemInfo.encantado = 'sim';
        }
        else{
            itemInfo.encantado = 'nao';
        }
    }
    else if (tier.qual === '||'){
        itemInfo.custo = i + 4;
        itemInfo.durabilidade = i + 10;
        if (itemInfo.custo >= 150 && itemInfo.durabilidade >= 250){
            itemInfo.encantado = 'sim'
        }
        else{
            itemInfo.encantado = 'nao';
        }
    }
    else if (tier.qual === '|||'){
        itemInfo.custo = i + 8;
        itemInfo.durabilidade = i + 20;
        if (itemInfo.custo >= 250 && itemInfo.durabilidade >= 350){
            itemInfo.encantado = 'sim'
        }
        else{
            itemInfo.encantado = 'nao';
        }
    }
    if (itemInfo.durabilidade <= 10){
        itemInfo.uso = random(1,5);
    }
    else if (itemInfo.durabilidade <= 20){
        itemInfo.uso = random(5,10);
    }
    else if (itemInfo.durabilidade <= 30){
        itemInfo.uso = random(10,15);
    }
    else if (itemInfo.durabilidade >= 30){
        itemInfo.uso = random(3,10);
    }
    itens.push(itemInfo);
    
}

function gerarNPC () {
  let Nomes = nomeCompleto();
  let agilidade = random(1,10);
  let percepcao = random(1,10);
  let intelecto = random(1,10);
  let forca = random(1,10);
  let constituicao = random(1,10);
  let npcINFO = {
      'nome': Nomes.nome +' '+ Nomes.SobreNomes,
      'con': constituicao,
      'agi': agilidade,
      'int': intelecto,
      'for': forca,
      'per': percepcao,
  }
  NPC.push(npcINFO)
  
}

function moreItem (item){
    Swal.fire({
        title: 'Seu Item',
        html: `
          <div class="text-MItem">
            <p><b>Nome:</b> ${item.nome}</p>

            <p><b>Material:</b>
              <span style="color:${item.cor}">
                ${item.material}
              </span>
            </p>

            <p><b>Durabilidade:</b> ${item.durabilidade}</p>
            <p><b>Raridade:</b> ${item.raridade}</p>
            <p><b>Custo:</b> ${item.custo}</p>
            <p><b>Uso:</b> ${item.uso}</p>
            <p><b>Encantado:</b> ${item.encantado}</p>
          </div>
        `,
        icon: 'info',
        draggable: true,
        showCancelButton: true,
        confirmButtonText: 'guardar',
        customClass: {
            popup: 'tela-MItem',
            htmlContainer: 'text-MItem'
        }
    }).then((result) => {
        if (result.isConfirmed){
            itensPego.push(item);
            //resultAmbos += 1;
            verific()
        }
    });
}


function moreNPC (npc) {
  Swal.fire ({
      title: npc.nome,
      html: `
      <div>
      <span>
      <p>nome: ${npc.nome}</p>
      <p>CON: ${npc.con}</p>
      <p>AGI: ${npc.agi}</p>
      <p>INT: ${npc.int}</p>
      <p>FOR: ${npc.for}</p>
      <p>PER: ${npc.per}</p>
      </span>
      </div>
      `,
      icon: 'info',
      draggable: true,
      confirmButtonText: 'guardar',
      showCancelButton: true,
  }).then((result) =>{
      if(result.isConfirmed){
          NPCPego.push(npc);
          //resultAmbos += 1;
          verific()
      }
  });
}
function noteNPC () {
    Swal.fire ({
        title: 'sem NPC',
        icon: 'warning',
        draggable: true,
        html: '<p><b>Hello World</b></p>',
        customClass: {
            popup: 'Swal-rpg1'
        }
    });
}
function noteItem () {
    Swal.fire ({
        title: 'sem item',
        icon: 'warning',
        draggable: true,
    });
}
function abrirItem (item){
    Swal.fire ({
        title: 'Seu Item',
        text: 'Spawn de itens',
        icon: 'info',
        draggable: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ver Item',
        denyButtonText: 'Sem Item',
    }).then((result) => {
        if(result.isConfirmed){
            moreItem(item);
        }
        else if (result.isDenied){
            noteItem();
        }
    });
}
function abrirInfo (nome, npc) {
    Swal.fire({
        title: nome,
        text: 'esse e o ' + nome,
        icon: 'info',
        draggable: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'ver',
        denyButtonText: 'sem_Npc',
    }).then((result) => {
        if(result.isConfirmed) {
            moreNPC(npc)
        }
        else if (result.isDenied){
            noteNPC()
        }
    });
}

function verSlot (index, valor){
  let x = valor;
  let index_item = itensPego[index];
  let index_npc = NPCPego[index];
  
  Swal.fire({
      icon: 'info',
      //toast: true;
      draggable: true,
      showDenyButton: true,
      denyButtonText: 'Apagar',
      html:`
      <b>item: </b>
      <b>nome: </b>${index_item.nome}<br>
      <b>material: </b>
      <span style='color:${index_item.cor}'> ${index_item.material}</span><br>
      <b>durabilidade: </b>${index_item.durabilidade}<br>
      <b>uso: </b> ${index_item.uso}<br>
      <b>custo: </b> ${index_item.custo}<br>
      <b>upado: </b> ${index_item.encantado}<br>
      <hr>
      <b>npc: </b>
      <b>nome: </b> ${index_npc.nome}<br>
      <b>CON: </b> ${index_npc.con}<br>
      <b>AGI: </b> ${index_npc.agi}<br>
      <b>INT: </b> ${index_npc.int}<br>
      <b>FOR: </b> ${index_npc.for}<br>
      <b>PER: </b> ${index_npc.per}
      `,
  }).then((result) =>{
      if(result.isDenied){
         itensPego.splice(index, 1);
         NPCPego.splice(index, 1);
          resultAmbos -= 2;
          verific();
      }
  });
}

function ativo () {
    gerarNPC()
    let ultimoNpc = NPC[NPC.length - random(1,2)];
    abrirInfo(ultimoNpc.nome, ultimoNpc)
}
function ativo_2 () {
    gerarItem();
    abrirItem(itens[itens.length - 1]);
}

let verific = () => {
    if (NPCPego.length == itensPego.length){
        //resultAmbos += 1; 
    }
    //inv.style.display = 'flex';
  if (resultAmbos >= 3){
    B3inv.style.display = 'block';
    //B2inv.style.display = 'block';
    //B1inv.style.display = 'block';
  }
  else if (resultAmbos >= 2){
    B2inv.style.display = 'block';
    //B1inv.style.display = 'block';
  }
  else if (resultAmbos >= 1){
    inv.style.display = 'flex';
    B1inv.style.display = 'block';
  }
  else if (resultAmbos >= 8 || resultAmbos == 0){
    resultAmbos = 0;
    B1inv.style.display = 'none';
    B2inv.style.display = 'none';
    B3inv.style.display = 'none';
    NPCPego.length = 0;
    itensPego.length = 0;  
       
  }
  else {
    B1inv.style.display = 'none';
    B2inv.style.display = 'none';
    B3inv.style.display = 'none';
    inv.style.display = 'none'  
  }
}
let visu = () => {
    tst.innerHTML = NPCPego.length + " " + itensPego.length + " " + resultAmbos
}
let tst2 = setInterval(() =>{
     visu();
     verific();
}, 100);

