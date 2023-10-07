export type Journey = {
    scenario: string
    conversation: Conversation[]
}

export type Conversation = { role: string; content: string }

export type StreamingResponse = {
    status: string
    scenario: string
    conversation: Conversation[]
    id: string
}

export type MessageResponse = {
    status: string
    message: string
}
