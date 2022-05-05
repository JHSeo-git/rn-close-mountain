import { action, makeObservable, observable } from 'mobx';

class EmailSignInStore {
  email: string | undefined;
  password: string | undefined;

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      setEmail: action,
      setPassword: action,
      reset: action,
    });
  }

  setEmail = (email: string | undefined) => {
    this.email = email;
  };

  setPassword = (password: string | undefined) => {
    this.password = password;
  };

  reset = () => {
    this.email = undefined;
    this.password = undefined;
  };
}

export default EmailSignInStore;
