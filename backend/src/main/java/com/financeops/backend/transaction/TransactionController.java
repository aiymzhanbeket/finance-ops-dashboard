package com.financeops.backend.transaction;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
@RestController
public class TransactionController {

    @GetMapping("/api/transactions")
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    private final TransactionRepository transactionRepository;

    public TransactionController(
        TransactionRepository transactionRepository
    ) {
        this.transactionRepository = transactionRepository;
    }

    @PostMapping("/api/transactions")
    @ResponseStatus(HttpStatus.CREATED)
    public Transaction createTransaction(
        @Valid @RequestBody TransactionRequest request
    ) {
        Transaction transaction = new Transaction(
            request.description(),
            request.category(),
            request.amount(),
            request.type(),
            request.date(),
            "Pending"
        );

        return transactionRepository.save(transaction);
    }
}