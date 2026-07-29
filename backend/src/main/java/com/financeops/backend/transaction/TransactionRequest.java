package com.financeops.backend.transaction;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest( //represents one incoming transaction
    @NotBlank String description,
    @NotBlank String category,
    @NotNull @Positive BigDecimal amount, //rejects invalid values
    @NotBlank String type,
    @NotNull LocalDate date
) {
}