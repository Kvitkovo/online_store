package ua.kvitkovo.utils;

import com.ibm.icu.text.Transliterator;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Andriy Gaponov
 */
@Service
public class TransliterateUtils {

    private static final String CYRILLIC_TO_LATIN = "Cyrillic-Latin";
    @PersistenceContext
    EntityManager entityManager;

    public String getTransliterate(String cyrillicString) {
        if (cyrillicString == null || cyrillicString.isEmpty()) {
            return "";
        }
        Transliterator toLatinTrans = Transliterator.getInstance(CYRILLIC_TO_LATIN);
        return toLatinTrans.transliterate(cyrillicString);
    }

    public String getAlias(String table, String inputString) {
        if (inputString == null || inputString.isEmpty()) {
            return "";
        }
        inputString = inputString.replaceAll("і", "i");
        inputString = inputString.replaceAll("І", "I");
        inputString = inputString.replaceAll("є", "e");
        inputString = inputString.replaceAll("Є", "E");
        inputString = inputString.replaceAll("ї", "i");
        inputString = inputString.replaceAll("Ї", "Yi");
        inputString = inputString.replaceAll("ь", "");
        inputString = inputString.replaceAll("Ъ", "");
        inputString = inputString.replaceAll("ъ", "");
        inputString = inputString.replaceAll("'", "");
        inputString = inputString.replaceAll("Я", "YA");
        inputString = inputString.replaceAll("я", "ya");
        inputString = inputString.replaceAll("ч", "ch");
        inputString = inputString.replaceAll("Ч", "CH");
        inputString = inputString.replaceAll("ш", "sh");
        inputString = inputString.replaceAll("Ш", "SH");
        inputString = inputString.replaceAll("щ", "shch");
        inputString = inputString.replaceAll("Щ", "SHCH");
        inputString = inputString.replaceAll("ж", "zh");
        inputString = inputString.replaceAll("Ж", "ZH");
        inputString = inputString.replaceAll("Ю", "YU");
        inputString = inputString.replaceAll("Ю", "yu");
        String transliterateString = getTransliterate(inputString);
        String result = transliterateString.replaceAll("[^A-Za-zА-Яа-я0-9]", "-");
        while (checkAlias(table, result)) {
            result = result + "-" + Helper.getRandomString(3);
        }
        result = result.replaceAll("--", "-");
        result = result.replaceAll("---", "-");
        result = result.replaceAll("----", "-");
        return result;
    }

    public boolean checkAlias(String table, String alias) {
        List<Object> result;
        Query q = entityManager.createQuery(
                "SELECT a FROM " + table + " a WHERE lower(a.alias) LIKE lower(?1)",
                Object.class);
        q.setParameter(1, alias);
        result = q.getResultList();
        return !result.isEmpty();
    }
}
