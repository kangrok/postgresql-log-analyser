package ee.ut.loganalyser.analysis;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RepeatedError {

    RepeatedError(String message, int amount) {
        this.message = message;
        this.amount = amount;
    }

    String message;
    String statement;
    int amount;
}
