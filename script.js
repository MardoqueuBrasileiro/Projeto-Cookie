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
var database = firebase.database();

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

// Manipulador de evento para o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;

  // Crie o usuário no Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Obtenha o ID do usuário
      var userId = userCredential.user.uid;
      
      // Crie um objeto de dados iniciais para o usuário
      var initialData = {
        username: email.split('@')[0], // Use o nome de usuário com base no e-mail
        recursos: {
          ouro: 0,
          gemas: 0
        },
        level: 1
      };

      // Salve as informações iniciais do usuário no banco de dados
      var userRef = database.ref('users/' + userId);
      userRef.set(initialData)
        .then(function() {
          // As informações iniciais foram salvas com sucesso
          showGamePage(); // Exiba a página do jogo após o registro
        })
        .catch(function(error) {
          // Ocorreu um erro ao salvar as informações iniciais
          console.error(error);
        });
    })
    .catch(function(error) {
      // Ocorreu um erro durante o registro
      console.error(error);
    });
});

// Manipulador de evento para o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  // Faça o login do usuário no Firebase Authentication
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Login bem-sucedido
      showGamePage(); // Exiba a página do jogo após o login
    })
    .catch(function(error) {
      // Ocorreu um erro durante o login
      console.error(error);
    });
});
