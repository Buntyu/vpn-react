
export default function authHeader() {
    const account = JSON.parse(localStorage.getItem('account'));
    if (account && account.auth_token) {
      return { Authorization: 'Bearer ' + account.auth_token };
    } else {
      return {};
    }
  }
  