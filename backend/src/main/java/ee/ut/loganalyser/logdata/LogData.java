package ee.ut.loganalyser.logdata;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogData {

    LogData(ErrorSeverity errorSeverity, String message) {
        this.errorSeverity = errorSeverity;
        this.message = message;
    }

    @JsonProperty("error_severity")
    ErrorSeverity errorSeverity;   // analyse ERROR, ignore LOG, FATAL
    String message;
    String detail;
    String hint;
    String statement;

    ErrorType errorType;

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof LogData logData)) {
            return false;
        }
        return Objects.equals(logData.statement.toLowerCase(), this.statement.toLowerCase())
                && Objects.equals(logData.message, this.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(statement, message);
    }
}
