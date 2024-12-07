const https = require('https');

const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=5193702c3e984f27a6617d9a49d351b1';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0'
    }
};

function clean(description) {
    const regex = /^[^.(\["']+/; // Matches text up to the first period, ignoring quotes or parentheses
    const match = description.match(regex);
    return match ? match[0].trim() : null;
}

// Make a GET request
https.get(url, options, (res) => {
    let data = '';

    // Listen for chunks of data
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Process the complete response
    res.on('end', () => {
        try {
            const jsonResponse = JSON.parse(data);
            const articles = jsonResponse.articles;

            // Check if articles is an array
            if (Array.isArray(articles)) {
                // Retrieve descriptions
                const descriptions = articles
		.filter(article => article.description)		
		.map(article => {
                    const originalDescription = article.description;
                    const extractedText = clean(originalDescription);
                    return extractedText;
                });

                console.log('Descriptions:', descriptions);
            } else {
                console.error('Field "articles" is not an array.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error.message);
        }
    });
}).on('error', (err) => {
    console.error('Request failed:', err.message);
});
