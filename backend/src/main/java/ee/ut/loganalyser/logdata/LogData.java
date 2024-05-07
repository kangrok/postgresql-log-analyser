package ee.ut.loganalyser.logdata;

import java.util.Date;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LogData {

    LogData(ErrorSeverity errorSeverity, String message) {
        this.errorSeverity = errorSeverity;
        this.message = message;
    }

    Date timestamp;
    @JsonProperty("error_severity")
    ErrorSeverity errorSeverity;
    @JsonProperty("state_code")
    String stateCode;
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
