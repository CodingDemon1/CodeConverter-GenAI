const baseURL = "https://precious-gray-clothes.cyclic.app";
const inputFeild = document.getElementById("editorContainer");
const outputLanguage = document.getElementById("outputLanguage");
const languageSelect = document.getElementById("inputLanguage");
const outputScreen = document.getElementById("outputScreen");

// All Buttons
const convertBtn = document.getElementById("convertBtn");
const debugBtn = document.getElementById("debugBtn");
const qualityCheckBtn = document.getElementById("qualityCheckBtn");

// Load Monaco Editor
require.config({
	paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
});
require(["vs/editor/editor.main"], function () {
	// Function to set the language of the editor based on the selected option
	function setEditorLanguage(language) {
		monaco.editor.setModelLanguage(editor.getModel(), language);
		console.log("language Changed", language);
	}

	// Initialize the editor with default JavaScript code
	const editor = monaco.editor.create(inputFeild, {
		value: [
			"//Welcome to the Code Definer",
			"//A place where you can play with your code with some learnings",
			"//The default janguage is JavaScript",
			"//But you can change the language",
			"//-----------------------------------",
			"function hello() {",
			'\talert("Hello, world!");',
			"}",
		].join("\n"),
		language: "javascript",
		theme: "vs-dark",
	});

	// Event listener for the select tag to change the language of the editor

	languageSelect.addEventListener("change", function () {
		const selectedLanguage = languageSelect.value;
		setEditorLanguage(selectedLanguage);
	});

	convertBtn.addEventListener("click", () => {
		outputScreen.innerHTML = `
        <h2>
            Converting code on process
        </h2>
        <h3>Please Wait!!!</h3>
        <img src="https://i.gifer.com/ZKZg.gif" class="loading" alt="">
        `;
		const postBody = {
			code: editor.getValue() || "javascript",
			language: outputLanguage.value,
		};
		fetch(`${baseURL}/convert`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(postBody),
		})
			.then((res) => res.json())
			.then((result) => {
				const resultCode = JSON.parse(result.content);
				console.log(result);
				outputScreen.innerHTML = null;

				console.log(resultCode.code);

				// const formatted_Code = formatCode(resultCode.code);

				outputScreen.innerHTML = `
				    <h3 class = "text-center">Converted Output</h3>
				    <br>

                    <div id="outputSnippet" class="w-100">${resultCode.code}</div>
				`;
			});
	});

	debugBtn.addEventListener("click", () => {
		outputScreen.innerHTML = `
        <h2>
            Debugging on process
        </h2>
        <h3>Please Wait!!!</h3>
        <img src="https://i.gifer.com/ZKZg.gif" class="loading" alt="">
        `;
		const postBody = {
			code: editor.getValue(),
			language: languageSelect.value || "javascript",
		};
		fetch(`${baseURL}/debug`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(postBody),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				const debugResult = JSON.parse(result.content);
				outputScreen.innerHTML = null;

				console.log(debugResult.numberError);

				// const formatted_Code = formatCode(resultCode.code);

				outputScreen.innerHTML = `
				    <h3 class = "text-center">Thoughts of the Debugger.</h3>
				    <br>

                    <div id="outputSnippet" class="w-100 text-wrap">${
											debugResult.numberError
												? debugResult.error.join("/n")
												: debugResult.extra
										}</div>
				`;
			});
	});

	// Quality Checks
	qualityCheckBtn.addEventListener("click", () => {
		outputScreen.innerHTML = `
        <h2>
            Quality Checking on process
        </h2>
        <h3>Please Wait!!!</h3>
        <img src="https://i.gifer.com/ZKZg.gif" class="loading" alt="">
        `;
		const postBody = {
			code: editor.getValue(),
			language: languageSelect.value || "javascript",
		};
		fetch(`${baseURL}/qc`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(postBody),
		})
			.then((res) => res.json())
			.then((result) => {
				const analysisResult = JSON.parse(result.content);
				outputScreen.innerHTML = null;

				const analysisReport = [];
				analysisResult.analysis.map((ele, ind) => {
					analysisReport.push(`<p><b>${ind + 1}</b>: ${ele} </p>`);
				});

				console.log(analysisResult.extra);
				outputScreen.innerHTML = `
				    <h3 class = "text-center">Quality Analysis Result</h3>
				    <br>

                    <div id="outputSnippet" class="w-100 text-wrap">
                        <h2>Summary</h2>
                        <b>${analysisResult.extra}</b>
                        
                        <h2>Parameters</h2>
                        ${analysisReport.join("\n")}



                    </div>
				`;
			});
	});
});
