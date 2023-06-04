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

// Função para salvar as informações do usuário no banco de dados
function saveUserInfo(userId, userInfo) {
  var userRef = firebase.database().ref('users/' + userId);
  
  // Salve as informações do usuário na tabela correspondente
  userRef.set(userInfo)
    .then(function() {
      // As informações foram salvas com sucesso
    })
    .catch(function(error) {
      // Ocorreu um erro ao salvar as informações
      console.error(error);
    });
}

// Função para carregar as informações do usuário do banco de dados
function loadUserInfo(userId) {
  var userRef = firebase.database().ref('users/' + userId);
  
  // Recupere as informações do usuário da tabela correspondente
  userRef.once('value')
    .then(function(snapshot) {
      var userInfo = snapshot.val();
      
      // Faça algo com as informações do usuário recuperadas
      console.log(userInfo);
    })
    .catch(function(error) {
      // Ocorreu um erro ao carregar as informações
      console.error(error);
    });
}

// Manipulador de evento para o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  // Execute a lógica de autenticação aqui
  // Por exemplo, faça uma solicitação AJAX para um endpoint de autenticação no servidor
  
  // Após a autenticação bem-sucedida, obtenha o ID do usuário logado
  var userId = firebase.auth().currentUser.uid;
  
  // Carregue as informações do usuário do banco de dados
  loadUserInfo(userId);
  
  // Após a autenticação bem-sucedida, chame a função showGamePage()
  showGamePage();
});

// Manipulador de evento para o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário (comportamento padrão)

  // Obtenha os valores dos campos de entrada de e-mail e senha
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;

  // Crie um novo usuário no Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // O registro foi bem-sucedido, o usuário foi criado
      var user = userCredential.user;
      var userId = user.uid;
      
      // Crie uma tabela para o usuário no nó "users"
      var userRef = firebase.database().ref('users/' + userId);
      
      // Salve as informações iniciais do jogador
      var initialData = {
        recursos: {
          ouro: 0,
          gemas: 0
        }
        // Outras informações do jogador, se necessário
      };
      
      // Salve as informações iniciais do jogador no banco de dados
      userRef.set(initialData)
        .then(function() {
          // As informações iniciais foram salvas com sucesso
        })
        .catch(function(error) {
          // Ocorreu um erro ao salvar as informações iniciais
          console.error(error);
        });
      
      // Após o registro bem-sucedido, chame a função showGamePage()
      showGamePage();
    })
    .catch(function(error) {
      // Ocorreu um erro durante o registro
      console.error(error);
    });
});
