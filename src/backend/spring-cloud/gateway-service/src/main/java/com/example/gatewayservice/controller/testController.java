package com.example.gatewayservice.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class testController {

    @GetMapping
    public String default_link(){
        return "게이트웨이 디폴트 성공";
    }

    @GetMapping("/test")
    public String test(){
        return "게이트웨이 서버 테스트 성공";
    }
}
