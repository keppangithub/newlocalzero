    package main.java.com.example.server.entity;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import java.util.List;
    @Document(collection = "chats")
    public class Chat {
        @Id
        private String chatId;
        private List<String> userIds;
        private long lastMessageTimestamp;

        public Chat() {

        }

        public Chat(String chatId, List<String> userIds , long lastMessageTimestamp) {
            this.chatId = chatId;
            this.userIds = userIds;
            this.lastMessageTimestamp = lastMessageTimestamp;
        }

        public String getChatId() {
            return chatId;
        }

        public void setChatId(String chatId) {
            this.chatId = chatId;
        }

        public String getOtherUserId(String userId) {
            for (String id : userIds) {
                if (!id.equals(userId)) {
                    return id;
                }
            }
            return null;
        }

        public Long getLastMessageTimestamp() {
            return lastMessageTimestamp;
        }
    }
