let auth = (() => {
  function isAuth() {
    return sessionStorage.getItem("authtoken") !== null;
  }

  function saveSession(userData) {
    sessionStorage.setItem("authtoken", userData._kmd.authtoken);
    sessionStorage.setItem("username", userData.username);
    sessionStorage.setItem("userId", userData._id);
    sessionStorage.setItem("isAdmin", userData.isAdmin);
    sessionStorage.setItem("profilePic", userData.profilePic);
  }

  function register(username, password, isAdmin, profilePic) {
    let obj = {
      _id: `demo-user-${Date.now()}`,
      _kmd: { authtoken: "demo-token" },
      username,
      password,
      isAdmin: isAdmin ? "true" : "false",
      profilePic
    };

    return Promise.resolve(obj);
  }

  function login(username, password) {
    let obj = {
      _id: "demo-admin",
      _kmd: { authtoken: "demo-token" },
      username: username || "demo",
      isAdmin: "true",
      profilePic:
        "https://cdn.playbuzz.com/cdn//5918be09-9cb6-4b9c-8aed-09a6c067c333/e2224e33-3938-4898-8087-47dc5b04cb0a.jpg"
    };

    return Promise.resolve(obj);
  }

  function logout() {
    sessionStorage.clear();
    return Promise.resolve({ ok: true });
  }

  return {
    isAuth,
    login,
    logout,
    register,
    saveSession
  };
})();
export default auth;
