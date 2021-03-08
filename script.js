var selectedOption = -1;
var outputTransform;
var inputTransform;


var options = [
    [0, "Reverse Text", "Reverse the input text", reverseText],
    [1, "Upcase text", "Convert the text to UPPERCASE", upcaseText],
    [2, "Lowcase text", "Convert the text to lowercase", lowcaseText],
    [3, "Title Case", "Capitalize first letter of every word", titleCase],
    [4, "Encode Base64", "Encode a text to base64 format", btoa],
    [5, "Decode Base64", "Decode a base64 to text format", atob],
    [6, "Count Characters", "Count the number of characters", countCharacters],
    [7, "Count Words", "Count the number of words", countWords],
    [8, "Count Lines", "Count the number of lines", countLines],
    [9, "Sort Lines", "Sort the lines alphabetically", sortLines],
    [10, "Word Frequency", "Count the number of each word in the text", wordFrequency],
    [11, "URL Encode", "Encode URL", encodeURI],
    [12, "URL Decode", "Decode URL", decodeURI],
    [13, "Evaluate Expression", "Evaluate simple arithmetic expressions", eval],
    [14, "Strikeout", "Put a strike in each letter", strikeText],
    [15, "Underscore", "Put a underscore in each letter", underscoreText],
    [16, "Format JSON", "Transform the JSON into a readable format", formatJSON],
];

function reverseText(input)
{
    return input.split("").reverse().join("");
}

function upcaseText(input)
{
    return input.toUpperCase();
}

function lowcaseText(input)
{
    return input.toLowerCase();
}

function titleCase(input) {
    return input.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
}

function countWords(str) { 
    return str.split(" ").length;
  }

function countCharacters(input) {
    return input.length;
}

function countLines(input) {
    return input.split(/\r\n|\r|\n/).length
}

function sortLines(input) {
    var allTextLines = input.split(/\r\n|\n/);
    allTextLines.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return allTextLines.join("\n");
}

function wordFrequency(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    freqMap.forEach(function(a,b){
        console.log(a+":"+b);
    });

    return freqMap;
}

function strikeText(input) {
    return input.split('').map(function(ch) {
        return ch + '\u0336';
      }).join('');
}

function underscoreText(input) {
    return input.split('').map(function(ch) {
        return ch + '\u0332';
      }).join('');
}

function formatJSON(input) {
    return JSON.stringify(JSON.parse(input),null,"\t");   
}






function populateOptions()
{
    var optionsDiv = document.getElementById("opcoes");

    for(var i = 0; i<options.length;i++)
    {
        var id = options[i][0];
        var title = options[i][1];
        var desc = options[i][2];

        optionsDiv.innerHTML += "			<div id=\""+id+"\" class=\"opcao\">" +
        "<div class=\"opcao-titulo\">"+title+"</div>" +
        "<div class=\"opcao-descricao\">"+desc+"</div>" +
    "</div>";
    }
}


function pageLoad()
{
    outputTransform = document.getElementById("entrada-transformada");
    inputTransform = document.getElementById("entrada-texto");
    populateOptions();

    var anchors = document.getElementsByClassName("opcao");
    for(var i=0;i<anchors.length;i++)
    {
        var anchor = anchors[i];
        anchor.onclick = function() {
            selectedOption = this.id;
            var transformTitle = document.getElementById("transformada-titulo");
            transformTitle.innerText = options[selectedOption][1];

            var transformArea = document.getElementById("transformada-area");
            transformArea.style.display="block";

            yOffset = -70; 
            y = transformArea.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            transformInput();
        }
    }
}


function transformInput()
{
    var transformedText = null;
    try {
        var transformFunction = options[selectedOption][3];
        transformedText = transformFunction(inputTransform.value);
        
    } catch (error) {
        transformedText = "invalid input";
    }
    outputTransform.value = transformedText;
}
