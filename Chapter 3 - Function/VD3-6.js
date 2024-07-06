class UserValidator {
    constructor(cryptographer) {
      this.cryptographer = cryptographer;
    }
  
    async checkPassword(userName, password) {
      const user = await UserGateway.findByName(userName);
  
      if (user !== User.NULL) {
        const codedPhrase = user.getPhraseEncodedByPassword();
        const phrase = this.cryptographer.decrypt(codedPhrase, password);
  
        if (phrase === "Valid Password") {
          Session.initialize();
          return true;
        }
      }
  
      return false;
    }
  }
  