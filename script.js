// Configure o Firebase com suas credenciais
var firebaseConfig = {
  apiKey: "AIzaSyAwLyVDy4foa2D8LZk0vmia2MAbFyVskLE",
  authDomain: "projeto-cookie.firebaseapp.com",
  databaseURL: "projeto-cookie-default-rtdb.firebaseio.com",
  projectId: "1:26889422861:web:97aa8d128a6738a2e4ad44",
  storageBucket: "projeto-cookie.appspot.com",
  messagingSenderId: "BFKwUNST3F4WKnDB57ezb8kZlQm2cXHGV_LnNFa6K5k0tcLy4_oS1ENFopr82wyp5eAzGdJpO42a-cW1QwVPi-w",
  appId: "26889422861"
};

firebase.initializeApp(firebaseConfig);





// Obtenha uma referência para o serviço de autenticação do Firebase
var auth = firebase.auth();

// Obtenha uma referência para o banco de dados do Firebase
var db = firebase.database();

// Verifica se o usuário está autenticado ao carregar a página
window.addEventListener('load', function() {
  if (isUserAuthenticated()) {
    showGamePage();
  }
});

// Função para verificar se o usuário está autenticado
function isUserAuthenticated() {
  // Implemente aqui a lógica para verificar se o usuário está autenticado
  // Por exemplo, verificar se há um token de autenticação válido no armazenamento local ou em cookies
  // Retorne true se o usuário estiver autenticado, ou false caso contrário
}

// Função para exibir a página do jogo
function showGamePage() {
  document.getElementById('loginRegisterSection').style.display = 'none';
  document.getElementById('gameSection').style.display = 'block';

  // Obter os recursos do jogador
  var userId = firebase.auth().currentUser.uid;
  var resourcesRef = db.ref('users/' + userId + '/recursos');
  resourcesRef.on('value', function(snapshot) {
    var resources = snapshot.val();
    updateResources(resources);
  });

  // Configurar os eventos de obtenção de recursos
  document.getElementById('mineButton').addEventListener('click', mineResources);
  document.getElementById('chopButton').addEventListener('click', chopResources);
  document.getElementById('farmButton').addEventListener('click', farmResources);

  // Configurar o evento de venda de recursos
  document.getElementById('sellButton').addEventListener('click', sellResources);
}

// Função para atualizar a exibição dos recursos na tela
function updateResources(resources) {
  document.getElementById('mineralAmount').textContent = resources.minerals;
  document.getElementById('woodAmount').textContent = resources.wood;
  document.getElementById('foodAmount').textContent = resources.food;
  document.getElementById('goldAmount').textContent = resources.gold;
}

// Função para obter recursos do jogador
function mineResources() {
  var userId = firebase.auth().currentUser.uid;
  var resourcesRef = db.ref('users/' + userId + '/recursos');
  resourcesRef.transaction(function(resources) {
    if (resources) {
      resources.minerals += 1;
    }
    return resources;
  });
}

function chopResources() {
  var userId = firebase.auth().currentUser.uid;
  var resourcesRef = db.ref('users/' + userId + '/recursos');
  resourcesRef.transaction(function(resources) {
    if (resources) {
      resources.wood += 1;
    }
    return resources;
  });
}

function farmResources() {
  var userId = firebase.auth().currentUser.uid;
  var resourcesRef = db.ref('users/' + userId + '/recursos');
  resourcesRef.transaction(function(resources) {
    if (resources) {
      resources.food += 1;
    }
    return resources;
  });
}

// Função para vender recursos
function sellResources() {
  var userId = firebase.auth().currentUser.uid;
  var resourcesRef = db.ref('users/' + userId + '/recursos');
  resourcesRef.transaction(function(resources) {
    if (resources) {
      var totalResources = resources.minerals + resources.wood + resources.food;
      resources.gold += totalResources;
      resources.minerals = 0;
      resources.wood = 0;
      resources.food = 0;
    }
    return resources;
  });
}
