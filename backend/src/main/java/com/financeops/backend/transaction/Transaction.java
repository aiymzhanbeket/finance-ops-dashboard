package com.financeops.backend.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String category;
    private BigDecimal amount;
    private String type;
    private LocalDate date;
    private String status;

    protected Transaction() {
    }

    public Transaction(
        String description,
        String category,
        BigDecimal amount,
        String type,
        LocalDate date,
        String status
    ) {
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getType() {
        return type;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }
}