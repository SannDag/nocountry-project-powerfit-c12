package com.nocountry.powerfit.model.exception.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.List;

@Setter
@Getter
@Builder
public class ApiConstraintViolationExceptionResponse {
    private String message;
    private int httpStatus;

    @Builder.Default
    private ZonedDateTime timestamp = ZonedDateTime.now();

    private List<String> errors;
}
