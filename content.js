const login = document.head.querySelector('meta[name=user-login]')?.content ?? null;

if (login) {
  chrome.runtime.sendMessage({login: login}, (response) => {
    alert(JSON.stringify(response ?? runtime.lastError, null, 2));
  });
}
