// Configure o Firebase com suas credenciais
var firebaseConfig = {
  apiKey: "AIzaSyAwLyVDy4foa2D8LZk0vmia2MAbFyVskLE",
  authDomain: "projeto-cookie.firebaseapp.com",
  projectId: "1:26889422861:web:97aa8d128a6738a2e4ad44",
  storageBucket: "projeto-cookie.appspot.com",
  messagingSenderId: "BFKwUNST3F4WKnDB57ezb8kZlQm2cXHGV_LnNFa6K5k0tcLy4_oS1ENFopr82wyp5eAzGdJpO42a-cW1QwVPi-w",
  appId: "26889422861"
};

firebase.initializeApp(firebaseConfig);

// Obtenha uma referência para o serviço de autenticação do Firebase
var auth = firebase.auth();

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
}

// Manipulador de evento para o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  // Execute a lógica de autenticação aqui
  // Por exemplo, faça uma solicitação AJAX para um endpoint de autenticação no servidor

  // Após a autenticação bem-sucedida, chame a função showGamePage()
  showGamePage();
});

// Manipulador de evento para o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;

  // Execute a lógica de registro aqui
  // Por exemplo, faça uma solicitação AJAX para um endpoint de registro no servidor

  // Após o registro bem-sucedido, chame a função showGamePage()
  showGamePage();
});
