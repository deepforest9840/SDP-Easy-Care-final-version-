package com.dailycodework.dreamshops.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final Map<String, WebSocketSession> connectedUsers = new HashMap<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> messageMap = objectMapper.readValue(payload, Map.class);

        String sender = messageMap.get("sender");
        String receiver = messageMap.get("receiver");
        String content = messageMap.get("content");

        WebSocketSession receiverSession = connectedUsers.get(receiver);
        if (receiverSession != null) {
            receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(messageMap)));
        } else {
            session.sendMessage(new TextMessage("The recipient is not connected."));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
       
        String query = session.getUri().getQuery();
        String patientEmail = null;
        String doctorEmail = null;

        if (query != null) {
            String[] params = query.split("&");
            for (String param : params) {
                String[] keyValue = param.split("=");
                if (keyValue.length == 2) {
                    if (keyValue[0].equals("patientEmail")) {
                        patientEmail = keyValue[1];
                    } else if (keyValue[0].equals("doctorEmail")) {
                        doctorEmail = keyValue[1];
                    }
                }
            }
        }

        if (patientEmail != null) {
            connectedUsers.put(patientEmail, session);
        }

        if (doctorEmail != null) {
            connectedUsers.put(doctorEmail, session);
        }

        if (patientEmail == null && doctorEmail == null) {
            session.close(CloseStatus.BAD_DATA);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        connectedUsers.values().remove(session);
    }
}