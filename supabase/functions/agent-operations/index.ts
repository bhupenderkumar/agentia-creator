import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface AgentConfig {
  name: string;
  type: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, config } = await req.json()
    console.log(`Processing ${action} with config:`, config)

    switch (action) {
      case 'create':
        // Here we'll integrate with PyAutoGen to create an agent
        // For now, we'll simulate the response
        return new Response(
          JSON.stringify({
            success: true,
            agent: {
              id: crypto.randomUUID(),
              ...config,
              status: 'active'
            }
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        )

      case 'chat':
        // Here we'll integrate with PyAutoGen for agent communication
        // For now, we'll simulate the response
        return new Response(
          JSON.stringify({
            success: true,
            response: `Simulated response from agent: ${config.message}`
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        )

      default:
        throw new Error(`Unsupported action: ${action}`)
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})