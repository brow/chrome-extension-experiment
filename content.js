const login = document.head.querySelector('meta[name=user-login]')?.content ?? null

if (login) {

  const setFilter = (value) => {
    Array
      .from(document.querySelectorAll("a.tabnav-tab"))
      .find(x => x.innerText.includes("Files changed"))
      .click()

    const field = document.querySelector('#file-tree-filter-field')
    field.value = value

    // Seems to be required to make file list react to new value
    field.dispatchEvent(new Event('focus'))
  }

  const addComponents = () => {
    if (!document.querySelector("#owleye-inline")) {
      const button = document.createElement('button')
      button.innerText = 'jklp'
      button.addEventListener('click', () => { setFilter('jklp') })

      const div = document.createElement('div')
      div.id = "owleye-inline"
      div.appendChild(button)

      document.querySelector('#partial-discussion-header')
        ?.insertAdjacentElement('afterend', div)
    }
    if (!document.querySelector("#owleye-sticky")) {
      const div = document.createElement('div')
      div.id = "owleye-sticky"
      div.innerText = "sticky"
      document.querySelector("#partial-discussion-header .js-sticky .sticky-content")
        ?.appendChild(div)
    }
  }

  // const frame = document.querySelector('turbo-frame#repo-content-turbo-frame')
  let observer = new MutationObserver((mutations) => {
    addComponents()
  })
  observer.observe(document.querySelector('body'), {childList: true, subtree: true})


  chrome.runtime.sendMessage({login: login}, (response) => {
    // alert(JSON.stringify(response ?? runtime.lastError, null, 2))
  })
}
