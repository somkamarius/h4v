export type Journey = {
    scenario: string
    conversation: Conversation[]
}

export type Conversation = { role: string; content: string }
