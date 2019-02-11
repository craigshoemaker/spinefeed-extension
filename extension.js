const vscode = require('vscode');
const feedback = require('./feedbackService');

function getActiveEditorText(vscode) {
	const fileName = vscode.window.activeTextEditor.document.fileName;
	const docs = vscode.workspace.textDocuments;

	let text = '';
	for(let i=0, len = docs.length; i<len; i++) {
		if(docs[i].fileName === fileName) {
			text = docs[i].getText();
			break;
		}
	}

	return text;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const output = vscode.window.createOutputChannel('Spinefeed Output');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.getFeedback', function () {
		try {
			const content = getActiveEditorText(vscode);
			feedback.get(content).then(response => {
				output.append(response);
				output.appendLine('-----------------------------------');
				output.show();
			});
		} catch(ex) {
			vscode.window.showErrorMessage(ex);
		}

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
