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
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      showGamePage();
    }
  });
});

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

  // Faça login usando o Firebase
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      showGamePage();
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Manipulador de evento para o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;

  // Registre um novo usuário usando o Firebase
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      showGamePage();
    })
    .catch(function(error) {
      console.log(error);
    });
});
