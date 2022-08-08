const login = document.head.querySelector('meta[name=user-login]')?.content ?? null

if (login) {
  const component = document.createElement('div')
  component.innerText = login

  const addComponent = () => {
    if (!component.isConnected) {
      document.querySelector('#partial-discussion-header')?.insertAdjacentElement('beforebegin', component)
    }
  }

  // const frame = document.querySelector('turbo-frame#repo-content-turbo-frame')
  let observer = new MutationObserver((mutations) => {
    addComponent()
  })
  observer.observe(document.querySelector('body'), {childList: true, subtree: true})


  chrome.runtime.sendMessage({login: login}, (response) => {
    // alert(JSON.stringify(response ?? runtime.lastError, null, 2))
  })
}
