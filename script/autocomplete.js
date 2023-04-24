let suggestionsArray = [];

const autocompleteInputs = document.getElementsByClassName('autocomplete');

// Populate the suggestions array with the external server data
function populateSuggestionsArray() {
  const externalData = ['Apple', 'Appricot', 'Apine', 'Ambue', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape', 'Passion', 'Pineapple'];
  suggestionsArray = [ ...externalData];
//   console.log(suggestionsArray);
}

// Filter the suggestions array based on the user input and display the filtered results

const inputCollections = Array.from(autocompleteInputs);

export function auto_complete(input) {
    const suggestions = input.nextElementSibling;

    // const callBack = filterSuggestions(item)

    function filterSuggestions(item) {
        console.log('I have ben fired!');
        
        const query = item.value;

        let filteredArray = suggestionsArray.filter(item => {

          const regex = new RegExp(`^${query}`, 'gi');
          return item.match(regex);
        });
      
        if (!query.length) {
          suggestions.innerHTML = '';
          filteredArray = [];
          return;
        }
      
        outputHTML(filteredArray, suggestions, input);
    }

      input.addEventListener('input', () => {
        filterSuggestions(input)
      })
}

inputCollections.forEach(auto_complete)

function outputHTML(filteredArray, suggestions, input) {
       suggestions.innerHTML = ''// First clear out what is in the container before dding anything. Else there will be duplicates
      
    
      filteredArray.forEach(function(item) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item;
        suggestions.appendChild(link);
    
        link.addEventListener('click', function(event) {
          event.preventDefault();
          input.value = item;
          suggestions.innerHTML = '';
        });
      });
    }


// document.querySelector('form').addEventListener('submit', async function(event) {
//   event.preventDefault();
//   const input = document.querySelector('#autocomplete');
//   const value = input.value;
//   const response = await fetch('/submit', {
//     method: 'POST',
//     body: JSON.stringify({ value }),
//     headers: { 'Content-Type': 'application/json' }
//   });
//   const result = await response.json();
//   console.log(result);
// });

// Call the function to populate the suggestions array when the page loads

// populateSuggestionsArray();
window.addEventListener('DOMContentLoaded', populateSuggestionsArray);

