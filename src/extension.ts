// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function insertTextIntoDocument(text: string): boolean {
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    return false; // No open text editor
  }
  if (editor !== undefined) {
    let insertPosition: vscode.Position = editor.selection.active;
    editor.edit(edit => {
      edit.insert(insertPosition, text);
    });
    return true;
  } else {
    return false;
  }
}

function registerCommand(context: vscode.ExtensionContext, char: string) {
  let disposable = vscode.commands.registerCommand(`js-touch.${char}`, () => {
    // The code you place here will be executed every time your command is executed

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    insertTextIntoDocument(char);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  registerCommand(context, "{");
  registerCommand(context, "}");
  registerCommand(context, "\\");
  registerCommand(context, "|");
}

// this method is called when your extension is deactivated
export function deactivate() {}
