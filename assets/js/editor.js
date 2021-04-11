// Retrieve Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hello World!")';
let consoleMessages = [];
lang_id = "";


let editorLib = {

    //clear Console
    clearConsoleScreen() {
        consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },

    //print to Console
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },

    // Change Theme Dynamic
    getAndChangeTheme() {
        var value = document.getElementById("choose_theme");
        getTheme = value.options[value.selectedIndex].value;
        //console.log(getValue);
        // Theme
        codeEditor.setTheme("ace/theme/" + getTheme);
    },

    // Get Languge ID from DropDown
    getCodeLanguage() {
        var language = document.getElementById("choose_language");
        language_id = language.options[language.selectedIndex].value;
        //console.log("Languge ID: " + getLanguage);
        lang_id = language_id;
    },

    //
    changeLanguage(lang_id, userCode) {
        //console.log("Language Selected is: " + lang_id);
        let post_data = {
            source_code: userCode,
            language_id: lang_id,
            number_of_runs: "1",
            stdin: "Judge0",
            expected_output: null,
            cpu_time_limit: "2",
            cpu_extra_time: "0.5",
            wall_time_limit: "5",
            memory_limit: "128000",
            stack_limit: "64000",
            max_processes_and_or_threads: "60",
            enable_per_process_and_thread_time_limit: false,
            enable_per_process_and_thread_memory_limit: false,
            max_file_size: "1024",
        };
        //console.log(post_data);
    },

    // Initialization
    init() {

        // Configure Ace

        // Set language
        codeEditor.session.setMode("ace/mode/python")
        // Set Options
        codeEditor.setOptions({
            fontFamily: 'Inconsolata',
            fontSize: '15pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }

}
// Events
executeCodeBtn.addEventListener('click', () => {
    // Clear console messages
    editorLib.clearConsoleScreen();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    //console.log("Jai Ho: " + lang_id);
    editorLib.changeLanguage(lang_id, userCode);
    //editorLib.changeLanguage(getLanguage);

    // Print to the console
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);

    // Clear console messages
    editorLib.clearConsoleScreen();
})

editorLib.init();

