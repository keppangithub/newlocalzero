package main.java.com.example.server.controller;

public class APIKeys {

    private String url = "mongodb+srv://user:localzero@cluster0.wox2kxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


    public APIKeys() {

    }

    public String getDatabaseUrl(){
        return url;
    }

}
