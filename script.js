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

// Elementos da página
var loginEmailField = document.getElementById('loginEmail');
var loginPasswordField = document.getElementById('loginPassword');
var loginButton = document.getElementById('loginButton');

var registerEmailField = document.getElementById('registerEmail');
var registerPasswordField = document.getElementById('registerPassword');
var registerButton = document.getElementById('registerButton');

// Evento de login
loginButton.addEventListener('click', function() {
  var email = loginEmailField.value;
  var password = loginPasswordField.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      alert('Login bem-sucedido!');
      // Redirecionar para a página de jogo, por exemplo
    })
    .catch(function(error) {
      alert('Erro no login: ' + error.message);
    });
});

// Evento de registro
registerButton.addEventListener('click', function() {
  var email = registerEmailField.value;
  var password = registerPasswordField.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      alert('Registro bem-sucedido!');
      // Redirecionar para a página de jogo, por exemplo
    })
    .catch(function(error) {
      alert('Erro no registro: ' + error.message);
    });
});

