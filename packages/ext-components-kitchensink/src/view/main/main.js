//import hljs from 'highlight.js';
import hljs, { highlightBlock } from 'highlightjs';
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);
import './main.css';

//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);

//import hljs from 'highlight.js/lib/highlight'
//hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
//hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
//hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
//hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
//hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

export default class main {

  constructor() {}

  toggleCode() {
    var collapsed = this.codePanelCmp.getHidden()
    if(collapsed == true) { collapsed = false }
    else { collapsed = true }
    this.codePanelCmp.setHidden(collapsed)
  }

  toggleTree() {
    var collapsed = this.treePanelCmp.getCollapsed()
    if (collapsed == true){collapsed = false} else{collapsed = true}
    this.treePanelCmp.setCollapsed(collapsed)
  }

  readyTreePanel(event) {
    var cmp = event.detail.cmp
    this.treePanelCmp = cmp
  }

  readyTreelist(event) {
    var treelistCmp = event.detail.cmp
    var navTreeRoot = {
      id: '/',
      text: 'All',
      children: window.menu
    }
    this.transform(navTreeRoot, null); 
    var treeStore = Ext.create('Ext.data.TreeStore', {
      rootVisible: true,
      root: navTreeRoot
    })
    treelistCmp.setStore(treeStore)
    var node = treelistCmp.getStore().findNode('hash', window.initHash);
    treelistCmp.setSelection(node);
  }

  transform(node, parentUrl) {
    node.leaf = !node.hasOwnProperty('children');
    node.iconCls = node.navIcon;
    if (node.text && !node.id) {
        node.id = (parentUrl === '/' ? '' : parentUrl) + '/' + node.text.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '');
    }
    node.name = node.text;
    if (node.children) {
        node.children = node.children.filter(node => !node.hidden);
        node.children.forEach(child => this.transform(child, node.id))
    }
  }

  selectionchange(event) {
    var record = event.detail.record
    var hash = record.data.hash
    var childNum = record.childNodes.length
    if (childNum == 0 && hash != undefined) {
      window.location.hash = '#' + hash
      this.setCodeTabs()
      var className = record.data.className
      window[className.name] = new className()
    }
  }


  cssClassName = (file) => {
    if (file.endsWith(".html")) {
      return 'xml';
    }
    if (file.endsWith(".js")) {
      return 'js';
    }
}


  setCodeTabs() {
    var codeMap = _code[window.location.hash.substr(1)]
    var me = this
    if(me.tabPanelCmp != undefined) {
      me.tabPanelCmp.removeAll()
      Object.keys(codeMap).map((file) => {
        me.tabPanelCmp.add({
          xtype: 'panel',
          ui: 'code-panel',
          layout: 'fit',
          userSelectable: true,
          scrollable: true,
          tab: {ui: 'app-code-tab', flex: 0, minWidth: 120},
          title: file,
          //html: `<pre><code mwlHighlightJs id='${file}' class='code ${this.cssClassName(file)}'>${codeMap[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`

          html: `<pre><code class='code'>${codeMap[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
        })
      })

      setTimeout(function() {

        console.log(hljs)
        document.querySelectorAll('pre code').forEach((block) => {
          console.log(block)
          hljs.highlightBlock(block);
        });

        // document.querySelectorAll(".code").forEach((el) => {
        //   console.log('here')
        //   console.log(el)
        //   hljs.highlightBlock(el);
        // });
      },50);
    }
  }

  readyCodePanel(event) {
    var cmp = event.detail.cmp
    this.codePanelCmp = cmp
  }

  readyTabPanel(event) {
    var cmp = event.detail.cmp
    this.tabPanelCmp = cmp
  }

}
