const authJSON = require('../src/routers/menu.json')
const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, '../src/views/client');

function recursionCreateFolder (menus, src = srcPath) {
  menus.forEach(menu => {
    let foldername = ''
    if (menu.path) {
      foldername = menu.path.replace(/(\/|client)/g, '')
    } else {
      foldername = menu.key
    }
    const folderpath = path.join(src, foldername)
    if (!fs.existsSync(folderpath)) {
      fs.mkdirSync(folderpath)
    }
    if (menu.children && menu.children.length) {
      recursionCreateFolder(menu.children, folderpath)
    } else {
      const vueTemplate = fs.readFileSync(path.join(__dirname, 'vueTemplate'), 'utf-8')
      const templateText = vueTemplate.replace(/{name}/g, foldername)
      fs.writeFileSync(path.join(folderpath, 'index.vue'), templateText);
    }
  })
}

recursionCreateFolder(authJSON, srcPath)