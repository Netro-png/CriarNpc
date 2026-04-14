//let raridade = []
//let corTier = 'black'


const armas = [
  "Espada Curta",
  "Espada Longa",
  "Adaga",
  "Machado",
  "Machado Duplo",
  "Arco Curto",
  "Arco Longo",
  "Besta",
  "Lança",
  "Martelo de Guerra",
  "Clava",
  "Foice",
  "Cajado",
  "Punhal",
  "Katana",
  "Sabre",
  "Alabarda",
  "Mangual",
  "Tridente",
  "Chicote",
  "Nunchacos",

];

const nome = ['Sem','Madeira','Argila','Bronze','Prata','Cobre','Ferro','Aco','Ouro','Rubi','Safira','Esmeralda','Diamante','Obsidiana','Materia Prima']
const qual = ['sem','|','||','|||']
function up () {
    let Z = armas[Math.floor(Math.random() * armas.length)];
    let X = nome[Math.floor(Math.random() * nome.length)];
    let Y = qual[Math.floor(Math.random() * qual.length)];
    if (X === 'Sem'){
        Y = 'Sem'
    }
    switch(X){
        case 'Madeira':
        case 'Argila':
        case 'Cobre':
        case 'Bronze':
        corTier = 'sienna';
        break;
        
        case 'Prata':
        case 'Ferro':
        case 'Aco':
        corTier = 'darkgray';
        break;
        
        case 'Ouro':
        corTier = 'goldenrod';
        break;
        
        case 'Rubi':
        corTier = 'darkred';
        break;
        
        case 'Safira':
        corTier = 'darkblue';
        break;
        
        case 'Esmeralda':
        corTier = 'limegreen';
        break;
        
        case 'Diamante':
        corTier = 'darkturquoise';
        break;
        
        case 'Obsidiana':
        corTier = 'dimgray';
        break;
        
        case 'Materia Prima':
        corTier = 'purple';
        break;
        
        default:
        corTier = 'white';
    }
    return {
        'nome': Z,
        'tier': X,
        'qual': Y,
        'cor': corTier
    }
    //raridade.push(baseUp)
}

console.log(up())