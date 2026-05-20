// Archived backend adapter boundary. Demo routes use local mock services instead
// of importing or calling this module, and this fallback deliberately avoids any
// network request if a historical path is reached accidentally.
let remote = (() => {
  function archivedRequest() {
    return Promise.reject(
      new Error("Archived backend calls are disabled for the portfolio demo.")
    );
  }

  function get() {
    return archivedRequest();
  }

  function post() {
    return archivedRequest();
  }

  function update() {
    return archivedRequest();
  }

  function remove() {
    return archivedRequest();
  }

  return {
    get,
    post,
    update,
    remove
  };
})();
export default remote;
