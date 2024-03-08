package ee.ut.loganalyser.analysis;

import ee.ut.loganalyser.logdata.ErrorSeverity;
import ee.ut.loganalyser.logdata.ErrorType;
import ee.ut.loganalyser.logdata.LogData;
import ee.ut.loganalyser.logdata.StudentLogs;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.util.*;

@Data
public class Analysis {

    String studentName;

    String[] fileNames;
    int errorCount = 0;
    int uniqueErrorCount = 0;
    int validCount = 0;

    int syntaxErrorCount = 0;
    int nonExistentValueCount = 0;
    int constraintViolationCount = 0;
    int alreadyExistsErrorCount = 0;
    int typoCount = 0;
    int aggregateErrorCount = 0;
    int otherErrorCount = 0;

    @Setter(AccessLevel.NONE)
    List<LogData> logs;

    Map<String, Integer> repeatedErrors = new LinkedHashMap<>();

    public Analysis(StudentLogs studentLogs) {
        this.studentName = studentLogs.getName();
        this.fileNames = studentLogs.getFileNames().toArray(String[]::new);
        this.logs = studentLogs.getLogs();
        categorizeLogData();
    }

    public Analysis(List<LogData> log) {
        this.logs = log;
        categorizeLogData();
    }

    private void categorizeLogData() {
        Set<LogData> uniqueErrors = new HashSet<>();
        Map<LogData, Integer> repeatedErrorCounts = new HashMap<>();

        for (LogData logData : this.logs) {
            if (logData.getErrorSeverity() == ErrorSeverity.ERROR) {
                errorCount++;

                if (logData.getHint() != null && logData.getHint().contains("Perhaps you meant")) {
                    logData.setErrorType(ErrorType.TYPO);
                    typoCount++;
                } else if (Arrays.stream(new String[] {"aggregate", "group by", "having"})
                        .anyMatch(logData.getMessage().toLowerCase()::contains)) {
                    logData.setErrorType(ErrorType.AGGREGATE);
                    aggregateErrorCount++;
                } else if (logData.getMessage().contains("syntax")) {
                    logData.setErrorType(ErrorType.SYNTAX);
                    syntaxErrorCount++;
                } else if (logData.getMessage().contains("does not exist")) {
                    logData.setErrorType(ErrorType.NON_EXISTENT_VALUE);
                    nonExistentValueCount++;
                } else if (logData.getMessage().contains("violates")) {
                    logData.setErrorType(ErrorType.CONSTRAINT_VIOLATION);
                    constraintViolationCount++;
                } else if (logData.getMessage().contains("already exists")) {
                    logData.setErrorType(ErrorType.ALREADY_EXISTS);
                    alreadyExistsErrorCount++;
                } else {
                    logData.setErrorType(ErrorType.OTHER);
                    otherErrorCount++;
                }

                if (uniqueErrors.contains(logData)) {
                    repeatedErrorCounts.put(logData, repeatedErrorCounts.getOrDefault(logData, 0) + 1);
                } else {
                    uniqueErrors.add(logData);
                }
            } else if (logData.getStatement() != null) {
                logData.setErrorType(ErrorType.VALID);
                validCount++;
            }
        }
        uniqueErrorCount = uniqueErrors.size();

        repeatedErrorCounts.entrySet().stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .forEach(entry -> repeatedErrors.put(entry.getKey().getMessage(), entry.getValue()));
    }
}
