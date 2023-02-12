package com.example.gatewayservice.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping("/test")
    public String test(){
        return "게이트웨이 서버 테스트 성공";
    }
}
