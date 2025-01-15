export enum MSAgentProtocolMessageType {
    // Client-to-server
    Join = "join",
    Talk = "talk",
    // Server-to-client
    AddUser = "adduser",
    RemoveUser = "remuser",
    Message = "msg"
}

export interface MSAgentProtocolMessage {
    op: MSAgentProtocolMessageType
}

// Client-to-server messages
export interface MSAgentJoinMessage extends MSAgentProtocolMessage {
    op: MSAgentProtocolMessageType.Join,
    data: {
        username: string;
    }
}

export interface MSAgentTalkMessage extends MSAgentProtocolMessage {
    op: MSAgentProtocolMessageType.Talk,
    data: {
        msg: string;
    }
}

// Server-to-client messages
export interface MSAgentAddUserMessage extends MSAgentProtocolMessage {
    op: MSAgentProtocolMessageType.AddUser,
    data: {
        username: string;
    }
}

export interface MSAgentRemoveUserMessage extends MSAgentProtocolMessage {
    op: MSAgentProtocolMessageType.RemoveUser,
    data: {
        username: string;
    }
} 
