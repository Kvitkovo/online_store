package ua.kvitkovo.catalog.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static ua.kvitkovo.JsonConverter.GSON;
import static ua.kvitkovo.data.CategoryTestData.CATEGORY;
import static ua.kvitkovo.data.CategoryTestData.CATEGORY_RESPONSE_DTO;
import static ua.kvitkovo.data.CategoryTestData.URL;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import ua.kvitkovo.JsonConverter;
import ua.kvitkovo.catalog.converter.CategoryDtoMapper;
import ua.kvitkovo.catalog.dto.response.CategoryResponseDto;
import ua.kvitkovo.catalog.service.CategoryService;
import ua.kvitkovo.errorhandling.ItemNotFoundException;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private CategoryDtoMapper categoryMapper;

    protected String getContentAsString(MvcResult result) throws UnsupportedEncodingException {
        return result.getResponse().getContentAsString();
    }

    @Test
    void getAll() throws Exception {
        var dtos = Collections.singletonList(CATEGORY_RESPONSE_DTO);
        Mockito.when(categoryService.getAll())
            .thenReturn(Collections.singletonList(CATEGORY));

        Mockito.when(categoryMapper.mapEntityToDto(Collections.singletonList(CATEGORY)))
            .thenReturn(dtos);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(URL)
            .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andReturn();

        assertThat(result).isNotNull();

        List<CategoryResponseDto> actual = JsonConverter.convertJsonStringToList(
            getContentAsString(result), CategoryResponseDto.class);

        assertIterableEquals(dtos, actual);
    }

    @Test
    void getAllEmptyResult() throws Exception {
        var dtos = Collections.EMPTY_LIST;

        Mockito.when(categoryService.getAll())
            .thenReturn(Collections.EMPTY_LIST);

        Mockito.when(categoryMapper.mapEntityToDto(Collections.EMPTY_LIST))
            .thenReturn(dtos);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(URL)
            .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andReturn();

        assertThat(result).isNotNull();

        List<CategoryResponseDto> actual = JsonConverter.convertJsonStringToList(
            getContentAsString(result), CategoryResponseDto.class);

        assertTrue(actual.isEmpty());
        assertIterableEquals(dtos, actual);
    }

    @Test
    void getCategoryById() throws Exception {
        Mockito.when(categoryService.findById(CATEGORY.getId()))
            .thenReturn(CATEGORY);

        Mockito.when(categoryMapper.mapEntityToDto(CATEGORY))
            .thenReturn(CATEGORY_RESPONSE_DTO);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(URL + "/1")
            .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andReturn();

        CategoryResponseDto actual = GSON.fromJson(getContentAsString(result),
            CategoryResponseDto.class);

        assertThat(result).isNotNull();
        assertInstanceOf(CategoryResponseDto.class, actual);
        assertEquals(CATEGORY_RESPONSE_DTO, actual);
    }

    @Test
    void getCategoryByIdNotFound() throws Exception {
        var invalidID = 0;
        Mockito.when(categoryService.findById(invalidID))
            .thenThrow(ItemNotFoundException.class);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(URL + "/" + invalidID))
            .andExpect(status().isNotFound())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andReturn();
    }
}