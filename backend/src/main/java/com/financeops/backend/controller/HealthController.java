package com.financeops.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //tells that this class controlls web requests 
public class HealthController {

    @GetMapping("/api/health") //connects url to that method
    public String checkHealth() {
        return "FinanceOps backend is running";
    }
}