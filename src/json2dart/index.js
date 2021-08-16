const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

module.exports = function (context) {
  // 注册命令
  // external:"file:///Users/cuishijie/delete/nodejs/folder"
  // path:"/Users/cuishijie/delete/nodejs/folder"
  // scheme:"file"
  context.subscriptions.push(vscode.commands.registerCommand('extension.json2dart', (uri) => {
    const panel = vscode.window.createWebviewPanel(
      'testWebview', // viewType
      "JOSON TO DART", // 视图标题
      vscode.ViewColumn.One, // 显示在编辑器的哪个部位
      {
        enableScripts: true, // 启用JS，默认禁用
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    );
    panel.webview.html = getWebViewContent(context, 'src/json2dart/web/index.html');
    // panel.webview.html = `<html><body>你好，我是Webview</body></html>`
  }));
}

/**
 * 获取某个扩展文件相对于webview需要的一种特殊路径格式
 * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
 * @param context 上下文
 * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
 */
function getExtensionFileVscodeResource (context, relativePath) {
  const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
  return diskPath.with({ scheme: 'vscode-resource' }).toString();
}

/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context, templatePath) {
  const resourcePath = path.join(context.extensionPath, templatePath);
  console.log(resourcePath);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, 'utf-8');
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
      return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
  });
  return html;
}