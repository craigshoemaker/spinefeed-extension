const vscode = require('vscode');
const appConfig = require('./config');
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

function getArticleType(content) {
	const matches = content.match(/ms\.topic:(.*)/);
	let type = '';
	if(matches.length > 1) {
		type = matches[1].trim();
	}
	return type;
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
			const type = getArticleType(content);
	
			if(feedback.isValidType(type)) {
				feedback.get(content, type).then(response => {
					output.append(response);
					output.appendLine('-----------------------------------');
					output.show();
				});
			} else {
				vscode.window.showInformationMessage(appConfig.messages.invalidArticleType);
			}
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
