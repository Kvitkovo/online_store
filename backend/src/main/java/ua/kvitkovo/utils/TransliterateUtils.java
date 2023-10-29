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

    public static final Transliterator UA_LATIN_TRANS = Transliterator.getInstance(
        "Ukrainian-Latin/BGN");
    public static final Transliterator RU_LATIN_TRANS = Transliterator.getInstance(
        "ru-ru_Latn/BGN");

    @PersistenceContext
    private EntityManager entityManager;

    public String getTransliterate(String cyrillicString) {
        return UA_LATIN_TRANS.transliterate(RU_LATIN_TRANS.transliterate(cyrillicString));
    }

    public String getAlias(String entityName, String inputString) {
        if (inputString == null || inputString.isEmpty()) {
            return "";
        }
        String transliterateString = getTransliterate(inputString);
        String result = transliterateString.replaceAll("[^A-Za-zА-Яа-я0-9]", "-");
        while (checkAlias(entityName, result)) {
            result = result + "-" + Helper.getRandomString(3);
        }
        return result.toLowerCase();
    }

    public boolean checkAlias(String entityName, String alias) {
        List<Object> result;
        Query q = entityManager.createQuery(
            "SELECT a FROM " + entityName + " a WHERE lower(a.alias) LIKE lower(?1)",
            Object.class);
        q.setParameter(1, alias);
        result = q.getResultList();
        return !result.isEmpty();
    }
}
