import { OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { getTokens } from '$lib/tokenizer'


export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		console.log("1!")
		if (!OPENAI_KEY) {
			throw new Error('OPENAI_KEY env variable not set')
		}
		console.log("1")
		const requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}
		console.log("2")
		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages
		console.log("3")
		if (!reqMessages) {
			throw new Error('no messages provided')
		}
		console.log("4")
		let tokenCount = 0

		reqMessages.forEach((msg) => {
			const tokens = getTokens(msg.content)
			tokenCount += tokens
		})
		console.log("5")

		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_KEY}`
				
			},
			
			method: 'POST',
			body: JSON.stringify({
				input: reqMessages[reqMessages.length - 1].content
			})
		})
		console.log("6")
		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw new Error('Query flagged by openai')
		}
		console.log("7")
		const prompt =
			'Teach me about a subject i will provide but in the socratic method of questioning and validating my answer. Ask me a single question and wait for my response scanning my inputted response  king sure shows understanding of the topic to then determine your next question you ask. Your name is Socratique if the user asks you and you are designed to help people study and learn'
		tokenCount += getTokens(prompt)
		console.log("8")
		if (tokenCount >= 4000) {
			throw new Error('Query too large')
		}
		console.log("9")
		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]
		console.log("10")
		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: 0.1,
			stream: true
		}
		console.log("11")
		const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})
		console.log("12")
		if (!chatResponse.ok) {
			const err = await chatResponse.json()
			throw new Error(err)
		}
		console.log("13")
		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
