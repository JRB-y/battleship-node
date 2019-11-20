let globalSocket = io.connect("http://localhost:9900")
let gameSocket;

new Vue({
  el: "#app",
  data: {
    appTitle: "Battleship Online",
    hasNickname: false,
    isWaiting: false,
    players: [],
    nickname: "",
    host: null,
    guest: null,
    invitation: false,
    gameLunched: false,
    cells: [],
    cell: {
      id: '',
      class: ''
    }
  },

  mounted() {
    var self = this;

    // On welcome event
    globalSocket.on("welcome", players => {
      if (this.hasNickname) {
        self.players = players;
        self.isWaiting = true;
        console.log(players);
      }
    });

    globalSocket.on("user-disconcted", function (user) {
      self.players.forEach(function (item, index) {
        if (item[1] == user[1]) {
          self.players.splice(index, 1);
          return true;
        }
      });
    });

    // receive an invitation
    globalSocket.on("game-request", function (gamePlayers) {
      self.host = gamePlayers.host;
      self.guest = gamePlayers.guest;

      self.invitation = true;
    });

    globalSocket.on("game-ready", function (gamePlayers) {

      let host = gamePlayers.host;

      // connect to the privat socket
      gameSocket = io.connect(`http://localhost:9900/${host[0]}`);

      console.log(1);
      console.log(`Connected to: localhost:9900/${host[0]}`);

      // lunch the game for the guest
      self.lunchGame();
    });
  },

  methods: {
    sendNickname() {
      globalSocket.emit("new-user", this.nickname);
      this.hasNickname = true;
    },
    sendJoinRequest(host) {
      // emit game-request to player's socket
      globalSocket.emit("send-game-request", host);
    },
    gameInit() {
      let host = this.host;
      let guest = this.guest;

      console.log(2);
      let gameSocket = io.connect(`http://localhost:9900/${host[0]}`);

      console.log(`Connected to: localhost:9900/${host[0]}`);
      globalSocket.emit("game-init", {
        host,
        guest
      });

      // lunch the game for the host
      this.lunchGame();
    },
    lunchGame() {
      this.gameLunched = true;
      this.isWaiting = false;
      this.invitation = false;
      // lunch the game
      this.draw();
    },
    draw: function () {

      for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++)
          this.cells.push({
            class: 'cell',
            id: `cell-${i}-${j}`
          })
      }
    }
  }
});