package ua.kvitkovo.products.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Andriy Gaponov
 */
@Tag(name = "Categories")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/categories")
public class CategoryController {

}
