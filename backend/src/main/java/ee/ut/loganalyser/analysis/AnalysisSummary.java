package ee.ut.loganalyser.analysis;

import ee.ut.loganalyser.logdata.ErrorSeverity;
import ee.ut.loganalyser.logdata.LogData;
import lombok.Data;

import java.util.*;

@Data
public class AnalysisSummary {
    int errorCount = 0;
    int uniqueErrorCount = 0;
    int validCount = 0;

    int syntaxErrorCount = 0;
    int nonExistentValueCount = 0;
    int constraintViolationCount = 0;
    int alreadyExistsErrorCount = 0;
    int aggregateErrorCount = 0;
    int typoCount = 0;
    int otherErrorCount = 0;

    Map<String, Integer> repeatedErrors = new LinkedHashMap<>();

    public AnalysisSummary(List<Analysis> analyses) {

        for (Analysis analysis : analyses) {
            this.errorCount += analysis.errorCount;
            this.uniqueErrorCount += analysis.uniqueErrorCount;
            this.validCount += analysis.validCount;
            this.syntaxErrorCount += analysis.syntaxErrorCount;
            this.nonExistentValueCount += analysis.nonExistentValueCount;
            this.constraintViolationCount += analysis.constraintViolationCount;
            this.alreadyExistsErrorCount += analysis.alreadyExistsErrorCount;
            this.typoCount += analysis.typoCount;
            this.aggregateErrorCount += analysis.aggregateErrorCount;
            this.otherErrorCount += analysis.otherErrorCount;
        }

        countRepeatedErrors(analyses);
    }

    void countRepeatedErrors(List<Analysis> analyses) {
        Map<String, Integer> errorCounts = new HashMap<>();
        for (Analysis analysis : analyses) {
            for (LogData logData : analysis.logs) {
                if (logData.getErrorSeverity() == ErrorSeverity.ERROR) {
                    errorCounts.put(logData.getMessage(), errorCounts.getOrDefault(logData.getMessage(), 0) + 1);
                }
            }
        }
        errorCounts.entrySet().stream()
                .filter(errorCount -> errorCount.getValue() > 1)
                .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                .forEach(entry -> repeatedErrors.put(entry.getKey(), entry.getValue()));
    }

}
