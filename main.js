console.log('main js asdf');

chrome.contextMenus.create({
  id: 'copy-nmn-row',
  title: 'Send row to DME',
  contexts: ['page']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
});
