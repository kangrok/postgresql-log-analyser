package ee.ut.loganalyser.analysis;

import ee.ut.loganalyser.logdata.ErrorSeverity;
import ee.ut.loganalyser.logdata.ErrorType;
import ee.ut.loganalyser.logdata.LogData;
import ee.ut.loganalyser.logdata.StudentLogs;
import lombok.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Data
public class Analysis {

    private String studentName;
    private String[] fileNames;

    private String error;

    private int totalCount = 0;

    private int errorCount = 0;
    private int uniqueErrorCount = 0;
    private int validCount = 0;

    private int syntaxErrorCount = 0;
    private int nonExistentValueCount = 0;
    private int constraintViolationCount = 0;
    private int alreadyExistsErrorCount = 0;
    private int typoCount = 0;
    private int aggregateErrorCount = 0;
    private int otherErrorCount = 0;

    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    List<LogData> logs;

    List<QueryEventGroup> queryEventGroups = new ArrayList<>();

    List<RepeatedError> repeatedErrors = new ArrayList<>();

    public Analysis(StudentLogs studentLogs) {
        this.studentName = studentLogs.getName();
        this.fileNames = studentLogs.getFileNames().toArray(String[]::new);
        this.logs = studentLogs.getLogs();
        this.error = this.fileNames.length == 0 ? "Logifaile ei leitud." : studentLogs.getError();
        categorizeLogData();
        createQueryEventGroups();
    }

    public Analysis(List<LogData> log, String fileName) {
        this.logs = log;
        this.fileNames = new String[]{fileName};
        categorizeLogData();
        createQueryEventGroups();
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

        totalCount = errorCount + validCount;
        uniqueErrorCount = uniqueErrors.size();

        repeatedErrorCounts.entrySet().stream()
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .forEach(entry -> repeatedErrors.add(
                        new RepeatedError(entry.getKey().getMessage(), entry.getKey().getStatement(), entry.getValue())));
    }

    private void createQueryEventGroups() {

        if (this.logs.isEmpty()) return;

        DateFormat dateFormatter = new SimpleDateFormat("dd MMM yyyy hh:mm:ss");

        QueryEventGroup queryEventGroup = new QueryEventGroup(
                this.logs.get(0).getErrorType() == ErrorType.VALID,
                dateFormatter.format(this.logs.get(0).getTimestamp()),
                0
                );

        for (LogData log : this.logs) {
            if (log.getErrorType() == ErrorType.VALID && queryEventGroup.isValid
            || log.getErrorType() != ErrorType.VALID && !queryEventGroup.isValid) {
                queryEventGroup.count++;
            } else {
                queryEventGroups.add(queryEventGroup);
                queryEventGroup = new QueryEventGroup(
                        log.getErrorType() == ErrorType.VALID,
                        dateFormatter.format(log.getTimestamp()),
                        1
                );
            }
        }
        queryEventGroups.add(queryEventGroup);
    }
}
