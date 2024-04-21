package ee.ut.loganalyser.analysis;

import ee.ut.loganalyser.logdata.ErrorSeverity;
import ee.ut.loganalyser.logdata.LogData;
import lombok.Data;
import org.apache.tomcat.util.collections.CaseInsensitiveKeyMap;

import java.util.*;

@Data
public class AnalysisSummary {

    private int totalCount;
    private int errorCount = 0;
    private int uniqueErrorCount = 0;
    private int validCount = 0;

    private int syntaxErrorCount = 0;
    private int nonExistentValueCount = 0;
    private int constraintViolationCount = 0;
    private int alreadyExistsErrorCount = 0;
    private int aggregateErrorCount = 0;
    private int typoCount = 0;
    private int otherErrorCount = 0;

    List<RepeatedError> repeatedErrors = new ArrayList<>();

    public AnalysisSummary(List<Analysis> analyses) {
        for (Analysis analysis : analyses) {
            this.errorCount += analysis.getErrorCount();
            this.uniqueErrorCount += analysis.getUniqueErrorCount();
            this.validCount += analysis.getValidCount();
            this.syntaxErrorCount += analysis.getSyntaxErrorCount();
            this.nonExistentValueCount += analysis.getNonExistentValueCount();
            this.constraintViolationCount += analysis.getConstraintViolationCount();
            this.alreadyExistsErrorCount += analysis.getAlreadyExistsErrorCount();
            this.typoCount += analysis.getTypoCount();
            this.aggregateErrorCount += analysis.getAggregateErrorCount();
            this.otherErrorCount += analysis.getOtherErrorCount();
        }
        this.totalCount = this.errorCount + this.validCount;
        countRepeatedErrors(analyses);
    }

    void countRepeatedErrors(List<Analysis> analyses) {
        Map<String, Integer> errorCounts = new CaseInsensitiveKeyMap<>();
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
                .forEach(entry -> repeatedErrors.add(new RepeatedError(entry.getKey(), entry.getValue())));
    }

}
