package ua.kvitkovo.utils;

import com.github.moneytostr.MoneyToStr;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CurrencyUtils {

    public static String formatAmountInUkrainian(BigDecimal amount) {
        MoneyToStr moneyToStr = new MoneyToStr(MoneyToStr.Currency.UAH, MoneyToStr.Language.UKR, MoneyToStr.Pennies.NUMBER);
        return moneyToStr.convert(amount.doubleValue());
    }
}
