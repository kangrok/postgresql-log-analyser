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
    @JsonProperty("internal_query")
    String internalQuery;
    String context;

    ErrorType errorType;

    public void addStatementLine(String line) {
        this.statement += '\n' + line;
    }

    public void addInternalQueryLine(String line) {
        this.internalQuery += '\n' + line;
    }

    public void addContextLine(String line) {
        this.context += '\n' + line;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof LogData logData)) {
            return false;
        }
        return Objects.equals(logData.statement.toLowerCase(), this.statement.toLowerCase())
                && Objects.equals(comparableMessage(logData.message), comparableMessage(this.message));
    }

    @Override
    public int hashCode() {
        return Objects.hash(statement, message);
    }

    private String comparableMessage(String message) {
        return message.split("at character")[0].toLowerCase();
    }
}
