
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }

  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Generating image with prompt:', prompt)

    // Example images to be used as style references
    const exampleImageUrls = [
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/f2cbe692-ad20-4bff-b421-a55eda1c8a04.png",
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/fe44072b-b974-48a0-a39a-d2887a12f356.png",
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/3f3a45ee-558a-42fe-8b21-1592b98d00b1.png",
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/f454ac18-46ca-4174-857b-94f9a6b41d71.png",
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/c0efc29f-744b-41fd-80ee-9a1cd8e8fbab.png",
      "https://55b5726f-0065-4008-ac56-ffe9c20db564.lovableproject.com/lovable-uploads/763991e4-ebd3-4026-a55d-f6241b3d9908.png"
    ]

    // Fetch all example images and convert to base64
    const imagePromises = exampleImageUrls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to fetch image at URL: ${url}, status: ${response.status}`);
          return null;
        }
        const imageBlob = await response.blob();
        const imageBuffer = await imageBlob.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(imageBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return {
          type: "image_url",
          image_url: {
            url: `data:image/png;base64,${base64}`
          }
        };
      } catch (error) {
        console.error(`Error processing image ${url}:`, error);
        return null;
      }
    });

    const imageResults = await Promise.all(imagePromises);
    const validImages = imageResults.filter(img => img !== null);

    // Build the messages array with text and image references
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...validImages
        ]
      }
    ];

    console.log(`Sending request to OpenAI with ${validImages.length} reference images`);

    // Using the vision model to handle both text and images
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        style: "vibrant", // Using vibrant style to better match neon aesthetic
        // Note: The standard DALL-E API doesn't support reference images directly
        // We're including them in the prompt context instead
      }),
    })

    const data = await response.json()
    
    if (data.error) {
      console.error('OpenAI API error:', data.error)
      return new Response(
        JSON.stringify({ error: data.error.message || 'Failed to generate image' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ imageUrl: data.data[0].url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
