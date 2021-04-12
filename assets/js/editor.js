// Retrieve Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');
const bash = "46";
const c = "50";
const cpp = "54";
const java = "62";
const javascript = "63";
const php = "68";
const python = "71";
const BASE_URL = "http://40.80.89.241:2358/submissions";

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = "// Start writing your Code! \n// Default language is C";
let consoleMessages = [];
var lang_id = "";

let editorLib = {

    //clear Console
    clearConsoleScreen() {
        consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
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
        console.log("Languge ID: " + language_id);
        lang_id = language_id;
    },

    // Post Request Data to Run Code
    codeRun(lang_id, userCode) {
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
        let request = $.ajax({
            url: BASE_URL,
            type: "post",
            data: post_data
        });
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        // Callback handler that will be called on success
        request.done(async function (response, textStatus, jqXHR) {
            // Log a message to the console
            //console.log("Hooray, it worked!");
            let token = response.token;
            await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec
            //console.log(3, "after 3 seconds");
            let second_request = $.ajax({
                url: BASE_URL + "/" + token,
                type: "get",
            });
            second_request.done(function (response) {
                if (response.stdout != null) {
                    //console.log(response.stdout);
                    $("#ans").html(response.stdout);
                } else {
                    //console.log(response.stderr);
                    $("#ans").html(response.stderr);
                }
                //console.log(response.stdout, response.stderr);
            });
        });
    },
    // Initialization
    init() {
        // Set Options
        codeEditor.setOptions({
            fontFamily: 'Inconsolata',
            fontSize: '15pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
        codeEditor.setValue(defaultCode)
    }
}
editorLib.init();


// Events
executeCodeBtn.addEventListener('click', () => {
    // Clear console messages
    editorLib.clearConsoleScreen();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    editorLib.codeRun(lang_id, userCode);

});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);

    // Clear console messages
    editorLib.clearConsoleScreen();
})
