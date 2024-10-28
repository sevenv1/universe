addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handles the incoming request and processes the payload.
 * @param {Request} request
 * @returns {Response} JSON response with an array of strings.
 */
async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response("Only POST requests are allowed", { status: 405 });
  }

  try {
    // Parse the JSON payload
    const { type } = await request.json();

    // Generate response based on payload type
    let responseStrings;
    switch (type) {
      case "greetings":
        responseStrings = ["Hello", "Hi", "Hey", "Greetings"];
        break;
      case "farewells":
        responseStrings = ["Goodbye", "Farewell", "See you later"];
        break;
      default:
        responseStrings = ["Default response", "Please specify a valid type"];
    }

    // Return the response as JSON
    return new Response(JSON.stringify({ messages: responseStrings }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
