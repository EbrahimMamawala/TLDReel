// app/api/generate-quiz/route.js

export async function POST(request) {
  try {
    const body = await request.json();

    // Change "localhost" to "127.0.0.1" to force IPv4.
    const backendResponse = await fetch("http://localhost:8000/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    // Get the text response from FastAPI for inspection
    const text = await backendResponse.json();

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing backend response as JSON:", parseError, text);
      throw new Error("Invalid JSON returned from backend");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
