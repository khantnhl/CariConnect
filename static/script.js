// Handle button click
document.getElementById('submitButton').addEventListener('click', async () => {

const title = document.getElementById('title').value;
const subjects = document.getElementById('subjects').value;
const synopsis = document.getElementById('synopsis').value;


if (!subjects.trim() & !synopsis.trim()) {
    alert('Please provide valid input.');
    return;
}

else {
    alert('Fetching results! Responses may take a minute to load.')
}
try {
const response = await fetch('http://127.0.0.1:8000/recommend', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, subjects, synopsis })
});

const data = await response.json();

const output = data.recommendations.map(item => item.output)
console.log(output)
if (response.ok) 
{
    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'flex';

    //clear previous results
    // resultsDiv.innerHTML = ''
    

    console.log("RESULTS", JSON.stringify(data, null, 2))
    
    // console.log(document.getElementById('results'));

    if (data.recommendations.length === 0) {
        resultsDiv.innerHTML = '<p>No recommendations found.</p>';
        return;
    }
      // Dynamically render recommendations
    data.recommendations.forEach(item => {
        const recommendationHTML = `
        <div class="recommendation">
            <pre>
            ${item.output}
            </pre>
        </div>
        <footer></footer>
        `;
        resultsDiv.innerHTML += recommendationHTML;
    });

        // Show the results container
        resultsDiv.style.display = 'block';

} else {
    console.error(data.error);
    alert('Error: ' + data.error);
}

} catch (error) {
    console.error('Error fetching recommendations:', error);
    alert('Something went wrong!');
}
});


// Reset Button Logic
document.getElementById('resetButton').addEventListener('click', () => {
    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('subjects').value = '';
    document.getElementById('synopsis').value = '';
    // Clear and hide results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
});
