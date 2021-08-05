const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const child_process = require('child_process');
const materialsTypeJson = require('./../config/materials_list.json');
const reactTypeJson = require('./../config/materials_list_react.json');
const flutterTypeJson = require('./../config/materials_list_flutter.json');

const CONFIG = {
  'react': reactTypeJson,
  'flutter': flutterTypeJson,
}
let VARIABLE_FILE_NAME = 'Materials'
const ROOT_NAME = vscode.workspace.workspaceFolders[0].name;

module.exports = function (context) {
  // 注册命令
  // $mid:1
  // external:"file:///Users/cuishijie/delete/nodejs/folder"
  // path:"/Users/cuishijie/delete/nodejs/folder"
  // scheme:"file"
  context.subscriptions.push(vscode.commands.registerCommand('extension.materials', (uri) => {
    // vscode.window.showInformationMessage('Hello World！你好，小茗同学！');
    // 组装pick list
    const { list } = materialsTypeJson;
    vscode.window.showQuickPick(
      list,
      {
        canPickMany: false,
        ignoreFocusOut: true,
        matchOnDescription: true,
        matchOnDetail: true,
        placeHolder: '请选择要下载的物料'
      })
      .then(function (type) {
        vscode.window.showQuickPick(
          CONFIG[type].list,
          {
            canPickMany: false,
            ignoreFocusOut: true,
            matchOnDescription: true,
            matchOnDetail: true,
            placeHolder: `请选择要下载的${type}物料`,
          }
        ).then(function(materialsName) {
          // input materials name
          vscode.window.showInputBox(
            {
              password:false,
              ignoreFocusOut:true,
              placeHolder:'请输入物料名称',
              prompt:'物料默认名称为Materials，如输入自定义物料名称，会全局替换内部命名。',
            }
          ).then(function(modifyName) {
            // 定义全局物料名称
            if (modifyName) VARIABLE_FILE_NAME = modifyName;
            // 开始拷贝物料
            const localPath = `./${type}/${materialsName}`;
            copyMaterials(localPath, uri.path, materialsName)
          });
        })
      })
  }));
};

// pipeline method remade
function copyMaterials(materialsPath, targetPath, materialsName) {
  // liunx
  function copyIt(from, to) {
    child_process.spawn('cp', ['-r', from, to]);
    // [timeout] replace keyword to busi

    setTimeout(() => {
      const filePath = path.resolve(VARIABLE_FILE_NAME, targetPath);
      // 拷贝之前去尾缀
      const noTailMaterials = materialsName;
      // 重写文件名
      var stat = fs.lstatSync(`${filePath}/${noTailMaterials}`);
      if (!stat.isFile()) {
        fs.rename(`${filePath}/${noTailMaterials}`, `${filePath}/${VARIABLE_FILE_NAME}`, function() {
          fileLoop(`${filePath}/${VARIABLE_FILE_NAME}`)
        })
      } else {
        fs.rename(`${filePath}/${noTailMaterials}`, `${filePath}/${VARIABLE_FILE_NAME}.dart`, function() {
          fileLoop(filePath)
        })
      }
    }, 500);
  }

  copyIt(path.resolve(__dirname, materialsPath), targetPath);
}

// loop
function fileLoop(filePath) {
  // 第一次做一些限制，比如别扫别的代码
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function(filename) {
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();
            var isDir = stats.isDirectory();
            if (isFile) {
              const _filename = filename.replace(/\$1/g, VARIABLE_FILE_NAME);
              const _filedir = filedir.replace(filename, _filename);

              // read
              var content = fs.readFileSync(filedir, 'utf-8');
              // 填写的变量名如果是带_的那么文件内部转为驼峰形式。
              const _VARIABLE_FILE_NAME = underline2TF(VARIABLE_FILE_NAME);
              // $2逻辑
              const rootPathWidthTail = _filedir.split(VARIABLE_FILE_NAME)[0]+VARIABLE_FILE_NAME;
              const rootPath = rootPathWidthTail.split('lib/')[1];

              // rewrite
              const reComponentNameContent = content
                .replace(/\Materials/g, stringFirstToUpperCase(_VARIABLE_FILE_NAME))
                .replace(/\materials/g, _VARIABLE_FILE_NAME)
                .replace(/\MATERIALS/g, stringAllToUpperCase(_VARIABLE_FILE_NAME))
                .replace(/\$3/g, VARIABLE_FILE_NAME)
                .replace(/\$path/g, rootPath)

              rewrite(filedir, reComponentNameContent)
              // 检测文件名是否含有变量$1,如果有替换为VARIABLE_FILE_NAME
              if (filename.includes('$1')) {
                fs.rename(filedir, _filedir, function() {})
              }
            }
            if (isDir) {
              fileLoop(filedir);
            }
          }
        })
      });
    }
  });
}

function rewrite(childPath, content) {
  fs.writeFile(childPath, content, function() {
    // over
  })
}

function stringFirstToUpperCase(str) {
	return str.split('').map((x, i) => !i ? x.toUpperCase() : x).join('');
}

function stringAllToUpperCase(str) {
	return str.split('').map(x => x.toUpperCase()).join('');
}

function underline2TF(str) {
  const hasUndeline = str.indexOf('_') > -1;
  if (!hasUndeline) return str;

  const arrs = str.split('_');
  return arrs.map((x, i) => {
    return i ? stringFirstToUpperCase(x) : x
  }).join('');
}
// vscode.window.showInformationMessage('Hello World!');
